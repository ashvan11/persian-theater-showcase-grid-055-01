
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShowDetails from "./pages/ShowDetails";
import Wall from "./pages/Wall";
import BookTicket from "./pages/BookTicket";
import CrewDetails from "./pages/CrewDetails";
import CreateNew from "./pages/CreateNew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/book/:id" element={<BookTicket />} />
          <Route path="/crew/:id" element={<CrewDetails />} />
          <Route path="/create" element={<CreateNew />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
