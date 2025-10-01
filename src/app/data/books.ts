export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  year: string;
  available: number;
  coverUrl: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    rating: 4.2,
    year: "2020",
    available: 9,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    rating: 4.2,
    year: "1925",
    available: 3,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
  },
  {
    id: 3,
    title: "The Dragon's Crown",
    author: "Elena Stormwind",
    genre: "Fantasy",
    rating: 4.6,
    year: "2023",
    available: 5,
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop"
  },
  {
    id: 4,
    title: "The Art of Mindfulness",
    author: "Dr. James Wilson",
    genre: "Self-Help",
    rating: 4.4,
    year: "2020",
    available: 6,
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Summer Nights",
    author: "Rachel Morrison",
    genre: "Romance",
    rating: 4.3,
    year: "2022",
    available: 8,
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Quantum Physics Fundamentals",
    author: "Dr. Michael Thompson",
    genre: "Science",
    rating: 4.7,
    year: "2021",
    available: 12,
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop"
  },
  {
    id: 7,
    title: "Midnight Whispers",
    author: "Sarah Blackwood",
    genre: "Mystery",
    rating: 4.1,
    year: "2022",
    available: 0,
    coverUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Digital Dreams",
    author: "Alex Chen",
    genre: "Science Fiction",
    rating: 4.5,
    year: "2023",
    available: 7,
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop"
  },
  {
    id: 9,
    title: "Business Innovation Guide",
    author: "Lisa Chang",
    genre: "Business",
    rating: 4.2,
    year: "2023",
    available: 4,
    coverUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop"
  },
  {
    id: 10,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "Science",
    rating: 4.8,
    year: "1988",
    available: 2,
    coverUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop"
  }
];
