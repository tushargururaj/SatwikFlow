
import React, { createContext, useContext } from 'react';
import { FarmerProvider, useFarmerContext } from './FarmerContext';
import { ConsumerProvider, useConsumerContext } from './ConsumerContext';
import { CommunityProvider, useCommunityContext } from './CommunityContext';

// Create the AppContext
export const AppContext = createContext();

// Create the AppProvider component
export const AppProvider = ({ children }) => {
  return (
    <FarmerProvider>
      <ConsumerProvider>
        <CommunityProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </CommunityProvider>
      </ConsumerProvider>
    </FarmerProvider>
  );
};

// Internal provider that combines all contexts
const AppContextProvider = ({ children }) => {
  // Get all the context values
  const farmerContext = useFarmerContext();
  const consumerContext = useConsumerContext();
  const communityContext = useCommunityContext();

  // Combine all context values
  const value = {
    ...farmerContext,
    ...consumerContext,
    ...communityContext
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the app context
export const useAppContext = () => {
  return useContext(AppContext);
};
