  import axios, { AxiosResponse,AxiosInstance } from 'axios';


  class HttpCall {
    private client: AxiosInstance;
    constructor(baseURL : string, timeout : number | null) {
      this.client = axios.create({
        baseURL,
        timeout: timeout ?? 1000,
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        }
      });
    }

    async get<T>(endpoint: string): Promise<T> {
      try {
        const response = await this.client.get<T>(endpoint);
        return response.data;
      } catch (error: any) {
        throw new Error(`GET request failed: ${error.message}`);
      }
    }
    async post<T>(endpoint: string, data: any): Promise<T> {
      try {
        const response = await this.client.post<T>(endpoint, data);
        return response.data;
      } catch (error: any) {
        throw new Error(`POST request failed: ${error.message}`);
      }
    }
  
    async put<T>(endpoint: string, data: any): Promise<T> {
      try {
        const response = await this.client.put<T>(endpoint, data);
        return response.data;
      } catch (error: any) {
        throw new Error(`PUT request failed: ${error.message}`);
      }
    }
  
    async delete<T>(endpoint: string): Promise<T> {
      try {
        const response = await this.client.delete<T>(endpoint);
        return response.data;
      } catch (error: any) {
        throw new Error(`DELETE request failed: ${error.message}`);
      }
    }
  }

  export default HttpCall;