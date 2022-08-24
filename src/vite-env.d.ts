/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_APP_BASE_API_URL: string
  readonly VITE_APP_WX_APPID: string
  readonly VITE_APP_STATIC_URL: string
  readonly VITE_APP_OPENSEA_BASE_URL: string
}