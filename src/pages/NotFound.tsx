import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found - MediCare Companion"
        description="The page you're looking for doesn't exist. Return to MediCare Companion to continue managing your medications and health."
        keywords="404, page not found, error page"
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-800 mb-2">404</CardTitle>
            <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-gray-500 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <a href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Dashboard
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500">
                Need help? Contact our support team for assistance with your medication management.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;