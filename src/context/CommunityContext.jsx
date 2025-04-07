
import React, { createContext, useContext, useState } from 'react';
import {
  CONSUMER_CONTRIBUTIONS_INITIAL_DATA,
  COMMUNITY_ORDERS_INITIAL_DATA,
  COMMUNITY_PROFILE_INITIAL_DATA,
  CONSUMER_PROFILES_INITIAL_DATA,
  NEW_CONSUMERS_INITIAL_DATA
} from './types';

// Create the context
const CommunityContext = createContext();

// Create the provider component
export const CommunityProvider = ({ children }) => {
  // Consumer contributions state
  const [consumerContributions, setConsumerContributions] = useState(CONSUMER_CONTRIBUTIONS_INITIAL_DATA);
  
  // Community orders state
  const [communityOrders, setCommunityOrders] = useState(COMMUNITY_ORDERS_INITIAL_DATA);
  
  // Community profile state
  const [communityProfile, setCommunityProfile] = useState(COMMUNITY_PROFILE_INITIAL_DATA);
  
  // Consumer profiles collection
  const [consumerProfiles, setConsumerProfiles] = useState(CONSUMER_PROFILES_INITIAL_DATA);
  
  // New consumers (joined in last 30 days)
  const [newConsumers, setNewConsumers] = useState(NEW_CONSUMERS_INITIAL_DATA);
  
  // Current viewed consumer details
  const [currentConsumer, setCurrentConsumer] = useState(null);
  
  // Function to update community profile
  const updateCommunityProfile = (updatedData) => {
    setCommunityProfile(prevData => {
      // Build the updated profile
      const updatedProfile = { ...prevData, ...updatedData };
      
      // If the address has changed, update the community name to match the new village
      if (updatedData.address && updatedData.address.includes('Village')) {
        const villageMatch = updatedData.address.match(/Village\s+([A-Z])/);
        if (villageMatch && villageMatch[1]) {
          const village = villageMatch[1];
          // Update name to reflect the new village if it contains the old village
          if (updatedProfile.name.includes('Village')) {
            updatedProfile.name = `Village ${village} Farmers Collective`;
          }
          
          // Also update the communityId to match the new village
          updatedProfile.id = `COM-10${village.charCodeAt(0) - 64}`; // A=1, B=2, etc.
        }
      }
      
      return updatedProfile;
    });
  };

  // Function to fulfill contribution
  const fulfillContribution = (id) => {
    setConsumerContributions(prevContributions => 
      prevContributions.map(contribution => 
        contribution.id === id ? { ...contribution, status: 'Fulfilled', fulfilled: true } : contribution
      )
    );
  };

  // Function to create community order
  const createCommunityOrder = () => {
    const pendingContributions = consumerContributions.filter(contribution => !contribution.fulfilled);
    
    if (pendingContributions.length === 0) {
      return false;
    }
    
    // Create a new community order by combining all pending contributions
    const items = [];
    pendingContributions.forEach(contribution => {
      contribution.items.forEach(item => {
        const existingItem = items.find(i => i.crop === item.crop);
        if (existingItem) {
          const quantity = parseFloat(existingItem.quantity) + parseFloat(item.quantity);
          existingItem.quantity = `${quantity} kg`;
        } else {
          items.push({ crop: item.crop, quantity: `${item.quantity} kg` });
        }
      });
    });
    
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    
    const newOrder = {
      id: `CO-${(communityOrders.length + 9).toString().padStart(3, '0')}`,
      date: today.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}),
      items,
      status: 'Processing',
      deliveryDate: deliveryDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    };
    
    setCommunityOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Mark all pending contributions as fulfilled
    pendingContributions.forEach(contribution => {
      fulfillContribution(contribution.id);
    });
    
    return true;
  };

  // Function to add community order
  const addCommunityOrder = (newOrder) => {
    const orderId = `CO-${(communityOrders.length + 9).toString().padStart(3, '0')}`;
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    
    const orderToAdd = {
      id: orderId,
      date: today.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}),
      items: newOrder.items,
      status: 'Processing',
      deliveryDate: deliveryDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    };
    
    setCommunityOrders(prevOrders => [orderToAdd, ...prevOrders]);
    return orderToAdd;
  };

  // Function to view consumer details
  const viewConsumerDetails = (consumerId) => {
    const consumer = consumerProfiles.find(profile => profile.id === consumerId);
    setCurrentConsumer(consumer || null);
    return consumer;
  };

  const value = {
    consumerContributions,
    communityOrders,
    communityProfile,
    consumerProfiles,
    newConsumers,
    currentConsumer,
    updateCommunityProfile,
    fulfillContribution,
    createCommunityOrder,
    addCommunityOrder,
    viewConsumerDetails
  };

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

// Hook to use the context
export const useCommunityContext = () => {
  return useContext(CommunityContext);
};
