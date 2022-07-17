import { createContext } from "react";

export const UserContext = createContext({
    isLoggedIn: false,
    toggleUserState: () => {}
})

// export const UserContext = createContext(false)