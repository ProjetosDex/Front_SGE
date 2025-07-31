import { useAuthStore } from '@/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export async function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const authStore = useAuthStore();

  if (!to.meta.auth) {
    return next();
  }

  if (authStore.isRefreshing && !to.meta.allowWhileRefreshing) {
    return next(false);
  }

  try {
    let isAuthenticated = await authStore.checkAuth(true);
    if (!isAuthenticated) {
      await authStore.refreshToken();
      isAuthenticated = await authStore.checkAuth(true);
      if (!isAuthenticated) {
        throw new Error('Usuário não autenticado');
      }
    }

    if (to.meta.roles?.length && !authStore.hasAnyRole(to.meta.roles)) {
      console.warn(`Acesso negado: usuário não possui as roles necessárias`);
      return next('/unauthorized');
    }

    return next();
  } catch (error) {
    console.error('Falha na autenticação:', error);

    authStore.clearAuth();
    return next('/authenticate');
  }
}
