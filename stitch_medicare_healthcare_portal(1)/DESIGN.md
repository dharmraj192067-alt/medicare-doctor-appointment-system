---
name: Clinical Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#444651'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#0060ac'
  on-secondary: '#ffffff'
  secondary-container: '#64a8fe'
  on-secondary-container: '#003c70'
  tertiary: '#282a2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e4042'
  on-tertiary-container: '#aaacae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#e1e2e4'
  tertiary-fixed-dim: '#c5c6c8'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system is engineered for high-trust healthcare environments, prioritizing clarity, accessibility, and a sense of calm reliability. The brand personality is professional yet empathetic, utilizing a "Clinical Modernism" style that blends corporate stability with contemporary digital patterns.

The visual language focuses on extreme legibility and a reduced cognitive load. It employs a refined Corporate Modern aesthetic characterized by:
- **Generous Whitespace:** Promoting a sense of hygiene and organizational clarity.
- **Soft Geometry:** Large radii to soften the institutional nature of medical data.
- **Depth through Layering:** Using subtle shadows and tonal shifts rather than heavy borders to define hierarchy.
- **Trust-Oriented Interactivity:** Intentional, high-contrast primary actions that guide patients and practitioners through complex workflows without friction.

## Colors

The palette is anchored in a deep, authoritative Navy (#1e3a8a) to convey institutional stability and professional expertise. This is balanced by an energetic Light Blue (#60a5fa) used for non-critical accents and active states.

- **Primary:** Reserved for global navigation elements, primary headings, and critical call-to-action buttons.
- **Secondary:** Used for visual interest, secondary icons, and highlighting important but non-urgent information.
- **Surface (Tertiary):** A soft gray (#f3f4f6) used for card backgrounds, section containers, and input fields to separate content from the white background.
- **Neutral:** A range of grays for supporting text and borders, ensuring high contrast ratios for accessibility compliance (WCAG AA/AAA).

## Typography

Inter is the sole typeface for this design system, chosen for its exceptional legibility in both large headings and small-scale UI labels. The system utilizes a systematic scale to manage information density.

- **Headlines:** Use tighter letter-spacing and bold weights in Primary Navy to establish immediate hierarchy.
- **Body Text:** Uses a slightly increased line-height (1.5 - 1.6) to ensure long-form medical content remains readable for users under stress or with visual impairments.
- **Labels:** Use semi-bold weights and subtle tracking for functional UI elements like navigation and small buttons.

## Layout & Spacing

The design system utilizes a fluid 12-column grid system for desktop and a single-column stack for mobile devices. 

- **Grid:** On desktop, use a 1280px max-width container with 24px gutters. 
- **Rhythm:** An 8px linear scale governs all padding and margin. Vertical spacing between sections should be generous (80px+) to maintain the "clean" healthcare aesthetic.
- **Adaptation:** On mobile, margins reduce to 16px. Cards and complex components should stack vertically, while navigation transitions to a full-screen drawer or bottom-bar depending on the app's complexity.

## Elevation & Depth

Hierarchy is established through "Ambient Shadows"—diffused, low-opacity shadows that suggest the UI elements are hovering just above the surface.

- **Level 0 (Base):** Pure white background or #f3f4f6 surfaces.
- **Level 1 (Cards):** Use a subtle shadow (e.g., `0 4px 20px rgba(0,0,0,0.04)`) to lift cards and containers.
- **Level 2 (Hover/Modals):** When hovering over interactive cards, the shadow should deepen and the element should translate slightly upwards (2-4px) to provide tactile feedback.
- **Overlays:** Modals and dropdowns use a more pronounced shadow with a background blur (backdrop-filter: blur(8px)) to focus the user’s attention on the task at hand.

## Shapes

The shape language is defined by large, friendly radii that move away from the "sharpness" of traditional software. 

- **Default Radius:** 0.5rem (8px) for small elements like buttons and inputs.
- **Large Radius (2xl):** 1.5rem (24px) for primary containers, cards, and image wrappers. This creates the signature "soft-modern" medical look.
- **Interactive States:** Maintain consistent rounding across all states to ensure the UI feels stable.

## Components

### Buttons
- **Primary:** Solid #1e3a8a background with white text. 1.5rem padding on sides.
- **Secondary:** Outlined with a 2px stroke of #1e3a8a or #60a5fa.
- **Ghost:** Minimalist buttons for utility actions, using Primary Navy text and no background.

### Cards
- White background, 24px padding, 24px border-radius.
- **Hover Effect:** Apply a subtle blue border-tint (#60a5fa at 20% opacity) and increased shadow depth.

### Navbar
- Fixed position, white background with a very thin bottom border (#f3f4f6).
- Use Primary Navy for navigation links, switching to Light Blue on hover.

### Inputs & Form Fields
- Soft gray (#f3f4f6) background with no border in resting state.
- Transition to a 2px Light Blue (#60a5fa) border on focus.

### Footer
- High-contrast Navy (#1e3a8a) background with white text.
- Organized into clear columns (e.g., Services, Legal, Emergency Contact) with a distinct "Back to Top" utility.

### Success/Error Feedback
- Use inline banners with 8px radius.
- **Success:** Soft green background with #059669 text.
- **Error:** Soft red background with #dc2626 text.