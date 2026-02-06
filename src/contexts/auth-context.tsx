"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper for SSR-safe localStorage access
const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("suburban_user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Validate the parsed object has required fields
    if (parsed && typeof parsed.id === "string" && typeof parsed.email === "string") {
      return parsed as User;
    }
    console.warn("Invalid stored user data, clearing session");
    localStorage.removeItem("suburban_user");
    return null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem("suburban_user");
    return null;
  }
};

// Generate secure random ID
const generateSecureId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo credentials - in production, this would call a real API
    const validCredentials = [
      { email: "admin@suburban.com", password: "admin123", name: "John Admin", role: "Administrator" },
      { email: "demo@suburban.com", password: "demo123", name: "Demo User", role: "Manager" },
    ];

    const matchedUser = validCredentials.find(
      cred => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );

    if (matchedUser) {
      const userData: User = {
        id: generateSecureId(),
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
      };

      setUser(userData);
      localStorage.setItem("suburban_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic validation
    if (!name || name.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }

    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Check if user already exists (demo - check localStorage)
    const existingUsersRaw = localStorage.getItem("suburban_users");
    let existingUsers: User[] = [];

    if (existingUsersRaw) {
      try {
        existingUsers = JSON.parse(existingUsersRaw);
        if (existingUsers.some((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: "An account with this email already exists" };
        }
      } catch {
        // If parsing fails, start fresh
        existingUsers = [];
      }
    }

    // Create new user
    const userData: User = {
      id: generateSecureId(),
      email,
      name,
      role: "User",
    };

    // Store current user session
    setUser(userData);
    localStorage.setItem("suburban_user", JSON.stringify(userData));

    // Store in users list (without password - only user metadata for demo)
    existingUsers.push(userData);
    localStorage.setItem("suburban_users", JSON.stringify(existingUsers));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("suburban_user");
    router.push("/signin");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
