import http from '@/lib/axios'

class AuthServices {
  static async login(email: string, password: string): Promise<unknown> {
    const response = await http.post('/auth/login', {
      email,
      password,
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
    return []
  }

  static async logout(): Promise<unknown> {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: Record<string, string> = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await http.post('/auth/logout', {}, { headers })

      if (response.status >= 200 && response.status < 300) {
        // Clear localStorage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error: unknown) {
      console.error('Logout error:', error)
      // Still clear localStorage even if API call fails
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      throw error
    }
  }
}

export default AuthServices
