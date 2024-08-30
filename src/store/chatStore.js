import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useChatStore = create(
    persist((set, get) => ({
        chat: [],
        chatUsers: [],
        chatOnline: false,
        setChat: (val) => set({chat: val}),
        setChatUsers: (val) => set({chatUsers: val}),
        setChatOnline: (val) => set({chatOnline: val}),
    }), {
        name: "chat",
        storage: createJSONStorage(() => sessionStorage)
    })
)

export default useChatStore;