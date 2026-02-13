'use client';
import { trpc } from '@/utils/trpc';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function TaskList() {
    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = trpc.getInfiniteTasks.useInfiniteQuery(
        { limit: 5 },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    const deleteMutation = trpc.delete.useMutation({
        onSuccess: () => refetch(),
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (status === 'pending') return <div className="text-center py-10">Carregando tarefas...</div>;
    if (status === 'error') return <div className="text-center text-red-500">Erro ao carregar.</div>;

    return (
        <div className="space-y-4">
            {data.pages.map((page) =>
                page.items.map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{task.titulo}</h3>
                            <p className="text-gray-600">{task.descricao}</p>
                            <span className="text-xs text-gray-400">
                                {new Date(task.dataCriacao).toLocaleDateString()}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteMutation.mutate({ id: task.id })}
                            disabled={deleteMutation.isPending}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                            {deleteMutation.isPending ? '...' : 'Excluir'}
                        </button>
                    </div>
                ))
            )}

            {/* Elemento invisível para trigger do scroll */}
            <div ref={ref} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <span className="text-gray-500">Carregando mais...</span>}
            </div>
        </div>
    );
}