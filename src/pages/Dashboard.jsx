import Layout from '../components/layout/Layout.jsx';
import DashboardStats from '../components/dashboard/DashboardStats.jsx';
import FleetPerformance from '../components/dashboard/FleetPerformance.jsx';
import AlertsPanel from '../components/dashboard/AlertsPanel.jsx';
import RecentActivities from '../components/dashboard/RecentActivities.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';

export default function Dashboard() {
  const { state } = useFleet();
  if (state.loading) return <Layout title="Dashboard"><Loader /></Layout>;

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><FleetPerformance /></div>
          <AlertsPanel />
        </div>
        <RecentActivities />
      </div>
    </Layout>
  );
}