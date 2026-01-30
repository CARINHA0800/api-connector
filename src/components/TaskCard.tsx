import { useState } from "react";
import { Check, Clock, Loader2, Trash2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task, useUpdateTaskStatus, useDeleteTask } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
};

const statusConfig = {
  pending: {
    label: "Pendente",
    icon: Circle,
    className: "text-muted-foreground",
    bg: "bg-muted",
  },
  in_progress: {
    label: "Em Progresso",
    icon: Clock,
    className: "text-warning",
    bg: "bg-warning/10",
  },
  completed: {
    label: "Concluído",
    icon: Check,
    className: "text-success",
    bg: "bg-success/10",
  },
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  const cycleStatus = () => {
    const statusOrder: Task["status"][] = ["pending", "in_progress", "completed"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    updateStatus.mutate({ id: task.id, status: nextStatus });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask.mutate(task.id, {
      onSettled: () => setIsDeleting(false),
    });
  };

  return (
    <div
      className={cn(
        "glass rounded-xl p-5 transition-all duration-300 hover:shadow-xl group",
        task.status === "completed" && "opacity-75"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium text-foreground truncate",
              task.status === "completed" && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={cycleStatus}
              disabled={updateStatus.isPending}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                config.bg,
                config.className,
                "hover:opacity-80"
              )}
            >
              {updateStatus.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <StatusIcon className="w-3 h-3" />
              )}
              {config.label}
            </button>

            <span className="text-xs text-muted-foreground">
              {new Date(task.created_at).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
