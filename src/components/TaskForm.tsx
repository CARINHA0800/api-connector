import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/useTasks";
import { taskSchema, TASK_TITLE_MAX_LENGTH, TASK_DESCRIPTION_MAX_LENGTH } from "@/lib/validations";
import { toast } from "@/hooks/use-toast";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod
    const result = taskSchema.safeParse({ title, description });
    
    if (!result.success) {
      const fieldErrors: { title?: string; description?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "title") fieldErrors.title = err.message;
        if (err.path[0] === "description") fieldErrors.description = err.message;
      });
      setErrors(fieldErrors);
      
      // Show toast for first error
      const firstError = result.error.errors[0];
      if (firstError) {
        toast({
          title: "Erro de validação",
          description: firstError.message,
          variant: "destructive",
        });
      }
      return;
    }

    setErrors({});
    createTask.mutate(
      { 
        title: result.data.title, 
        description: result.data.description || undefined 
      },
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
        <div className="space-y-1">
          <Input
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            maxLength={TASK_TITLE_MAX_LENGTH}
            className={`bg-background/50 ${errors.title ? "border-destructive" : ""}`}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title}</p>
          )}
          <p className="text-xs text-muted-foreground text-right">
            {title.length}/{TASK_TITLE_MAX_LENGTH}
          </p>
        </div>
        
        <div className="space-y-1">
          <Textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            maxLength={TASK_DESCRIPTION_MAX_LENGTH}
            rows={3}
            className={`bg-background/50 resize-none ${errors.description ? "border-destructive" : ""}`}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description}</p>
          )}
          <p className="text-xs text-muted-foreground text-right">
            {description.length}/{TASK_DESCRIPTION_MAX_LENGTH}
          </p>
        </div>
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
