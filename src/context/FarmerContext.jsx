
import React, { createContext, useContext, useState } from 'react';
import { FARMER_INITIAL_DATA, UPDATES_INITIAL_DATA, ACTIVE_CROPS_INITIAL_DATA } from './types';

// Create the context
const FarmerContext = createContext();

// Create the provider component
export const FarmerProvider = ({ children }) => {
  // Farmers state
  const [farmers, setFarmers] = useState(FARMER_INITIAL_DATA);
  
  // Farmer updates state
  const [farmerUpdates, setFarmerUpdates] = useState(UPDATES_INITIAL_DATA);
  
  // Active crops state
  const [activeCrops, setActiveCrops] = useState(ACTIVE_CROPS_INITIAL_DATA);
  
  // Function to update farmer
  const updateFarmer = (id, updatedData) => {
    setFarmers(prevFarmers => 
      prevFarmers.map(farmer => 
        farmer.id === parseInt(id) ? { ...farmer, ...updatedData } : farmer
      )
    );
  };

  // Function to add new farmer
  const addFarmer = (newFarmer) => {
    const newId = farmers.length > 0 ? Math.max(...farmers.map(f => f.id)) + 1 : 1;
    const farmerToAdd = {
      id: newId,
      crops: [],
      lastUpdate: new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}),
      ...newFarmer
    };
    
    setFarmers(prevFarmers => [...prevFarmers, farmerToAdd]);
    return farmerToAdd;
  };

  // Function to add new farmer update
  const addFarmerUpdate = (newUpdate) => {
    const updatedId = farmerUpdates.length + 1;
    const update = { id: updatedId, ...newUpdate };
    
    setFarmerUpdates(prevUpdates => [
      update,
      ...prevUpdates
    ]);
    
    // If there are crops in the update, update the farmer's crop list
    if (newUpdate.crops && newUpdate.crops.length > 0) {
      const farmer = farmers.find(f => f.id === parseInt(newUpdate.farmerId));
      if (farmer) {
        const updatedCrops = [...new Set([...farmer.crops, ...newUpdate.crops.map(c => c.name)])];
        updateFarmer(newUpdate.farmerId, { 
          crops: updatedCrops,
          lastUpdate: newUpdate.date
        });
      }
    }
    
    return update;
  };

  // Function to add new crop
  const addCrop = (newCrop) => {
    const cropId = activeCrops.length > 0 ? Math.max(...activeCrops.map(c => c.id)) + 1 : 1;
    const farmer = farmers.find(f => f.id === parseInt(newCrop.farmerId));
    
    const farmerName = farmer ? farmer.name : "Unknown";
    const cropToAdd = { 
      id: cropId, 
      farmerName, 
      ...newCrop 
    };
    
    setActiveCrops(prevCrops => [
      cropToAdd,
      ...prevCrops
    ]);
    
    // Update the farmer's crop list if not already included
    if (farmer) {
      const updatedCrops = [...new Set([...farmer.crops, newCrop.cropName])];
      updateFarmer(newCrop.farmerId, { 
        crops: updatedCrops,
        lastUpdate: new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
      });
    }
    
    return cropToAdd;
  };

  const value = {
    farmers,
    farmerUpdates,
    activeCrops,
    updateFarmer,
    addFarmer,
    addFarmerUpdate,
    addCrop
  };

  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>;
};

// Hook to use the context
export const useFarmerContext = () => {
  return useContext(FarmerContext);
};
