
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAurh";


export const LockCard = () => {
  const { user, loading } = useAuth();

  // Enquanto o estado de autenticação ainda está carregando, não mostra nada
  if (loading) return null;

  // Se o usuário estiver logado → não mostra o card
  if (user) return null;

  // Caso não tenha conta → mostra o card de bloqueio
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fundo transparente com leve desfoque */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />

      <div
        className="relative z-10 w-[360px] p-6 rounded-2xl 
        border border-white/20 
        bg-white/5 backdrop-blur-xl 
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        flex flex-col items-center text-center 
        text-white"
      >
        <div className="mb-4 p-4 rounded-full bg-white/10 border border-white/20">
          <Lock className="w-8 h-8 text-cyan-400" />
        </div>

        <h2 className="text-xl font-semibold">Acesso Bloqueado</h2>
        <p className="text-white/70 text-sm mt-2">
          Você não tem permissão para acessar esta área.
        </p>

        <Button
          onClick={() => (window.location.href = "/sign-in")}
          className="mt-5 px-4 py-2 rounded-lg  font-semibold
          shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer
          "
        >
          Criar Conta
        </Button>
      </div>
    </div>
  );
};
