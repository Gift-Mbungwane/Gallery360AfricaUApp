import { createContext } from "react";

export const SplashContext = createContext({
    showSplash: true,
    deactivateSplash: () => {}
})