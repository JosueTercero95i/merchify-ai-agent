import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Package, 
  ShoppingCart, 
  Settings,
  Menu,
  X,
  Bot,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatsTab from "@/components/dashboard/ChatsTab";
import ProductsTab from "@/components/dashboard/ProductsTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import SettingsTab from "@/components/dashboard/SettingsTab";

type TabType = "chats" | "products" | "orders" | "settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("chats");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const tabs = [
    { id: "chats" as TabType, label: "Chats", icon: MessageCircle },
    { id: "products" as TabType, label: "Productos", icon: Package },
    { id: "orders" as TabType, label: "Ventas", icon: ShoppingCart },
    { id: "settings" as TabType, label: "Configuración", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "chats":
        return <ChatsTab />;
      case "products":
        return <ProductsTab />;
      case "orders":
        return <OrdersTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <ChatsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="bg-card border-r border-border flex flex-col fixed left-0 top-0 bottom-0 z-40"
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-foreground whitespace-nowrap"
              >
                Merchify
              </motion.span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium whitespace-nowrap"
                >
                  {tab.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-border">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleLogout} className="w-full">
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 260 : 72 }}
      >
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderTabContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
