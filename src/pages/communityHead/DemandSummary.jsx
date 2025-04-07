
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, ShoppingBag, FileBarChart, ShoppingCart } from 'lucide-react';

// Mock community demand data
const demandData = [
  { crop: 'Tomato', quantity: 8, contributors: 2 },
  { crop: 'Onion', quantity: 4, contributors: 1 },
  { crop: 'Brinjal', quantity: 2, contributors: 1 },
  { crop: 'Potato', quantity: 6, contributors: 1 }
];

// Colors for the pie chart
const COLORS = ['#4ade80', '#facc15', '#fb923c', '#a78bfa', '#60a5fa'];

const DemandSummary = () => {
  return (
    <DashboardLayout userType="Community Head" userName="Rajesh Singh">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Demand Summary</h1>
            <p className="text-muted-foreground">Combined demand across all community members</p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/community-head/contributions">
              <Button variant="outline" className="w-full sm:w-auto">
                <Users className="h-4 w-4 mr-2" />
                View Contributions
              </Button>
            </Link>
            <Link to="/community-head/place-order">
              <Button className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag size={18} className="text-leaf-700" />
                Current Community Demand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">20kg</h3>
                      <p className="text-sm text-muted-foreground">Total Demand</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">4</h3>
                      <p className="text-sm text-muted-foreground">Crop Types</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">3</h3>
                      <p className="text-sm text-muted-foreground">Contributors</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">5</h3>
                      <p className="text-sm text-muted-foreground">Pending Orders</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Demand Breakdown</h3>
                  
                  {demandData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.crop}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.quantity} kg</span>
                        <Badge variant="outline" className="text-xs bg-leaf-50 text-leaf-700 border-leaf-200">
                          {item.contributors} {item.contributors === 1 ? 'contributor' : 'contributors'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileBarChart size={18} className="text-leaf-700" />
                Crop Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demandData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="quantity"
                      nameKey="crop"
                      label
                    >
                      {demandData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Demand Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-muted-foreground">Historical demand trends will be shown here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DemandSummary;
