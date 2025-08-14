import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth_token = localStorage.getItem('auth_token')
  const user_data = JSON.parse(localStorage.getItem('user_data') || '{}')

  if (!auth_token && !user_data) {
    next({ path: '/login' })
  }

  const allowedRoles = to.meta?.roles as string[] | undefined
  const user_role = user_data.user?.role

  if (allowedRoles && user_role !== allowedRoles.includes(user_role)) {
    return next({ name: 'Unauthorized' }) // kamu bisa bikin halaman 403
  }

  next()
}
