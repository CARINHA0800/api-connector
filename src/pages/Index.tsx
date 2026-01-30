import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CheckSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gerenciamento de Tarefas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Task Management Section */}
          <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <TaskForm />
            </div>
            <TaskList />
          </section>

          {/* Architecture Diagram Section */}
          <section>
            <ArchitectureDiagram />
          </section>

          {/* Tech Stack Info */}
          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Tecnologias Utilizadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TechBadge name="React 18" category="Frontend" />
              <TechBadge name="TypeScript" category="Linguagem" />
              <TechBadge name="Tailwind CSS" category="Estilização" />
              <TechBadge name="Vite" category="Build Tool" />
              <TechBadge name="PostgreSQL" category="Banco de Dados" />
              <TechBadge name="REST API" category="Backend" />
              <TechBadge name="TanStack Query" category="Data Fetching" />
              <TechBadge name="Vercel" category="Deploy" />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Projeto desenvolvido para demonstração de microsserviços REST</p>
          <p className="mt-1">Frontend ↔ API ↔ Banco de Dados</p>
        </div>
      </footer>
    </div>
  );
};

const TechBadge = ({ name, category }: { name: string; category: string }) => (
  <div className="p-3 bg-secondary/50 rounded-lg text-center">
    <p className="font-medium text-foreground text-sm">{name}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{category}</p>
  </div>
);

export default Index;
