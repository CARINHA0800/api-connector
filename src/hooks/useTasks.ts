import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed";
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
};

// GET - Fetch all tasks for the current user
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as Task[];
    },
  });
};

// POST - Create a new task with user_id
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskInput): Promise<Task> => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase
        .from("tasks")
        .insert([{
          title: input.title,
          description: input.description || null,
          status: input.status || "pending",
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa criada!",
        description: "A tarefa foi adicionada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar tarefa",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Update task status
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Task["status"] }): Promise<Task> => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa removida",
        description: "A tarefa foi excluída com sucesso.",
      });
    },
  });
};
