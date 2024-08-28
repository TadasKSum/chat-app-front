"use client"

import {create} from 'zustand'

const usePublicStore = create((set, get) => ({
    users: null,
    setUsers: (val) => set({users: val}),
}));

export default usePublicStore;