
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ShoppingCart, Leaf } from 'lucide-react';
import { toast } from 'sonner';

const availableCrops = [
  { name: 'Tomato', unit: 'kg', image: '🍅' },
  { name: 'Onion', unit: 'kg', image: '🧅' },
  { name: 'Potato', unit: 'kg', image: '🥔' },
  { name: 'Rice', unit: 'kg', image: '🌾' },
  { name: 'Wheat', unit: 'kg', image: '🌾' },
  { name: 'Chili', unit: 'kg', image: '🌶️' },
  { name: 'Brinjal', unit: 'kg', image: '🍆' },
];

const NewOrder = () => {
  const navigate = useNavigate();
  const { addOrder } = useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');

  const addToCart = () => {
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
        unit: crop.unit,
        image: crop.image
      }
    ]);
    
    // Reset inputs
    setSelectedCrop('');
    setQuantity('');
    
    toast.success(`Added ${quantity} ${crop.unit} of ${selectedCrop} to cart`);
  };

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    toast.info("Item removed from cart");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Add order using context - Pass just the quantity number
    const newOrder = addOrder({
      items: cartItems.map(item => ({
        crop: item.crop,
        quantity: item.quantity
      }))
    });
    
    toast.success("Order placed successfully!");
    setTimeout(() => {
      navigate("/consumer/orders");
    }, 1500);
  };

  return (
    <DashboardLayout userType="Consumer" userName="Sunita Sharma">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">New Order</h1>
        <p className="text-muted-foreground">Add items to your cart and place your order</p>
      </div>

      <div className="bg-gradient-to-r from-leaf-50 to-green-50 p-6 rounded-lg mb-6 border border-leaf-100">
        <div className="flex items-center gap-3 mb-2">
          <Leaf className="h-6 w-6 text-leaf-600" />
          <h2 className="text-lg font-medium text-leaf-700">Fresh Farm Products</h2>
        </div>
        <p className="text-muted-foreground">
          All products are sourced directly from local farmers, ensuring you receive the freshest produce possible.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-5">
                <div className="sm:col-span-2">
                  <Label htmlFor="crop">Select Crop</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger id="crop">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCrops.map((crop) => (
                        <SelectItem key={crop.name} value={crop.name}>
                          <span className="flex items-center gap-2">
                            <span>{crop.image}</span> {crop.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="sm:col-span-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={addToCart} 
                    className="w-full bg-leaf-600 hover:bg-leaf-700"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Available Crops</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableCrops.map((crop) => (
                    <div 
                      key={crop.name} 
                      className="border rounded-md p-3 text-center cursor-pointer hover:bg-leaf-50 hover:border-leaf-200 transition-colors flex flex-col items-center gap-1"
                      onClick={() => setSelectedCrop(crop.name)}
                    >
                      <span className="text-2xl">{crop.image}</span>
                      <span>{crop.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Your Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.image}</span>
                          <div>
                            <span className="font-medium">{item.crop}</span>
                            <div className="text-sm text-muted-foreground">
                              {item.quantity} {item.unit}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="text-red-500 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3 mb-6">
                    <div className="flex justify-between font-medium">
                      <span>Total Items:</span>
                      <span>{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-1">
                      <span>Total Quantity:</span>
                      <span>{calculateTotal()} kg</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={placeOrder}
                    className="w-full bg-leaf-600 hover:bg-leaf-700"
                  >
                    Place Order
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
