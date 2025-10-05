import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface BookCardProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  year: string;
  available: number;
  coverUrl: string;
  onClick?: () => void;
}

export const BookCard = ({ title, author, genre, rating, year, available, coverUrl, onClick }: BookCardProps) => {
  return (
    <Card onClick={onClick} className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={coverUrl}
          alt={`Cover of ${title}`}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={available > 0 ? "default" : "destructive"}
        >
          {available > 0 ? `${available} available` : "Out of stock"}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">by {author}</p>
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="text-xs">
            {genre}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
          <Clock className="h-3 w-3" />
          <span>Published {year}</span>
        </div>
      </CardContent>
    </Card>
  );
};