import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface InfoCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoCard = ({ isOpen, onClose }: InfoCardProps) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie uma conta para continuar</DialogTitle>
          <DialogDescription>
            Faça login ou crie uma conta para reservar e adicionar livros à sua
            lista. Além disso, você poderá ver seu histórico de reservas e
            gerenciar seus livros favoritos.
          </DialogDescription>
          <Button
            onClick={() => handleNavigate("/sign-in")}
            className="cursor-pointer"
          >
            Criar Conta
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
