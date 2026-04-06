import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TestResult {
  id: string;
  type: "domain" | "api" | "frontend" | "security";
  target: string;
  status: "success" | "warning" | "error";
  timestamp: string;
  duration: number;
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any;
}

export interface ActivityLog {
  id: string;
  level: "info" | "success" | "warning" | "critical";
  message: string;
  timestamp: string;
}

export interface NotificationPrefs {
  breachAlerts: boolean;
  weeklyReport: boolean;
  productUpdates: boolean;
  securityTips: boolean;
}

interface SettingsState {
  notifications: NotificationPrefs;
  setNotifications: (prefs: Partial<NotificationPrefs>) => void;
  plan: "free" | "pro";
  freeScansUsed: number;
  freeScanLimit: number;
  testHistory: TestResult[];
  activityLogs: ActivityLog[];
  addTestResult: (result: TestResult) => void;
  clearHistory: () => void;
  favorites: { type: string; value: string }[];
  addFavorite: (type: string, value: string) => void;
  removeFavorite: (type: string, value: string) => void;
  upgradePlan: () => void;
  hasFreeScanRemaining: () => boolean;
  getRemainingFreeScans: () => number;
}

const createLogFromResult = (result: TestResult): ActivityLog => {
  const statusToLevel: Record<TestResult["status"], ActivityLog["level"]> = {
    success: "success",
    warning: "warning",
    error: "critical",
  };

  return {
    id: result.id,
    level: statusToLevel[result.status],
    message: `${result.type.toUpperCase()} scan completed for ${result.target}`,
    timestamp: result.timestamp,
  };
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      notifications: {
        breachAlerts: true,
        weeklyReport: true,
        productUpdates: false,
        securityTips: true,
      },
      setNotifications: (prefs) =>
        set((state) => ({ notifications: { ...state.notifications, ...prefs } })),

      plan: "free",
      freeScansUsed: 0,
      freeScanLimit: 1,
      testHistory: [],
      activityLogs: [
        {
          id: "boot-1",
          level: "info",
          message: "Telemetry core initialized for edge security monitoring",
          timestamp: new Date().toISOString(),
        },
      ],
      addTestResult: (result) =>
        set((state) => ({
          testHistory: [result, ...state.testHistory].slice(0, 50),
          freeScansUsed:
            state.plan === "free"
              ? Math.min(state.freeScanLimit, state.freeScansUsed + 1)
              : state.freeScansUsed,
          activityLogs: [createLogFromResult(result), ...state.activityLogs].slice(0, 12),
        })),
      clearHistory: () => set({ testHistory: [], activityLogs: [] }),

      favorites: [],
      addFavorite: (type, value) =>
        set((state) => ({
          favorites: state.favorites.some((item) => item.type === type && item.value === value)
            ? state.favorites
            : [...state.favorites, { type, value }],
        })),
      removeFavorite: (type, value) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => !(item.type === type && item.value === value)),
        })),

      upgradePlan: () => {
        set((state) => ({
          plan: "pro",
          activityLogs: [
            {
              id: crypto.randomUUID(),
              level: "success",
              message: "PRO access granted. Unlimited scans unlocked.",
              timestamp: new Date().toISOString(),
            },
            ...state.activityLogs,
          ].slice(0, 12),
        }));
      },
      hasFreeScanRemaining: () => {
        const { plan, freeScansUsed, freeScanLimit } = get();
        return plan === "pro" || freeScansUsed < freeScanLimit;
      },
      getRemainingFreeScans: () => {
        const { plan, freeScansUsed, freeScanLimit } = get();
        return plan === "pro" ? Number.POSITIVE_INFINITY : Math.max(0, freeScanLimit - freeScansUsed);
      },
    }),
    {
      name: "shieldtest-settings",
      partialize: (state) => ({
        notifications: state.notifications,
        plan: state.plan,
        freeScansUsed: state.freeScansUsed,
        freeScanLimit: state.freeScanLimit,
        testHistory: state.testHistory,
        activityLogs: state.activityLogs,
        favorites: state.favorites,
      }),
    },
  ),
);
