import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '../routes';
import store from '../store'
import { ElMessage } from 'element-plus'

const headers: Readonly<Record<string, string | boolean>> = {};

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
      const token = store.getters.token
  
      if (token != null) {
        if (config.headers) {
          config.headers['token'] = token
        }
      }
      return config;
    } catch (error) {
      throw new Error('token 不存在');
    }
  };
class Http {
    private instance: AxiosInstance | null = null;
  
    private get http(): AxiosInstance {
      return this.instance != null ? this.instance : this.initHttp();
    }
  
    blobToJson (blob:any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsText(blob, 'utf-8')
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = err => {
          reject(err)
        }
      })
    }
  
    initHttp() {
        const http = axios.create({
          baseURL: import.meta.env.VITE_APP_BASE_API_URL,
          headers,
        });
    
        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
    
        http.interceptors.response.use(
          async (response) => {
            //文件流形式 --start--
            const { status, config } = response
            if(config.responseType === 'blob'){
              const result = await this.blobToJson(response.data)
              try {
                if (typeof result === "string") {
                  response.data = JSON.parse(result);
                }
              } catch (err) {
                return response.data
              }
            }
            //文件流形式 --end--
            if (response.data.code !== '200') {
              return this.handleError(response.data);
            }
            return response.data.data
          },
          (error) => {
            const { response } = error;
            return this.handleError(response);
          }
        );
    
        this.instance = http;
        return http;
      }
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
      return this.http.request(config);
    }
  
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.get<T, R>(url, config);
    }
  
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: T,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.post<T, R>(url, data, config);
    }
  
    put<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: T,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.put<T, R>(url, data, config);
    }
  
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.delete<T, R>(url, config);
    }
  
    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError(error: { code: string; msg: string }) {
      const { code, msg } = error;
  
      switch (code) {
        case '30000': {
          // 登录过期
          localStorage.removeItem('token')
          router.replace({ name: 'Login' })
          break;
        }
        default:
          ElMessage({ type: 'error', message: msg })
          break;
      }
  
      return Promise.reject(msg);
    }
  }
  
  const maxios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL
  })
  
  maxios.interceptors.request.use(config => {
    return config
  }, error => {
    throw error
  })
  
  maxios.interceptors.response.use(res => {
    return res.data
  }, error => {
    throw error
  })
  
  export const http = new Http()