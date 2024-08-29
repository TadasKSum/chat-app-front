import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useSingleTalk = create(
    persist((set, get) => ({
        talk: null,
        setTalk: (val) => set({talk: val}),
    }), {
        name: "talk",
        storage: createJSONStorage(() => sessionStorage),
    })
)

export default useSingleTalk;