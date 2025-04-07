import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/Login";
import AgentDashboard from "./pages/agent/AgentDashboard";
import FarmersList from "./pages/agent/FarmersList";
import FarmerDetail from "./pages/agent/FarmerDetail";
import AddFarmer from "./pages/agent/AddFarmer";
import EditFarmer from "./pages/agent/EditFarmer";
import AddCrop from "./pages/agent/AddCrop";
import FarmerUpdates from "./pages/agent/FarmerUpdates";
import ActiveCrops from "./pages/agent/ActiveCrops";
import ConsumerDashboard from "./pages/consumer/ConsumerDashboard";
import ConsumerProfile from "./pages/consumer/ConsumerProfile";
import ConsumerOrders from "./pages/consumer/ConsumerOrders";
import NewOrder from "./pages/consumer/NewOrder";
import CommunityHeadDashboard from "./pages/communityHead/CommunityHeadDashboard";
import CommunityProfile from "./pages/communityHead/CommunityProfile";
import OrderContributions from "./pages/communityHead/OrderContributions";
import OrderDemandSummary from "./pages/communityHead/OrderDemandSummary";
import ConsumerDetails from "./pages/communityHead/ConsumerDetails";
import PlaceOrder from "./pages/communityHead/PlaceOrder";
import CommunityOrders from "./pages/communityHead/CommunityOrders";
import NewConsumers from "./pages/communityHead/NewConsumers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Login />} />
            
            {/* Agent Routes */}
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/farmers" element={<FarmersList />} />
            <Route path="/agent/farmers/:id" element={<FarmerDetail />} />
            <Route path="/agent/farmers/:id/edit" element={<EditFarmer />} />
            <Route path="/agent/farmers/add" element={<AddFarmer />} />
            <Route path="/agent/add-crop" element={<AddCrop />} />
            <Route path="/agent/active-crops" element={<ActiveCrops />} />
            <Route path="/agent/updates" element={<FarmerUpdates />} />
            
            {/* Consumer Routes */}
            <Route path="/consumer" element={<ConsumerDashboard />} />
            <Route path="/consumer/profile" element={<ConsumerProfile />} />
            <Route path="/consumer/new-order" element={<NewOrder />} />
            <Route path="/consumer/orders" element={<ConsumerOrders />} />
            
            {/* Community Head Routes */}
            <Route path="/community-head" element={<CommunityHeadDashboard />} />
            <Route path="/community-head/profile" element={<CommunityProfile />} />
            <Route path="/community-head/place-order" element={<PlaceOrder />} />
            <Route path="/community-head/orders" element={<CommunityOrders />} />
            <Route path="/community-head/orders/:id/contributions" element={<OrderContributions />} />
            <Route path="/community-head/orders/:id/demand" element={<OrderDemandSummary />} />
            <Route path="/community-head/consumers/:id" element={<ConsumerDetails />} />
            <Route path="/community-head/new-consumers" element={<NewConsumers />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;