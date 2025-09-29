import { BookOpen, Users, Globe } from "lucide-react";

export const Stats = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "50,000+",
      label: "Livros Avaliados",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Membros Ativos",
    },
    {
      icon: Globe,
      value: "25+",
      label: "Linguas Suportadas",
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-16 border-t border-primary-foreground/10">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <stat.icon className="h-12 w-12 mx-auto text-accent" />
              <div className="text-4xl md:text-5xl font-bold text-yellow-200">{stat.value}</div>
              <div className="text-lg text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};