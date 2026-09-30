import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días en caché para soporte offline
      staleTime: 1000 * 60 * 15,        // 15 minutos fresco
      retry: 2,
    },
  },
});
