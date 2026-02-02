import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Até logo!",
      description: "Você saiu da sua conta.",
    });
    
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">{user.email}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={handleSignOut}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};
