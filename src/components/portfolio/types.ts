// Suburban Security Operations Dashboard Types

export interface Site {
  id: string;
  name: string;
  sector: "Finance" | "Retail" | "Healthcare" | "Commercial" | "Residential" | "Industrial";
  tier: "Enterprise" | "Commercial" | "Residential";
  contractValue: number; // Monthly contract value in ZAR
  complianceScore: number; // 0-100
  guardsAssigned: number;
  lastIncident: number; // days ago, -1 means no incidents
  isHighPriority: boolean;
  siteManager: string;
  address?: string;
  primaryContact?: {
    name: string;
    phone: string;
  };
}

export interface KPIData {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  sparklineData?: number[];
}

export interface IncidentDataPoint {
  month: string;
  predicted: number;
  actual: number;
  marginLow?: number;
  marginHigh?: number;
}

export interface SecurityEvent {
  id: string;
  siteName: string;
  siteLogo?: string;
  eventType: "patrol" | "incident" | "check-in" | "shift-change" | "alert" | "compliance";
  eventName: string;
  timestamp: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
}

export interface ClientTypeData {
  name: string;
  value: number;
  color: string;
}

export interface SectorData {
  name: string;
  revenue: number;
  percentage: number;
}

export interface ComplianceDistribution {
  fullyCompliant: number;
  minorIssues: number;
  needsAttention: number;
  critical: number;
}

// Legacy type aliases for backward compatibility
export type Account = Site;
export type ChurnDataPoint = IncidentDataPoint;
export type ActivityEvent = SecurityEvent;
export type TierData = ClientTypeData;
export type IndustryData = SectorData;
export type HealthDistribution = ComplianceDistribution;
