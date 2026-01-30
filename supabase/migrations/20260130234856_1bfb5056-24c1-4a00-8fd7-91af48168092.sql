-- Create tasks table for the API
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Public read policy (for demo purposes - no auth required)
CREATE POLICY "Anyone can view tasks"
ON public.tasks
FOR SELECT
USING (true);

-- Public insert policy
CREATE POLICY "Anyone can create tasks"
ON public.tasks
FOR INSERT
WITH CHECK (true);

-- Public update policy
CREATE POLICY "Anyone can update tasks"
ON public.tasks
FOR UPDATE
USING (true);

-- Public delete policy
CREATE POLICY "Anyone can delete tasks"
ON public.tasks
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();