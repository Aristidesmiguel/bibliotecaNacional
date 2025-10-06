import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CHAVE_API } from "@/app/API";
import {
  cancelarListagem,
  cancelarReserva,
  carregarListas,
  carregarReservas,
  minhaListaDeLivros,
  reservarLivro,
} from "@/app/dataBase";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  year: string;
  available: string;
  coverUrl: string;
}

export function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [reserveId, setReserveId] = useState<string | null>(null);
  const [hasActiveReservation, setHasActiveReservation] = useState(false);
  const [listaId, setListaId] = useState<any | null>(null);
  const [hasList, setHasList] = useState(false);

  // 🔍 Verifica se o livro já está reservado
  useEffect(() => {
    async function checkReservation() {
      const reservas = await carregarReservas();
      const ativa = reservas.find(
        (r: any) => r.bookId === id && r.status === "ativa"
      );

      if (ativa) {
        setHasActiveReservation(true);
        setReserveId(ativa.id);
      } else {
        setHasActiveReservation(false);
        setReserveId(null);
      }
    }

    checkReservation();
  }, [id]);

  // 🔹 Reservar livro
  const handleReserva = async (book: Book) => {
    try {
      await reservarLivro(book);
      toast.success(`Livro "${book.title}" reservado com sucesso!`);
      setHasActiveReservation(true);
    } catch (error) {
      console.error("Erro ao reservar livro:", error);
      toast.error("Erro ao reservar o livro. Tente novamente mais tarde.");
    }
  };

  // 🔹 Cancelar reserva
  const handleCancelar = async (book: Book) => {
    try {
      if (!reserveId) return;
      await cancelarReserva(reserveId);
      toast.info(`Reserva do livro "${book.title}" foi cancelada.`);
      setHasActiveReservation(false);
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar a reserva. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    async function checkList() {
      const reservas = await carregarListas();
      const ativa = reservas.find(
        (r: any) => r.bookId === id && r.status === "ativa"
      );

      if (ativa) {
        setHasList(true);
        setReserveId(ativa.id);
      } else {
        setHasList(false);
        setListaId(null);
      }
    }

    checkList();
  }, [id]);

  // 🔹 Reservar livro
  const handleLista = async (book: Book) => {
    try {
      await minhaListaDeLivros(book);
      toast.success(`Livro "${book.title}" asicionado com sucesso!`);
      setHasList(true);
    } catch (error) {
      console.error("Erro ao listar livro:", error);
      toast.error("Erro ao listar o livro. Tente novamente mais tarde.");
    }
  };

  // 🔹 Cancelar reserva
  const handleCancelarLista = async (book: Book) => {
    try {
      if (!listaId) return;
      await cancelarListagem(listaId);
      toast.info(`Listagem do livro "${book.title}" foi cancelada.`);
      setHasList(false);
    } catch (error) {
      console.error("Erro ao cancelar listagem:", error);
      toast.error("Erro ao cancelar a listagem. Tente novamente mais tarde.");
    }
  };

  // 🔹 Carrega os dados do livro da API do Google Books
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${CHAVE_API}`
        );
        const data = await res.json();
        const info = data.volumeInfo;

        setBook({
          id: data.id,
          title: info.title,
          author: info.authors?.[0] || "Autor desconhecido",
          description: info.description || "Sem descrição disponível.",
          genre: info.categories?.[0] || "Geral",
          rating: info.averageRating || 0,
          year: info.publishedDate?.substring(0, 4) || "N/A",
          available: "Disponível (5/8 cópias)",
          coverUrl:
            info.imageLinks?.thumbnail ||
            "https://via.placeholder.com/200x300?text=Sem+Imagem",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleToggleReserva = async (book: Book) => {
    if (hasActiveReservation) {
      await handleCancelar(book);
    } else {
      await handleReserva(book);
    }
  };

  const handleToggleLista = async (book: Book) => {
    if (hasList) {
      await handleCancelarLista(book);
    } else {
      await handleLista(book);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen bg-[#f8f9fa] text-black">
        <div className="animate-spin rounded-full h-30 w-30 border-b-2 border-black"></div>
        <h1 className="font-bold">Carregando...</h1>
      </div>
    );

  if (!book)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f8f9fa] text-black gap-4">
        <p>Livro não encontrado.</p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-400">
        <Button
          variant="ghost"
          className="hover:text-gray-700 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" /> Voltar
        </Button>
        <h2 className="text-2xl font-bold">Detalhes do Livro</h2>
        <div className="w-10"></div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 px-8 py-12">
        {/* Imagem */}
        <div className="flex justify-center">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="rounded-xl shadow-2xl w-72 h-[420px] object-cover"
          />
        </div>

        {/* Informações */}
        <div className="max-w-2xl backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-700">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="mb-4">por {book.author}</p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-blue-600/10 text-blue-500">{book.genre}</Badge>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-yellow-400" />
              <span>{book.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{book.year}</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>{book.available}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">Descrição</h3>
          <p className="leading-relaxed mb-6 text-justify">
            {book.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleToggleReserva(book)}
              className={`cursor-pointer flex items-center gap-2 ${
                hasActiveReservation
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {hasActiveReservation ? "Cancelar Reserva" : "Reservar Livro"}
            </Button>

            <Button
              onClick={() => handleToggleLista(book)}
              className={`cursor-pointer flex items-center gap-2 ${
                hasList
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {hasList ? "Cancelar Listagem" : "Listar Livro"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
