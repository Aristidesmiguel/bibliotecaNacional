import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Descubra sua próxima{" "}
            <span className=" text-yellow-200">Ótima Leitura</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Explore nossa vasta coleção de livros, desde clássicos atemporais
            até obras-primas contemporâneas. Sua jornada literária começa aqui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/catalog">
              <Button size="lg" variant="secondary" className="group cursor-pointer">
                Browse Catalog
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
