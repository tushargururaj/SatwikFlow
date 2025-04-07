
import React, { createContext, useContext, useState } from 'react';
import { CONSUMER_ORDERS_INITIAL_DATA, CONSUMER_PROFILE_INITIAL_DATA } from './types';

// Create the context
const ConsumerContext = createContext();

// Create the provider component
export const ConsumerProvider = ({ children }) => {
  // Consumer orders state
  const [consumerOrders, setConsumerOrders] = useState(CONSUMER_ORDERS_INITIAL_DATA);
  
  // Consumer profile state
  const [consumerProfile, setConsumerProfile] = useState(CONSUMER_PROFILE_INITIAL_DATA);
  
  // Function to add new order
  const addOrder = (newOrder) => {
    const orderId = `ORD-${(consumerOrders.length + 6).toString().padStart(3, '0')}`;
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    
    const orderToAdd = {
      id: orderId,
      date: today.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}),
      items: newOrder.items.map(item => ({
        crop: item.crop,
        quantity: item.quantity // Remove the "kg" since it's added elsewhere
      })),
      status: 'Processing',
      deliveryDate: deliveryDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    };
    
    setConsumerOrders(prevOrders => [orderToAdd, ...prevOrders]);
    return orderToAdd;
  };

  // Function to reorder
  const reorder = (orderId) => {
    const order = consumerOrders.find(order => order.id === orderId);
    if (order) {
      return addOrder({ items: order.items });
    }
    return null;
  };

  // Function to update consumer profile
  const updateConsumerProfile = (updatedData) => {
    setConsumerProfile(prevData => {
      // Check if the village has changed, update the community too
      const updatedProfile = { ...prevData, ...updatedData };
      
      if (updatedData.address && updatedData.address.includes('Village')) {
        // Extract the village from the address (simplistic approach)
        const villageMatch = updatedData.address.match(/Village\s+([A-Z])/);
        if (villageMatch && villageMatch[1]) {
          const village = villageMatch[1];
          updatedProfile.community = `Village ${village}`;
          
          // If the community ID changed, update it too (Village A = COM-101, Village B = COM-102, etc.)
          updatedProfile.communityId = `COM-10${village.charCodeAt(0) - 64}`; // A=1, B=2, etc.
        }
      }
      
      return updatedProfile;
    });
  };

  const value = {
    consumerOrders,
    consumerProfile,
    addOrder,
    reorder,
    updateConsumerProfile
  };

  return <ConsumerContext.Provider value={value}>{children}</ConsumerContext.Provider>;
};

// Hook to use the context
export const useConsumerContext = () => {
  return useContext(ConsumerContext);
};
