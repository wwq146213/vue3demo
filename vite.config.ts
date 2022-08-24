import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import legacyPlugin from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'//按需引入Elements 页面不需要引入可以直接使用
import AutoImport from 'unplugin-auto-import/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  '@': pathResolve("src")
}
export default defineConfig({
  //base: '',项目部署基础目录
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag === 'model-viewer'
      }
    }
  }),viteCompression({
    verbose: true,//gzip压缩
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  }),legacyPlugin({
    targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
  }),
  AutoImport({
    imports:['vue', 'vue-router'],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),

],
  build: {
    minify: "terser",
    terserOptions: {
      //清除console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  resolve: {
    alias
  },
  server: {
    host: '0.0.0.0',
    proxy: {
			'/api': {
				// target: 'http://47.108.172.21:5001/api/',
				changeOrigin: true,
			},
		},
    port: 3001
  }
})