
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Calendar, 
  Trophy, 
  Settings, 
  LogOut, 
  BarChart3,
  MessageSquare,
  Shield,
  Package
} from "lucide-react";
import { useSecureAuth } from "../hooks/useSecureAuth";
import { AdminConfigurations as ConfigurationsType } from "@/types/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminEventManagement from "@/components/admin/AdminEventManagement";
import AdminAchievementManagement from "@/components/admin/AdminAchievementManagement";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminConfigurations from "@/components/admin/AdminConfigurations";
import AdminContentManagement from "@/components/admin/AdminContentManagement";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [configurations, setConfigurations] = useState<ConfigurationsType>({
    general: {
      siteName: "Kids Learning Platform",
      siteDescription: "A platform for kids to learn and grow",
      contactEmail: "admin@kidslearning.com",
      contactPhone: "+91 9876543210",
      maintenanceMode: false,
      registrationEnabled: true,
      maxUsersPerEvent: 50
    },
    ui: {
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6",
      logoUrl: "",
      faviconUrl: "",
      customCSS: "",
      showWelcomeMessage: true,
      welcomeMessage: "Welcome to our Kids Learning Platform!"
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      fromEmail: "noreply@kidslearning.com",
      fromName: "Kids Learning Platform"
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      requireEmailVerification: true,
      twoFactorEnabled: false,
      passwordMinLength: 8
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      achievementNotifications: true,
      eventReminders: true,
      newsletterEnabled: true
    },
    analytics: {
      googleAnalyticsId: "",
      trackingEnabled: true,
      cookieConsentRequired: true,
      dataRetentionDays: 365
    }
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useSecureAuth();

  useEffect(() => {
    console.log("AdminPanel: Checking authentication", { isAuthenticated, user });
    
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      navigate("/admin-login");
      return;
    }

    if (!user) {
      console.log("No user data, redirecting to login");
      navigate("/admin-login");
      return;
    }

    if (user.role !== 'admin') {
      console.log("User is not admin, access denied");
      toast({
        title: "Access Denied",
        description: "Insufficient privileges to access admin panel",
        variant: "destructive"
      });
      logout();
      navigate("/admin-login");
    } else {
      console.log("User authenticated and authorized for admin panel");
    }
  }, [isAuthenticated, user, navigate, logout, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been securely logged out",
    });
    navigate("/admin-login");
  };

  // Show loading while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "content", label: "Content Management", icon: Package },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "configurations", label: "Configurations", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Admin Control Panel
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, <strong>{user.username}</strong>
            </span>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Secure Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "users" && <AdminUserManagement />}
          {activeTab === "events" && <AdminEventManagement />}
          {activeTab === "achievements" && <AdminAchievementManagement />}
          {activeTab === "content" && <AdminContentManagement />}
          {activeTab === "messages" && <AdminMessages />}
          {activeTab === "configurations" && (
            <AdminConfigurations 
              configurations={configurations} 
              setConfigurations={setConfigurations} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
