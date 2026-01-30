import { useTasks } from "@/hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { Loader2, ListTodo } from "lucide-react";

export const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-destructive">Erro ao carregar tarefas: {error.message}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <ListTodo className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium text-foreground">Nenhuma tarefa ainda</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Crie sua primeira tarefa usando o formulário acima.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Tarefas ({tasks.length})
        </h2>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
