import { defineConfig } from 'vite'
import { resolve } from 'path'

import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

import type { UserConfigExport } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const config: UserConfigExport = {
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: [{
        find: 'code-design',
        replacement: resolve(__dirname, './components')
      }]
    }
  }

  if (mode === 'development') {
    Object.assign<UserConfigExport, UserConfigExport>(config, {
      root: './site',
      server: {
        host: '0.0.0.0',
        port: 5000,
        open: true,
      }
    })
  } else {
    Object.assign<UserConfigExport, UserConfigExport>(config, {
      build: {
        outDir: 'lib',
        lib: {
          entry: resolve(__dirname, './components/index.ts'),
          formats: ['es', 'cjs'],
          name: 'codeDesign',
          fileName: 'codeDesign',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      },
      plugins: [
        dts({
          outputDir: ['lib'],
          include: ['components'],
          staticImport: true,
          insertTypesEntry: true,
          noEmitOnError: true,
          rollupTypes: true
        }),
        ...config.plugins,
      ]
    })
  }

  return defineConfig(config)
}