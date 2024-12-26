import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    visible: false, // Whether the toast is visible or not
    message: '', // The message to display in the toast
    duration: 3000, // Duration for how long the toast stays visible
  }),
  actions: {
    showToast(message: string, duration: number = 3000) {
      this.message = message
      this.duration = duration
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    },
    hideToast() {
      this.visible = false
    },
  },
})
