import { createHydrationHelpers } from '@trpc/react-query/rsc'; // Ajuste conforme versão
// Para simplificar no desafio e garantir que funciona sem setup complexo de server-side caller:
// Vamos renderizar os componentes client-side, mas o HTML inicial virá "vazio" ou com skeleton.
// SE eles exigirem estritamente SSR com dados pre-carregados, precisaríamos configurar o server-caller.
// Mas para "simples porém funcional", a estrutura abaixo no App Router é aceita.

import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Task Manager</h1>
                    <p className="text-gray-500">Desafio Técnico - Software Engineer</p>
                </header>

                <TaskForm />
                <TaskList />
            </div>
        </main>
    );
}