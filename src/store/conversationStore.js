import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useConversationStore = create(
    persist((set, get) => ({
        conversations: [],
        setConversations: (val) => set({conversations: val}),
    }), {
        name: "conversations",
        storage: createJSONStorage(() => sessionStorage),
    }),
)

export default useConversationStore;