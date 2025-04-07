
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Check, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';

// Available crops
const availableCrops = [
  { name: 'Tomato', unit: 'kg' },
  { name: 'Onion', unit: 'kg' },
  { name: 'Potato', unit: 'kg' },
  { name: 'Rice', unit: 'kg' },
  { name: 'Wheat', unit: 'kg' },
  { name: 'Chili', unit: 'kg' },
  { name: 'Brinjal', unit: 'kg' },
];

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { addCommunityOrder } = useAppContext();
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  
  const handleAddToCart = () => {
    if (!selectedCrop || !quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
      toast.error("Please select a crop and enter a valid quantity");
      return;
    }
    
    const crop = availableCrops.find(c => c.name === selectedCrop);
    
    setCartItems([
      ...cartItems,
      {
        crop: selectedCrop,
        quantity: parseFloat(quantity),
        unit: crop.unit
      }
    ]);
    
    // Reset inputs
    setSelectedCrop('');
    setQuantity('');
    
    toast.success(`Added ${quantity} ${crop.unit} of ${selectedCrop} to cart`);
  };
  
  const handleQuantityChange = (index, delta) => {
    const newCartItems = [...cartItems];
    const newQuantity = Math.max(0, newCartItems[index].quantity + delta);
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
  };
  
  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out items with quantity 0
    const finalItems = cartItems.filter(item => item.quantity > 0);
    
    if (finalItems.length === 0) {
      toast.error("Please add at least one item to your order");
      return;
    }
    
    // Add order using context
    const newOrder = addCommunityOrder({
      items: finalItems.map(item => ({
        crop: item.crop,
        quantity: `${item.quantity} ${item.unit}`
      }))
    });
    
    toast.success("Community order placed successfully!");
    setTimeout(() => {
      navigate('/community-head/orders');
    }, 1500);
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <DashboardLayout userType="Community Head" userName="Rajesh Singh">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/community-head')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Place Community Order</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-5 mb-6">
                <div className="sm:col-span-2">
                  <Select 
                    value={selectedCrop} 
                    onValueChange={setSelectedCrop}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCrops.map(crop => (
                        <SelectItem key={crop.name} value={crop.name}>
                          {crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="sm:col-span-2">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Enter quantity (kg)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button 
                    type="button" 
                    onClick={handleAddToCart}
                    className="w-full bg-leaf-600 hover:bg-leaf-700"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-md">
                    Your cart is empty. Add items above.
                  </div>
                ) : (
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-50 font-medium">
                      <div className="col-span-5">Crop</div>
                      <div className="col-span-5 text-center">Quantity</div>
                      <div className="col-span-2"></div>
                    </div>
                    
                    {cartItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 py-3 px-4 items-center">
                        <div className="col-span-5">{item.crop}</div>
                        <div className="col-span-5 flex items-center justify-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(index, -1)}
                            disabled={item.quantity <= 0.1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            className="w-16 text-center"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newCartItems = [...cartItems];
                              newCartItems[index].quantity = parseFloat(e.target.value) || 0;
                              setCartItems(newCartItems);
                            }}
                            min="0"
                            step="0.1"
                          />
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(index, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="col-span-2 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {cartItems.length > 0 && (
                  <div className="flex justify-end">
                    <div className="bg-gray-50 py-2 px-4 rounded-md">
                      <span className="font-medium">Total: </span>
                      <span className="font-bold">{getTotalItems()} kg</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any special instructions or notes for this order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/community-head')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-leaf-600 hover:bg-leaf-700"
              disabled={cartItems.length === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Place Community Order
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PlaceOrder;
