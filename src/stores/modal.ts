import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isVisible: false,
    title: '',
    message: '',
    onConfirm: null,
  }),
  actions: {
    showModal(title: string, message: string, onConfirm: null) {
      this.title = title
      this.message = message
      this.onConfirm = onConfirm
      this.isVisible = true
    },
    hideModal() {
      this.isVisible = false
      this.title = ''
      this.message = ''
      this.onConfirm = null
    },
    confirm() {
      if (this.onConfirm) {
        this.onConfirm()
      }
      this.hideModal() // Hide the modal after confirmation
    },
    cancel() {
      this.hideModal() // Just hide the modal on cancel
    },
  },
})
