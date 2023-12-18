import { createContext } from "react";

export const UserDetails = createContext({
    email: null,
    userId: null,
    fullName: null,
    photoUrl: null,
    toggleUserDetails: () => { }
})

// export const UserContext = createContext(false)