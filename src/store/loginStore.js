import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useLoginStore = create(
    persist((set, get) => ({
        isLoggedIn: false,
        setIsLoggedIn: (val) => set({isLoggedIn: val}),
    }), {
        name: "status",
        storage: createJSONStorage(() => sessionStorage),
    }),
)

export default useLoginStore;