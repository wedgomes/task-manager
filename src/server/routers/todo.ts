import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db } from '@/lib/db';

export const todoRouter = router({
    // BÔNUS: Infinite Scroll Logic
    getInfiniteTasks: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(5),
                cursor: z.number().nullish(), // Usaremos offset como cursor para simplicidade
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit;
            const cursor = input.cursor ?? 0;

            const items = await db.tasks.findMany({ limit, cursor });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length === limit) {
                nextCursor = cursor + limit;
            }

            return {
                items,
                nextCursor,
            };
        }),

    add: publicProcedure
        .input(z.object({
            titulo: z.string().min(1, "O título é obrigatório"),
            descricao: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            return await db.tasks.create(input);
        }),

    update: publicProcedure
        .input(z.object({
            id: z.string(),
            titulo: z.string().min(1, "O título é obrigatório"),
            descricao: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return await db.tasks.update(id, data);
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return await db.tasks.delete(input.id);
        }),
});

export type AppRouter = typeof todoRouter;