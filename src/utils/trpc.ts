import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/todo';

export const trpc = createTRPCReact<AppRouter>();