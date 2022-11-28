import { defineStore } from 'pinia'

export const useStoreCounter = defineStore('counter',{ 
  state: () => ({ 
    count: 1
  }),
  getters: {
    dobleCount: (state) => state.count * 2
  },
  actions: {
    increment(){
      this.count++
    }
  }
})



