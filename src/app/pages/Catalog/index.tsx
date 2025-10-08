import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import {
  Footer,
  Header,
  LockCard,
  BookCard,
  BookModal,
  type BookCardProps,
} from "@/app/components";
import { CHAVE_API } from "@/app/API";
import { toast } from "sonner";

export const Catalog = () => {
  const [livros, setLivros] = useState<BookCardProps[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availability, setAvailability] = useState("all");
  const [minRating, setMinRating] = useState([0]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  const [sortBy, setSortBy] = useState("title");
  const [isOpen, setIsOpen] = useState(false);
  const [book, setBook] = useState<BookCardProps | null>(null);

  // 🔹 Busca livros da Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20&key=${CHAVE_API}`
        );
        const data = await res.json();

        const books = (data.items || []).map((item: any, index: number) => ({
          id: index,
          title: item.volumeInfo.title || "Sem título",
          author: item.volumeInfo.authors?.join(", ") || "Desconhecido",
          genre: item.volumeInfo.categories?.[0] || "Outro",
          rating: item.volumeInfo.averageRating || 0,
          year: item.volumeInfo.publishedDate?.slice(0, 4) || "0000",
          available: Math.random() > 0.5 ? 1 : 0, // 🔹 simula disponibilidade
          coverUrl: item.volumeInfo.imageLinks?.thumbnail || "",
        }));

        setLivros(books);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        toast.error("Erro ao buscar livros. Tente novamente mais tarde.");
      }
    };

    fetchBooks();
  }, []);

  // 🔹 Extrai gêneros únicos
  const genres = [...new Set(livros.map((book) => book.genre))];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // 🔹 Aplica filtros e ordenação
  const filteredBooks = livros
    .filter((book) => {
      if (selectedGenres.length > 0 && !selectedGenres.includes(book.genre))
        return false;
      if (availability === "available" && book.available === 0) return false;
      if (availability === "out" && book.available > 0) return false;
      if (book.rating < minRating[0]) return false;

      const bookYear = parseInt(book.year);
      if (bookYear < yearRange[0] || bookYear > yearRange[1]) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return parseInt(b.year) - parseInt(a.year);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <LockCard />
      <Header />
      {book && (
        <BookModal
          book={book}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}

      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 space-y-6">
              <div className="bg-card rounded-lg p-6 space-y-6 sticky top-24">
                {/* Genres */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Genres</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {genres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => handleGenreToggle(genre)}
                        />
                        <Label htmlFor={genre} className="cursor-pointer">
                          {genre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Availability</h3>
                  <RadioGroup
                    value={availability}
                    onValueChange={setAvailability}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="cursor-pointer">
                        All Books
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="available" id="available" />
                      <Label htmlFor="available" className="cursor-pointer">
                        Available Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="out" id="out" />
                      <Label htmlFor="out" className="cursor-pointer">
                        Out of Stock
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Minimum Rating</h3>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0 stars</span>
                    <span>{minRating[0]} stars</span>
                    <span>5 stars</span>
                  </div>
                </div>

                {/* Year */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Publication Year
                  </h3>
                  <Slider
                    value={yearRange}
                    onValueChange={setYearRange}
                    min={1900}
                    max={2024}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Books Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredBooks.length} livros encontrados
                </h2>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">
                        Classificar por título
                      </SelectItem>
                      <SelectItem value="rating">
                        Classificar por classificação
                      </SelectItem>
                      <SelectItem value="year">Classificar por ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    {...book}
                    onClick={() => {
                      setBook(book);
                      setIsOpen(true);
                    }}
                  />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No books found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
