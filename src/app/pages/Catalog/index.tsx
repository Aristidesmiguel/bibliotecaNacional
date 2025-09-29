import { useState } from "react";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { Footer, Header, BookCard } from "@/app/components";


export const Catalog = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availability, setAvailability] = useState("all");
  const [minRating, setMinRating] = useState([0]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  const [sortBy, setSortBy] = useState("title");

 

  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
          

            {/* Books Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  books found
                </h2>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Sort by Title</SelectItem>
                      <SelectItem value="rating">Sort by Rating</SelectItem>
                      <SelectItem value="year">Sort by Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};