import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Calendar, BookOpen, Users } from "lucide-react";
import type { Book } from "../data/books";


interface BookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
  const isAvailable = book.available > 0;
  const availabilityStatus = isAvailable ? "Available" : "Out of Stock";
  const availabilityColor = isAvailable ? "text-green-600" : "text-red-600";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}    >
      <DialogContent className="max-w-6xl max-h-[99vh]">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-3">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-book">
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-6 mt-6">
              <Button 
                className="flex-1 btn-library"
                disabled={!isAvailable}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {isAvailable ? "Reserve Book" : "Unavailable"}
              </Button>
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className=" font-heading font-bold text-foreground mb-1">
                {book.title}
              </h1>
              <p className="text-md text-muted-foreground mb-2">
                by {book.author}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-muted-foreground">/5</span>
                </div>
                
                <Separator orientation="vertical" className="h-4" />
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{book.year}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {book.genre}
                </Badge>
                <span className={`font-medium ${availabilityColor}`}>
                  {availabilityStatus}
                </span>
                {isAvailable && (
                  <span className="text-sm text-muted-foreground">
                    ({book.available})
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="fl">
                <h4 className="font-medium text-foreground mb-1">Author</h4>
                <p className="text-muted-foreground">{book.author}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Genre</h4>
                <p className="text-muted-foreground">{book.genre}</p>
              </div>
              <div className="">
                <h4 className="font-medium text-foreground mb-1">Rating</h4>
                <p className="text-muted-foreground">{book.rating}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Availability</h4>
                <p className={`${availabilityColor}`}>{book.available}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};