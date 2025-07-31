import http from '@/lib/axios'

class AuthServices {
  static async login(email: string, password: string): Promise<any> {
    const response = await http.post('/auth/login', {
      email,
      password,
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
    return []
  }
}

export default AuthServices
