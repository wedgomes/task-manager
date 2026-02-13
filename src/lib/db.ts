// Simulando um banco em memória
// Nota: Em serverless/Vercel, isso reseta a cada cold start. 
// Para o teste local, funciona perfeitamente.

export interface Task {
    id: string;
    titulo: string;
    descricao?: string;
    dataCriacao: Date;
}

// Dados iniciais para não começar vazio
let tasks: Task[] = [
    { id: '1', titulo: 'Finalizar desafio técnico', descricao: 'Implementar tRPC e NextJS', dataCriacao: new Date() },
    { id: '2', titulo: 'Atualizar LinkedIn', descricao: 'Postar sobre o projeto', dataCriacao: new Date() }
];

export const db = {
    tasks: {
        findMany: async ({ limit, cursor }: { limit: number; cursor?: number }) => {
            // Simula delay de rede para ver os loaders
            await new Promise((resolve) => setTimeout(resolve, 500));

            const start = cursor || 0;
            const end = start + limit;
            // Retorna fatiado e ordenado por data (mais recente primeiro)
            const sorted = [...tasks].sort((a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime());
            return sorted.slice(start, end);
        },
        create: async (data: Omit<Task, 'id' | 'dataCriacao'>) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const newTask: Task = {
                id: Math.random().toString(36).substring(7),
                dataCriacao: new Date(),
                ...data,
            };
            tasks.unshift(newTask); // Adiciona no início
            return newTask;
        },
        update: async (id: string, data: Partial<Omit<Task, 'id' | 'dataCriacao'>>) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = tasks.findIndex((t) => t.id === id);
            if (index === -1) throw new Error("Tarefa não encontrada");

            tasks[index] = { ...tasks[index], ...data };
            return tasks[index];
        },
        delete: async (id: string) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = tasks.findIndex((t) => t.id === id);
            if (index === -1) throw new Error("Tarefa não encontrada");
            tasks = tasks.filter((t) => t.id !== id);
            return true;
        }
    }
};