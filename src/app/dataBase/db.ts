import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
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

export async function carregarReservas(): Promise<Reserva[]> {
  const snapshot = await getDocs(collection(db, "reservas"));
  const reservas = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reserva[];
  return reservas;
}

export async function carregarListas(): Promise<Listas[]> {
  const snapshot = await getDocs(collection(db, "lists"));
  const lists = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Listas[];
  return lists;
}

export async function cancelarReserva(reservaId: string) {
 const listaRef = doc(db, "lists", reservaId);
await updateDoc(listaRef, { status: "cancelada" });

}
export async function cancelarListagem(reservaId: string) {
  const reservaRef = doc(db, "reservas", reservaId);
  await updateDoc(reservaRef, {
    status: "cancelada",
  });
}
