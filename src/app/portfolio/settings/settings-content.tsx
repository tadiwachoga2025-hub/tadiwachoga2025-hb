"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Bell, Shield, AlertTriangle, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ToggleSwitch } from "@/components/portfolio/toggle-switch";
import { SignOutCard } from "@/components/portfolio/sign-out-card";

interface NotificationSettings {
  incidentAlerts: boolean;
  shiftChangeNotifications: boolean;
  complianceWarnings: boolean;
  dailyOperationsSummary: boolean;
}

interface SecurityControls {
  mfaRequired: boolean;
  deviceVerification: boolean;
  geofenceAlerts: boolean;
  privilegedAccessReview: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function SettingsContent() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "ops@suburbansecurity.co.za");
  const [notifications, setNotifications] = useState<NotificationSettings>({
    incidentAlerts: true,
    shiftChangeNotifications: true,
    complianceWarnings: true,
    dailyOperationsSummary: false,
  });
  const [securityControls, setSecurityControls] = useState<SecurityControls>({
    mfaRequired: true,
    deviceVerification: true,
    geofenceAlerts: false,
    privilegedAccessReview: true,
  });
  const [sessionTimeout, setSessionTimeout] = useState("30m");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: keyof SecurityControls, value: boolean) => {
    setSecurityControls((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto"
    >
      {/* Page Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-portfolio-text">Settings</h1>
          <p className="text-sm text-portfolio-text-muted">
            Manage your profile and notification preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-portfolio-primary text-black text-sm font-medium hover:bg-portfolio-primary-dark transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </motion.div>

      {/* Success message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-4 p-3 rounded-lg bg-portfolio-growth-light text-portfolio-growth text-sm font-medium"
        >
          {saveMessage}
        </motion.div>
      )}

      {/* Profile Section */}
      <motion.div
        variants={item}
        className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-portfolio-bg">
            <User className="w-5 h-5 text-portfolio-primary" />
          </div>
          <h2 className="text-base font-semibold text-portfolio-text">Profile</h2>
        </div>

        <div className="space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-portfolio-text mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-portfolio-text mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {/* Role (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-portfolio-text mb-1.5">
              Role
            </label>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 text-sm rounded-lg bg-portfolio-bg text-portfolio-text-muted flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {user?.role || "Operations Manager"}
              </span>
              <span className="text-xs text-portfolio-text-muted">
                Contact admin to change role
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        variants={item}
        className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-portfolio-bg">
            <Bell className="w-5 h-5 text-portfolio-primary" />
          </div>
          <h2 className="text-base font-semibold text-portfolio-text">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-4">
          <ToggleSwitch
            checked={notifications.incidentAlerts}
            onChange={(value) => handleNotificationChange("incidentAlerts", value)}
            label="Incident Alerts"
            description="Get notified immediately when a new incident is reported"
          />

          <ToggleSwitch
            checked={notifications.shiftChangeNotifications}
            onChange={(value) => handleNotificationChange("shiftChangeNotifications", value)}
            label="Shift Change Notifications"
            description="Alerts when guard shifts change or handovers occur"
          />

          <ToggleSwitch
            checked={notifications.complianceWarnings}
            onChange={(value) => handleNotificationChange("complianceWarnings", value)}
            label="Compliance Warnings"
            description="Get notified when sites fall below compliance thresholds"
          />

          <ToggleSwitch
            checked={notifications.dailyOperationsSummary}
            onChange={(value) => handleNotificationChange("dailyOperationsSummary", value)}
            label="Daily Operations Summary"
            description="Receive a daily email digest of all security operations"
          />
        </div>

        {/* Alert Priority Note */}
        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Critical Alert Override</p>
              <p className="text-xs text-amber-700 mt-1">
                Critical security incidents will always trigger notifications regardless of your preferences.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Controls */}
      <motion.div
        variants={item}
        className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-portfolio-bg">
            <ShieldCheck className="w-5 h-5 text-portfolio-primary" />
          </div>
          <h2 className="text-base font-semibold text-portfolio-text">
            Security Controls
          </h2>
        </div>

        <div className="space-y-4">
          <ToggleSwitch
            checked={securityControls.mfaRequired}
            onChange={(value) => handleSecurityChange("mfaRequired", value)}
            label="Multi-Factor Authentication"
            description="Require MFA for admins and shift supervisors"
          />

          <ToggleSwitch
            checked={securityControls.deviceVerification}
            onChange={(value) => handleSecurityChange("deviceVerification", value)}
            label="Device Verification"
            description="New device logins require verification"
          />

          <ToggleSwitch
            checked={securityControls.geofenceAlerts}
            onChange={(value) => handleSecurityChange("geofenceAlerts", value)}
            label="Geo-fence Access Alerts"
            description="Alert when logins originate outside approved regions"
          />

          <ToggleSwitch
            checked={securityControls.privilegedAccessReview}
            onChange={(value) => handleSecurityChange("privilegedAccessReview", value)}
            label="Privileged Access Reviews"
            description="Quarterly access reviews for high-risk roles"
          />
        </div>
      </motion.div>

      {/* Access & Sessions */}
      <motion.div
        variants={item}
        className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-portfolio-bg">
            <Lock className="w-5 h-5 text-portfolio-primary" />
          </div>
          <h2 className="text-base font-semibold text-portfolio-text">
            Access & Sessions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-portfolio-text">Session Timeout</p>
              <p className="text-xs text-portfolio-text-muted">
                Automatically sign out inactive sessions.
              </p>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="rounded-lg border border-portfolio-border bg-portfolio-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-portfolio-primary"
            >
              <option value="15m">15 minutes</option>
              <option value="30m">30 minutes</option>
              <option value="60m">60 minutes</option>
              <option value="120m">2 hours</option>
            </select>
          </div>

          <div className="rounded-lg border border-portfolio-border p-4 bg-portfolio-bg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-portfolio-text">Current Session</p>
                <p className="text-xs text-portfolio-text-muted mt-1">
                  {user?.role || "Operations Manager"} • Johannesburg, ZA
                </p>
              </div>
              <span className="text-xs font-medium text-portfolio-growth">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sign out */}
      <motion.div variants={item}>
        <SignOutCard />
      </motion.div>
    </motion.div>
  );
}
