import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./routes/protectedRoutes";
import { AuthProvider } from "./context/authContextProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import { LazyAuthentication } from "./components/LazyComponents";
import { MedicationAppStructuredData, OrganizationStructuredData } from "./components/StructuredData";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              {/* Global Structured Data */}
              <MedicationAppStructuredData />
              <OrganizationStructuredData />
              
              <Suspense fallback={<LoadingSpinner size="lg" text="Loading application..." />}>
                <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Index />} />
                  </Route>
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route 
                    path="/auth" 
                    element={
                      <Suspense fallback={<LoadingSpinner size="lg" text="Loading authentication..." />}>
                        <LazyAuthentication />
                      </Suspense>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;