import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const usePrivateStore = create(
    persist((set, get) => ({
        user: {
            username: "",
            nickname: "",
            picture: "",
            id: "",
            token: ""
        },
        setUser: (newUser) =>
            set((prevState) => ({
                ...prevState,
                user: { ...prevState.user, ...newUser },
            })),
        isLoggedIn: false,
        setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
    }), {
        name: "user",
        storage: createJSONStorage(() => sessionStorage),
    })
)

export default usePrivateStore;