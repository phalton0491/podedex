import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// I would have put all pokemon data into context but did not want to bloat the code with extra getters and setters
// I felt for this task it would be better to keep the data as is
// Furthermore, I used this simple context state to persist the search query when navigating to other parts of the application
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};