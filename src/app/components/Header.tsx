import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">Meridian Library</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books, authors, genres..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/catalog" className="text-sm font-medium hover:text-accent transition-colors">
            Catalog
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 cursor-pointer">
              Cadastrar
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};