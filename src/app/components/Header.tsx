import { Link, useNavigate } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownProfile } from "./DropdownProfile";
import { useAuth } from "../hooks/useAurh";
import { useState, useEffect } from "react";
import { CHAVE_API, type Book } from "../API";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  type?: "default" | "minimal";
}

export const Header = ({ type }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const router = (path: string) => {
    navigate(path);
  };

  const [query, setQuery] = useState("");
  const [livros, setLivros] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 🔍 Faz a pesquisa automaticamente quando o usuário digita
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setLivros([]);
        setShowResults(false);
        return;
      }

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&maxResults=5&key=${CHAVE_API}`
        );
        const data = await res.json();
        setLivros(data.items || []);
        setShowResults(true);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <BookOpen className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">Meridian Library</span>
        </Link>

        {type !== "minimal" && (
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search books, authors, genres..."
                className="pl-10 bg-muted/50"
                onFocus={() => query && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 150)}
              />
            </div>

            {/* 🔽 Resultados da pesquisa abaixo do input */}
            {showResults && livros.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-md shadow-md max-h-64 overflow-y-auto z-50">
                {livros.map((livro, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 flex gap-2 cursor-pointer text-sm"
                    onMouseDown={() => navigate(`/book/${livro.id}`)}
                  >
                    <img className="w-20 h-30" src={livro.volumeInfo.imageLinks.thumbnail} alt={livro.volumeInfo.title} />
                    <div className="flex gap-2 flex-col w-full">
                      {livro.volumeInfo?.title || "Sem título"}
                    <Badge variant="secondary" className="">
                      {livro.volumeInfo?.categories || "Sem categoria"}
                    </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <nav className="flex items-center gap-6">
          <Link
            to="/catalog"
            className="text-sm font-medium hover:text-gray-500 transition-colors"
          >
            Catalog
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-gray-500 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-gray-500 transition-colors"
          >
            Contact
          </Link>
          {user == null && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => router("/login")}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                Entrar
              </Button>
              <Button
                onClick={() => router("/sign-in")}
                size="sm"
                className="bg-primary hover:bg-primary/90 cursor-pointer"
              >
                Cadastrar
              </Button>
            </div>
          )}
          <DropdownProfile />
        </nav>
      </div>
    </header>
  );
};
