# Implementation Plan - Integrate Generative Art Animation

The goal is to replace the current static/Framer Motion lines in the `TrustedVisualization` component (or a similar section) with a high-performance Canvas-based generative art animation inspired by the provided reference, but with the dots removed.

## 1. Analysis & Refactoring
- The provided `generative-art.tsx` contains a minified Webpack bundle. I will extract the core logic for the oscillating lines.
- The "dots" are rendered via `drawDots`. These will be removed.
- The oscillation logic uses a custom physics/velocity system. I will port this to a clean React component.
- The component will be named `GenerativeArtLines`.

## 2. Component Structure
- **File**: `src/components/ui/generative-art.tsx`
- **Props**: 
    - `count`: Number of lines.
    - `color`: Line color (defaulting to the project's teal).
    - `height`: Max height of oscillation.

## 3. Implementation Steps

### Phase 1: Create UI Component
- [ ] Create `src/components/ui/generative-art.tsx` with a clean Canvas implementation.
- [ ] Extract the `getSceneXVel` or `getSceneXVelHigh` logic for the oscillating vertical lines.
- [ ] Implement a `useAnimationFrame` hook for smooth 60fps rendering.
- [ ] Ensure the component is responsive (properly handling canvas scaling).

### Phase 2: Refine Animation
- [ ] Remove all `arc` or `drawDots` calls.
- [ ] Focus on the `lineTo` and `stroke` logic for vertical segments.
- [ ] Match the visual style from the reference image (varying heights, smooth oscillation).

### Phase 3: Integration
- [ ] Update `src/components/trusted-visualization.tsx` to replace the `framer-motion` lines with the new `GenerativeArtLines` component.
- [ ] Ensure the background/overlay matches the current design aesthetics (soft fades).

## 4. Verification
- [ ] Run `npm run lint` and `tsc --noEmit`.
- [ ] Use `ux_audit.py` to ensure the motion feel is premium.
