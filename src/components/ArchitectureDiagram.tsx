import { Database, Globe, Server, ArrowRight, ArrowLeft } from "lucide-react";

export const ArchitectureDiagram = () => {
  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Diagrama da Arquitetura</h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        {/* Frontend */}
        <div className="flex flex-col items-center p-6 bg-primary/10 rounded-xl border-2 border-primary/30 min-w-[180px]">
          <Globe className="w-10 h-10 text-primary mb-3" />
          <h3 className="font-semibold text-foreground">Frontend</h3>
          <p className="text-xs text-muted-foreground text-center mt-2">
            React + TypeScript
            <br />
            Vite + Tailwind CSS
          </p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <div className="flex items-center gap-2 rotate-90 lg:rotate-0">
            <ArrowRight className="w-5 h-5" />
            <span className="text-xs font-mono">REST API</span>
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground/70">GET / POST</span>
        </div>

        {/* API */}
        <div className="flex flex-col items-center p-6 bg-success/10 rounded-xl border-2 border-success/30 min-w-[180px]">
          <Server className="w-10 h-10 text-success mb-3" />
          <h3 className="font-semibold text-foreground">Backend API</h3>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Lovable Cloud
            <br />
            REST Endpoints
          </p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <div className="flex items-center gap-2 rotate-90 lg:rotate-0">
            <ArrowRight className="w-5 h-5" />
            <span className="text-xs font-mono">SQL</span>
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground/70">CRUD</span>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center p-6 bg-warning/10 rounded-xl border-2 border-warning/30 min-w-[180px]">
          <Database className="w-10 h-10 text-warning mb-3" />
          <h3 className="font-semibold text-foreground">Banco de Dados</h3>
          <p className="text-xs text-muted-foreground text-center mt-2">
            PostgreSQL
            <br />
            RLS Policies
          </p>
        </div>
      </div>

      {/* API Endpoints Info */}
      <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Endpoints da API:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-success/20 text-success rounded text-xs font-bold">GET</span>
            <span className="text-muted-foreground">/rest/v1/tasks</span>
            <span className="text-xs text-muted-foreground/70">- Lista todas as tarefas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">POST</span>
            <span className="text-muted-foreground">/rest/v1/tasks</span>
            <span className="text-xs text-muted-foreground/70">- Cria nova tarefa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
