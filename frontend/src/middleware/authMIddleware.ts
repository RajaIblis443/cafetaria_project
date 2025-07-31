import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')
  const user_data = JSON.parse(localStorage.getItem('user_data') || '{}')

  if (!auth_token && !user_data) {
    next({ name: 'Login' })
  }

  const requiredRole = to.meta?.role
  if (requiredRole && user_data.role !== requiredRole) {
    return next({ name: 'Unauthorized' }) // kamu bisa bikin halaman 403
  }

  next()
}
