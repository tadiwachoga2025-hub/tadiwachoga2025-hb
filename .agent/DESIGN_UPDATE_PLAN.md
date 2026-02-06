# Suburban Security - Auralink Design System Implementation Plan

## Overview
Update the Suburban Security app with premium Auralink design aesthetics while maintaining security-focused functionality.

## Phase 1: Design System Foundation ✓
- [x] Install @radix-ui/react-icons dependency
- [ ] Update globals.css with Auralink color palette and typography
- [ ] Update tailwind.config.ts with extended design tokens
- [ ] Verify font loading (Figtree + Geist Mono)

## Phase 2: Core Components Update
### Navigation
- [ ] Update Navbar with Auralink styling
  - Sticky behavior with backdrop blur on scroll
  - Animated underline hover effects
  - Pill-to-rounded button transitions
  - Mobile menu with AnimatePresence

### Footer
- [ ] Update Footer with Auralink design
  - Social icons with hover states
  - Premium link styling
  - Proper spacing and typography

### Reusable Components
- [ ] Update Badge component
- [ ] Update SectionHeader component
- [ ] Update FeatureCard component
- [ ] Update StatCard component

## Phase 3: Landing Page (page.tsx)
- [ ] Hero section with Auralink aesthetics
  - Premium gradient backgrounds
  - Animated labels with typing effect
  - Enhanced CTA buttons
- [ ] Stats section with animated bars visualization
- [ ] Features section with glassmorphic cards
- [ ] CTA section with premium styling

## Phase 4: Dashboard Pages
- [ ] Update dashboard layout
- [ ] Update dashboard cards and metrics
- [ ] Update data tables with premium styling
- [ ] Update status badges

## Phase 5: Auth Pages
- [ ] Update sign-in page
- [ ] Update sign-up page

## Phase 6: Additional Pages
- [ ] Update About page
- [ ] Update Contact page
- [ ] Update Solutions pages

## Design Tokens Reference

### Colors
- Primary: #156d95 (ocean blue/teal)
- Text: #202020 (headings), #404040 (body), #666666 (muted)
- Backgrounds: #ffffff, #fafafa, #e9e9e9
- Borders: #e5e5e5
- Status: #16b364 (green), #3b82f6 (blue), #155eef (blue-dark)

### Typography
- Primary: Figtree (400, 500, 600, 800)
- Monospace: Geist Mono (400, 500, 600)
- Hero: 56px/60px, weight 500
- Section titles: 40px, weight 400
- Body: 18px (text-lg)

### Animations
- Fade in: opacity 0→1, y 20→0, duration 0.6s
- Button hover: rounded-full → rounded-2xl, 150ms
- Typing effect: width 0→auto, blinking cursor
- Spring: stiffness 300, damping 30
