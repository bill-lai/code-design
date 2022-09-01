import type { App } from 'vue'

export const withInstall = <T>(comp: T): T  => {
  const c = comp as any
  c.install = (app: App) => {
    app.component(c.displayName || c.name, c)
  }
  return c
}