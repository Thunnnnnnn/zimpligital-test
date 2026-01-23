import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bootstrap
    }
  }
})