import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/useTasks";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask.mutate(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Nova Tarefa</h2>
      
      <div className="space-y-3">
        <Input
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background/50"
        />
        
        <Textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="bg-background/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={!title.trim() || createTask.isPending}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {createTask.isPending ? "Criando..." : "Adicionar Tarefa"}
      </Button>
    </form>
  );
};
