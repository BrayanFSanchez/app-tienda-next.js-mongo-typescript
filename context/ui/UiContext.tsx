
import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;

    // METHODS
    toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);