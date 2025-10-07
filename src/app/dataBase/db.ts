import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export interface Reserva {
  id: string;
  userId: string;
  bookId: string;
  status: "ativa" | "expirada" | "cancelada";
  dataCriacao: Timestamp;
  dataExpiracao: Timestamp;
}
export interface Listas {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  status: string;
}

//função para reservar livro
export async function reservarLivro(book: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  console.log(user);

  // Verificar se já tem reserva ativa para este livro
  const reservasRef = collection(db, "reservas");
  const q = query(
    reservasRef,
    where("userId", "==", user.uid),
    where("bookId", "==", book.id),
    where("status", "==", "ativa")
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) throw new Error("Você já reservou este livro.");

  // Criar nova reserva
  const agora = new Date();
  const expiracao = new Date(agora);
  expiracao.setDate(agora.getDate() + 60);

  const reserva = {
    userId: user.uid,
    bookId: book.id,
    bookTitle: book.title,
    bookAuthor: book.author || "Autor desconhecido",
    bookCover: book.coverUrl,
    status: "ativa",
    dataReserva: Timestamp.fromDate(agora),
    dataExpiracao: Timestamp.fromDate(expiracao),
  };

  await addDoc(reservasRef, reserva);
  return reserva;
}

//função para adicionar livro na minha lista
export async function minhaListaDeLivros(book: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  console.log(user);

  // Verificar se já tem lista ativa para este livro
  const listaRef = collection(db, "lists");
  const q = query(
    listaRef,
    where("userId", "==", user.uid),
    where("bookId", "==", book.id),
    where("status", "==", "listado")

  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) throw new Error("Você já listou este livro.");

  const listagem = {
    userId: user.uid,
    bookId: book.id,
    bookTitle: book.title,
    bookAuthor: book.author || "Autor desconhecido",
    bookCover: book.coverUrl,
    status: "listado",
  };

  await addDoc(listaRef, listagem);
  return listagem;
}

//função para verificar reservas expiradas
export async function verificarReservasExpiradas(reservas: Reserva[]) {
  const agora = Timestamp.now();

  for (const r of reservas) {
    if (r.status === "ativa" && r.dataExpiracao.toMillis() < agora.toMillis()) {
      const ref = doc(db, "reservas", r.id);
      await updateDoc(ref, { status: "expirada" });
      r.status = "expirada";
    }
  }
}

//função para carregar reservas
export async function carregarReservas(): Promise<Reserva[]> {
  const snapshot = await getDocs(collection(db, "reservas"));
  const reservas = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reserva[];
  return reservas;
}


//função para carregar listas
export async function carregarListas(): Promise<Listas[]> {
  const snapshot = await getDocs(collection(db, "lists"));
  const lists = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Listas[];
  return lists;
}

//função para cancelar reserva
export async function cancelarReserva(id: string) {
  const ref = doc(db, "reservas", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    console.error(" Documento não encontrado:", id);
    return;
  }

  try {
    await updateDoc(ref, { reservado: false });
    console.log("Reserva cancelada com sucesso");
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
  }
}

//função para cancelar listagem
export async function cancelarListagem(id: string) {
  const listRef = doc(db, "lists", id);
  const snapshot = await getDoc(listRef);
  if (!snapshot.exists()) {
    console.error(" Documento não encontrado:", id);
    return;
  }
  try {
    await updateDoc(listRef, { status: "removido" });
    console.log("Listagem cancelada com sucesso");
  }
  catch (error) {
    console.error("Erro ao cancelar listagem:", error);
  }
}
