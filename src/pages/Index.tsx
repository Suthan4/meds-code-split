import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  UserCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContextProvider";
import { useClickOutside } from "@/hooks/useClickOutside";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import SEOHead from "@/components/SEOHead";
import { MedicalWebPageStructuredData } from "@/components/StructuredData";
import { 
  LazyOnboarding, 
  LazyPatientDashboard, 
  LazyCaretakerDashboard 
} from "@/components/LazyComponents";

type UserType = "patient" | "caretaker" | null;

const Index = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCaretakerDlgOpen, setIsCaretakerDlgOpen] = useState(false);
  const [isPatientDlgOpen, setIsPatientDlgOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const ref = useClickOutside<HTMLDivElement>(() => {
    if (showUserMenu) {
      setShowUserMenu(false);
    }
  });

  // Initialize user type from user metadata
  useEffect(() => {
    if (user?.userType) {
      setUserType(user.userType);
      setIsOnboarded(true);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
      setShowUserMenu(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error?.message
          : "Something went wrong. Please try again.";
      toast({
        title: "Unexpected Error",
        description: message,
      });
    }
  };

  const handleOnboardingComplete = (type: UserType) => {
    setUserType(type);
    setIsOnboarded(true);
  };

  const switchUserType = () => {
    const newType = userType === "patient" ? "caretaker" : "patient";
    setUserType(newType);
  };

  // SEO content based on user type
  const getSEOContent = () => {
    if (!isOnboarded) {
      return {
        title: "Get Started - MediCare Companion",
        description: "Choose your role and start managing medications effectively. Join thousands of patients and caregivers using MediCare Companion for better health outcomes.",
        keywords: "medication management setup, patient onboarding, caregiver registration, healthcare app setup"
      };
    }

    if (userType === "patient") {
      return {
        title: "Patient Dashboard - MediCare Companion",
        description: "Track your medications, monitor adherence, and maintain your health with our comprehensive patient dashboard. Set reminders and view your progress.",
        keywords: "patient dashboard, medication tracking, pill reminders, health monitoring, medication adherence"
      };
    }

    return {
      title: "Caretaker Dashboard - MediCare Companion", 
      description: "Monitor your loved one's medication adherence, receive alerts, and support their health journey with our comprehensive caretaker dashboard.",
      keywords: "caretaker dashboard, medication monitoring, patient care, health alerts, family caregiving"
    };
  };

  const seoContent = getSEOContent();

  if (!isOnboarded) {
    return (
      <>
        <SEOHead
          title={seoContent.title}
          description={seoContent.description}
          keywords={seoContent.keywords}
          url="https://medicare-companion.com/"
        />
        <MedicalWebPageStructuredData
          pageName="MediCare Companion - Getting Started"
          pageDescription="Choose your role and start managing medications effectively with our comprehensive healthcare platform."
        />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading onboarding..." />}>
            <LazyOnboarding onComplete={handleOnboardingComplete} />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        url="https://medicare-companion.com/"
      />
      <MedicalWebPageStructuredData
        pageName={seoContent.title}
        pageDescription={seoContent.description}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-border/20 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  MediCare Companion
                </h1>
                <p className="text-sm text-muted-foreground">
                  {userType === "patient" ? "Patient View" : "Caretaker View"}
                </p>
              </div>
            </div>
            {/* User Menu Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative" ref={ref}>
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-accent transition-colors"
                >
                  <UserCircle className="w-5 h-5" />
                  {user?.fullName || user?.email}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`} />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border/20 py-1 z-50">
                    <hr className="my-1 border-border/20" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={switchUserType}
                className="flex items-center gap-2 hover:bg-accent transition-colors"
              >
                {userType === "patient" ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                Switch to {userType === "patient" ? "Caretaker" : "Patient"}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="lg" text="Loading dashboard..." />}>
              {userType === "patient" ? (
                <LazyPatientDashboard
                  setIsPatientDlgOpen={setIsPatientDlgOpen}
                  isPatientDlgOpen={isPatientDlgOpen}
                />
              ) : (
                <LazyCaretakerDashboard
                  setIsCaretakerDlgOpen={setIsCaretakerDlgOpen}
                  isCaretakerDlgOpen={isCaretakerDlgOpen}
                />
              )}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
};

export default Index;