
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarRange, User, Users } from 'lucide-react';

// Mock data for new consumers
const newConsumers = [
  {
    id: "C-008",
    name: "Anita Sharma",
    joinDate: "March 15, 2025",
    address: "House No. 12, Village B",
    phone: "+91 98765 12345"
  },
  {
    id: "C-009",
    name: "Rakesh Verma",
    joinDate: "March 18, 2025",
    address: "House No. 7, Near School, Village B",
    phone: "+91 87654 32198"
  },
  {
    id: "C-010",
    name: "Meena Gupta",
    joinDate: "March 25, 2025",
    address: "House No. 22, Main Road, Village B",
    phone: "+91 76543 21987"
  },
  {
    id: "C-011",
    name: "Suresh Patel",
    joinDate: "April 2, 2025",
    address: "House No. 9, Village B",
    phone: "+91 65432 19876"
  }
];

const NewConsumers = () => {
  return (
    <DashboardLayout userType="Community Head" userName="Rajesh Singh">
      <div className="mb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">New Community Members</h1>
          <p className="text-muted-foreground">Consumers who joined in the last 30 days</p>
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users size={18} className="text-leaf-700" />
                Recent Joiners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarRange className="h-4 w-4" />
                  Last 30 days
                </span>
                <Badge variant="outline" className="bg-leaf-50 text-leaf-700">
                  {newConsumers.length} new members
                </Badge>
              </div>
              
              <div className="space-y-4">
                {newConsumers.map((consumer) => (
                  <Card key={consumer.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-leaf-700" />
                            {consumer.name}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {consumer.id}</div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Joined {consumer.joinDate}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <span className="text-muted-foreground">Address:</span>{" "}
                            {consumer.address}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span>{" "}
                            {consumer.phone}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewConsumers;
