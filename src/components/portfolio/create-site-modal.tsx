"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

interface CreateSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SiteFormData) => void;
}

export interface SiteFormData {
  siteName: string;
  sector: string;
  tier: string;
  contractValue: string;
  siteManager: string;
  address: string;
  guardsRequired: string;
  primaryContactName: string;
  primaryContactPhone: string;
}

const sectors = ["Finance", "Retail", "Healthcare", "Commercial", "Residential", "Industrial"];
const tiers = ["Enterprise", "Commercial", "Residential"];
const siteManagers = ["James Moyo", "Sarah Ndlovu", "Michael van der Berg", "Thabo Khumalo", "Lisa Pietersen"];

export function CreateSiteModal({ isOpen, onClose, onSubmit }: CreateSiteModalProps) {
  const [formData, setFormData] = useState<SiteFormData>({
    siteName: "",
    sector: "",
    tier: "",
    contractValue: "",
    siteManager: "",
    address: "",
    guardsRequired: "",
    primaryContactName: "",
    primaryContactPhone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SiteFormData, string>>>({});

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
    const newErrors: Partial<Record<keyof SiteFormData, string>> = {};

    if (!formData.siteName.trim()) newErrors.siteName = "Site name is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.tier) newErrors.tier = "Client tier is required";
    if (!formData.contractValue.trim()) newErrors.contractValue = "Contract value is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.primaryContactPhone && !/^[\d\s\+\-()]+$/.test(formData.primaryContactPhone)) {
      newErrors.primaryContactPhone = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        siteName: "",
        sector: "",
        tier: "",
        contractValue: "",
        siteManager: "",
        address: "",
        guardsRequired: "",
        primaryContactName: "",
        primaryContactPhone: "",
      });
      onClose();
    }
  };

  const handleChange = (field: keyof SiteFormData, value: string) => {
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
              <h2 className="text-lg font-semibold text-portfolio-text">Add New Site</h2>
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
                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Site Name *
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.siteName ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="e.g., Metro Bank HQ"
                  />
                  {errors.siteName && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.siteName}</p>
                  )}
                </div>

                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Sector *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => handleChange("sector", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.sector ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent bg-white`}
                  >
                    <option value="">Select sector</option>
                    {sectors.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.sector}</p>
                  )}
                </div>

                {/* Tier */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Client Tier *
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

                {/* Site Manager */}
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Site Manager
                  </label>
                  <select
                    value={formData.siteManager}
                    onChange={(e) => handleChange("siteManager", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-base border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent bg-white"
                  >
                    <option value="">Select manager</option>
                    {siteManagers.map((mgr) => (
                      <option key={mgr} value={mgr}>
                        {mgr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contract Value */}
              <div>
                <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                  Monthly Contract Value *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-portfolio-text-muted font-medium text-base">R</span>
                  </div>
                  <input
                    type="text"
                    value={formData.contractValue}
                    onChange={(e) => handleChange("contractValue", e.target.value)}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-base ${
                      errors.contractValue ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="e.g., 85,000"
                  />
                </div>
                {errors.contractValue && (
                  <p className="mt-1 text-sm text-portfolio-risk">{errors.contractValue}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                  Site Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="w-4 h-4 text-portfolio-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-base ${
                      errors.address ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="123 Main Street, Sandton, Johannesburg"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-portfolio-risk">{errors.address}</p>
                )}
              </div>

              {/* Guards Required */}
              <div>
                <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                  Guards Required
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.guardsRequired}
                  onChange={(e) => handleChange("guardsRequired", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-base border-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
                  placeholder="e.g., 8"
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
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-portfolio-text mb-1.5">
                    Primary Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.primaryContactPhone}
                    onChange={(e) => handleChange("primaryContactPhone", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-base ${
                      errors.primaryContactPhone ? "border-portfolio-risk" : "border-portfolio-border"
                    } focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent`}
                    placeholder="+27 11 123 4567"
                  />
                  {errors.primaryContactPhone && (
                    <p className="mt-1 text-sm text-portfolio-risk">{errors.primaryContactPhone}</p>
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
                  Add Site
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Backward compatibility
export { CreateSiteModal as CreateAccountModal };
export type { SiteFormData as AccountFormData };
