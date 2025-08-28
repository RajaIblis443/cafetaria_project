import http from '@/lib/axios'
import axios from 'axios'

class ProductServices {
  static async updateProduct(productId: string, productData: FormData) {
    try {
      const token = localStorage.getItem('auth_token')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const headers: any = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      // Gunakan axios langsung untuk FormData
      const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api'
      const response = await axios.put(`${baseURL}/product/update/${productId}`, productData, {
        headers,
      })

      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }
  static async getProducts() {
    try {
      const response = await await http.get('/product/get')
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  static async getProductslanding() {
    try {
      const response = await http.get('/product/get', {
        params: {
          is_approve: true,
          is_available: true,
        },
      })
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  static async getProductByMitra() {
    try {
      const userData = localStorage.getItem('user_data')
      if (!userData) {
        throw new Error('User data not found')
      }

      const parsedData = JSON.parse(userData)
      const userId = parsedData.user.id

      console.log('Fetching products for mitra_id:', userId)

      const response = await http.get(`/product/get`, {
        params: {
          mitra_id: userId,
        },
      })
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error) {
      console.error('Error fetching products by mitra:', error)
      return []
    }
  }

  static async addProduct(productData: FormData) {
    try {
      const token = localStorage.getItem('auth_token')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const headers: any = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      // Gunakan axios langsung untuk FormData, bukan instance custom
      const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api'
      const response = await axios.post(`${baseURL}/product/post`, productData, {
        headers,
        // Jangan set Content-Type - biarkan browser set multipart/form-data dengan boundary
      })

      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error adding product:', error)
      console.error('Response data:', error.response?.data)
      throw error
    }
  }

  static async deleteProduct(productId: string) {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: Record<string, string> = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await http.delete(`/product/delete/${productId}`, { headers })

      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error: unknown) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  static async approveProduct(productId: string) {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await http.put(
        `/product/approve`,
        {
          id: productId,
        },
        { headers },
      )

      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error: unknown) {
      console.error('Error approving product:', error)
      throw error
    }
  }

  static async updateProductAvailability(productId: string, isAvailable: boolean) {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await http.put(
        `/product/availability/${productId}`,
        {
          is_available: isAvailable,
        },
        { headers },
      )

      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error: unknown) {
      console.error('Error updating product availability:', error)
      throw error
    }
  }
}

export default ProductServices
