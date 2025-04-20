import { createContext, ReactNode, useContext, useState } from 'react';


type AppContextStateProp<T> = [T, React.Dispatch<React.SetStateAction<T>>];

interface AppContextProps {
  darkMode: AppContextStateProp<boolean>;
}


export const AppContext = createContext<null | AppContextProps>(null);

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({children}: {
  children: ReactNode | ReactNode[]
}) {

  const [a, setA] = useState(true);

  return (
    <AppContext.Provider
      value={
      {
        darkMode: [a, setA]
      }
      }
    >
      {children}
    </AppContext.Provider>
  );
}
