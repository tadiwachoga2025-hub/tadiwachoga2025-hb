"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign } from "lucide-react";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountFormData) => void;
}

export interface AccountFormData {
  companyName: string;
  industry: string;
  tier: string;
  arr: string;
  csmOwner: string;
  website: string;
  primaryContactName: string;
  primaryContactEmail: string;
}

const industries = ["SaaS", "Tech", "Healthcare", "Finance", "Retail", "Manufacturing", "Other"];
const tiers = ["Enterprise", "Mid-market", "Startup"];
const csmOwners = ["Sarah Johnson", "Mike Chen", "Emily Davis", "James Wilson", "Lisa Park"];

export function CreateAccountModal({ isOpen, onClose, onSubmit }: CreateAccountModalProps) {
  const [formData, setFormData] = useState<AccountFormData>({
    companyName: "",
    industry: "",
    tier: "",
    arr: "",
    csmOwner: "",
    website: "",
    primaryContactName: "",
    primaryContactEmail: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AccountFormData, string>>>({});

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AccountFormData, string>> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.tier) newErrors.tier = "Tier is required";
    if (!formData.arr.trim()) newErrors.arr = "ARR is required";
    if (formData.primaryContactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail)) {
      newErrors.primaryContactEmail = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        companyName: "",
        industry: "",
        tier: "",
        arr: "",
        csmOwner: "",
        website: "",
        primaryContactName: "",
        primaryContactEmail: "",
      });
      onClose();
    }
  };

  const handleChange = (field: keyof AccountFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-2xl mx-4 bg-white rounded-portfolio shadow-portfolio-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-portfolio-border">
              <h2 className="text-lg font-semibold text-portfolio-text">Create New Account</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-portfolio-bg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-portfolio-text-muted" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.companyName ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.companyName}</p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.industry ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent bg-white`}
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.industry}</p>
                  )}
                </div>

                {/* Tier */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => handleChange("tier", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.tier ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent bg-white`}
                  >
                    <option value="">Select tier</option>
                    {tiers.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                  {errors.tier && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.tier}</p>
                  )}
                </div>

                {/* CSM Owner */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    CSM Owner
                  </label>
                  <select
                    value={formData.csmOwner}
                    onChange={(e) => handleChange("csmOwner", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-base border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent bg-white"
                  >
                    <option value="">Select CSM</option>
                    {csmOwners.map((csm) => (
                      <option key={csm} value={csm}>
                        {csm}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ARR - Full width */}
              <div>
                <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                  Annual Recurring Revenue (ARR) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="w-4 h-4 text-portfolio-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={formData.arr}
                    onChange={(e) => handleChange("arr", e.target.value)}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-base ${
                      errors.arr ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="e.g., 250,000"
                  />
                </div>
                {errors.arr && <p className="mt-1 text-sm text-portfolio-risk">{errors.arr}</p>}
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-base border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              {/* Primary Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Primary Contact Name
                  </label>
                  <input
                    type="text"
                    value={formData.primaryContactName}
                    onChange={(e) => handleChange("primaryContactName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-base border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Primary Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.primaryContactEmail}
                    onChange={(e) => handleChange("primaryContactEmail", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.primaryContactEmail ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                  {errors.primaryContactEmail && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.primaryContactEmail}</p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-portfolio-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-md text-portfolio-text-muted hover:bg-portfolio-bg transition-colors font-medium text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-portfolio-primary text-black hover:bg-portfolio-primary-dark transition-colors font-medium text-base"
                >
                  Create Account
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
