declare module '*.vue-mc' {
    import type { DefineComponent } from 'vue-mc'
    const component: DefineComponent<{}, {}, any>
    export default component
  }