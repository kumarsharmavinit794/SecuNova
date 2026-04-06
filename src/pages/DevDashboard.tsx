import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, Send, Monitor, Clock, CheckCircle, XCircle, AlertTriangle,
  ArrowRight, Trash2, BarChart3, Activity
} from "lucide-react";
import { useSettingsStore } from "@/store/settingsStore";
import { toast } from "sonner";

const typeIcons = {
  domain: Globe,
  api: Send,
  frontend: Monitor,
  security: Globe,
};

const typeColors = {
  domain: "text-primary bg-primary/10",
  api: "text-warning bg-warning/10",
  frontend: "text-safe bg-safe/10",
  security: "text-danger bg-danger/10",
};

const statusIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const statusColors = {
  success: "text-safe",
  warning: "text-warning",
  error: "text-danger",
};

const DevDashboard = () => {
  const { testHistory, clearHistory } = useSettingsStore();

  const domainTests = testHistory.filter((t) => t.type === "domain").length;
  const apiTests = testHistory.filter((t) => t.type === "api").length;
  const frontendTests = testHistory.filter((t) => t.type === "frontend").length;
  const successRate = testHistory.length > 0
    ? Math.round((testHistory.filter((t) => t.status === "success").length / testHistory.length) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            </div>
            {testHistory.length > 0 && (
              <button
                onClick={() => { clearHistory(); toast.success("History cleared"); }}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trash2 className="h-3 w-3" /> Clear History
              </button>
            )}
          </div>
          <p className="text-muted-foreground mb-8">Test history and status overview</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Tests", value: testHistory.length, icon: Activity, color: "text-primary" },
            { label: "Domain Tests", value: domainTests, icon: Globe, color: "text-primary" },
            { label: "API Tests", value: apiTests, icon: Send, color: "text-warning" },
            { label: "Success Rate", value: `${successRate}%`, icon: CheckCircle, color: "text-safe" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5 text-center"
            >
              <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            { to: "/domain-test", icon: Globe, label: "New Domain Test", color: "text-primary border-primary/20 hover:bg-primary/5" },
            { to: "/api-test", icon: Send, label: "New API Test", color: "text-warning border-warning/20 hover:bg-warning/5" },
            { to: "/frontend-test", icon: Monitor, label: "New Frontend Test", color: "text-safe border-safe/20 hover:bg-safe/5" },
          ].map((action, i) => (
            <Link
              key={i}
              to={action.to}
              className={`glass rounded-xl p-4 flex items-center gap-3 border transition-colors group ${action.color}`}
            >
              <action.icon className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium text-foreground">{action.label}</span>
              <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </motion.div>

        {/* Test History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Recent Tests
            </h2>
            <span className="text-xs text-muted-foreground">{testHistory.length} total</span>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-12 text-center">
              <Activity className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No tests yet</h3>
              <p className="text-sm text-muted-foreground mb-6">Run your first test to see results here.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/domain-test" className="gradient-primary text-primary-foreground font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Test a Domain
                </Link>
                <Link to="/api-test" className="glass text-foreground font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:neon-glow transition-shadow">
                  <Send className="h-4 w-4" /> Test an API
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {testHistory.slice(0, 20).map((test) => {
                const TypeIcon = typeIcons[test.type];
                const StatusIcon = statusIcons[test.status];
                return (
                  <div key={test.id} className="flex items-center gap-3 px-6 py-4 hover:bg-secondary/30 transition-colors">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[test.type]}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{test.target}</p>
                      <p className="text-xs text-muted-foreground truncate">{test.summary}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {new Date(test.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <StatusIcon className={`h-4 w-4 ${statusColors[test.status]}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DevDashboard;
