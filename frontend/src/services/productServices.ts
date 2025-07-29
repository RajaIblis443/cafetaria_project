import http from '@/lib/axios'

class ProductServices {
  static async getProducts() {
    try {
      const response = await http.get('/product/get')
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }
}

export default ProductServices
