import { createContext } from "react";

export const UserContext = createContext({
    isLoggedIn: false,
    user: {
        email: null,
        uid: null
    },
    toggleUserState: () => {}
})

// export const UserContext = createContext(false)