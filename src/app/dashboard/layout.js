import Dashboard from "@/module/dashboard";
import Sidebar from "@/module/dashboard/components/sidebar";

export default function DashboardLayout({ children }) {
  return <Dashboard>{children}</Dashboard>;
}
