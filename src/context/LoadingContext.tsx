// context/LoadingContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import GlobalSpinner from '../ui/loaders/GlobalSpinner';


type LoadingContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

// Create context with undefined default
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Type for children props
type LoadingProviderProps = {
  children: ReactNode;
};

export function LoadingProvider({ children }: LoadingProviderProps) {

  const [count, setCount] = useState(0);

  const showLoader = () => setCount(c=>c+1);
  const hideLoader = () => setCount(c=> Math.max(0,c-1));
useEffect(() => {
  console.log("loader count:", count);
}, [count]);

  return (
    <LoadingContext.Provider value={{ loading:count>0, showLoader, hideLoader }}>
      {children}
      {count > 0 && <GlobalSpinner />}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
