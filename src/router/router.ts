import { useAuthStore } from '@/stores/auth.store';
import { createRouter, createWebHistory } from 'vue-router';
import { privateRoutes } from './routes/privateRoutes';
import { publicRoutes } from './routes/publicRoutes';
import { authGuard } from './guards/authGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
});

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean;
    roles?: string[];
    allowWhileRefreshing?: boolean;
  }
}

router.beforeEach(authGuard);

export default router;
