'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/utils/trpc';

const schema = z.object({
    titulo: z.string().min(1, 'Título obrigatório'),
    descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function TaskForm({ onSuccess }: { onSuccess?: () => void }) {
    const utils = trpc.useUtils();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = trpc.add.useMutation({
        onSuccess: () => {
            utils.getInfiniteTasks.invalidate();
            reset();
            if (onSuccess) onSuccess();
        },
    });

    return (
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4 bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800">Nova Tarefa</h2>
            <div>
                <input
                    {...register('titulo')}
                    placeholder="Título da tarefa..."
                    // ADICIONEI: text-gray-900 e bg-white abaixo 👇
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                />
                {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
            </div>
            <div>
                <textarea
                    {...register('descricao')}
                    placeholder="Descrição (opcional)..."
                    // ADICIONEI: text-gray-900 e bg-white abaixo 👇
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                />
            </div>
            <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {mutation.isPending ? 'Criando...' : 'Adicionar Tarefa'}
            </button>
            {mutation.error && <p className="text-red-500 text-sm">Erro ao criar tarefa.</p>}
        </form>
    );
}