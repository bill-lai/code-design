import type { App } from 'vue'

import * as components from './components'
export * from './components'

const install = (app: App) => {
  Object.values(components)
    .forEach((component: any) => {
      if (component.install) {
        app.use(component)
      }
    })
}

export default {
  install,
  version: 1
}