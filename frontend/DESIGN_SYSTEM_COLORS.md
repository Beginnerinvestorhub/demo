# Design System - Color Standards

**Version:** 1.0
**Last Updated:** February 11, 2026

---

## Color Philosophy

The BeginnerInvestorHub design system uses a mechanical/steampunk aesthetic with a consistent moonlight-blue theme. All colors should follow the standards below to maintain visual consistency across the application.

---

## Primary Colors

### Moonlight Blue Theme
- **Primary:** `text-mechanica-moonlight-blue` - Main headings and interactive elements
- **Light:** `from-mechanica-moonlight-blue-light` - Hero gradient highlights
- **Dark:** `to-mechanica-moonlight-blue-dark` - Hero gradient shadows

### Usage
- Page headings
- Navigation links (active state)
- Buttons and interactive elements
- Card borders (10% opacity)
- Focus rings (20% opacity)

---

## Accent Colors

### Yellow/Amber
- **Highlight:** `text-yellow-400` - Hero section highlights
- **Accent:** `text-yellow-500` - Bottom accent bars
- **Border:** `border-yellow-500` - Decorative borders

### Usage
- Hero section title highlights
- Bottom accent bars on hero sections
- Decorative borders
- Warning states

---

## Metallic Colors (Gears)

### Brass
- **Primary brass:** `color="brass"` - Main decorative gears
- **Polished brass:** `text-mechanica-polished-brass` - Text accents

### Steel
- **Primary steel:** `color="steel"` - Secondary decorative gears
- **Usage:** Mechanical accents, secondary elements

### Copper
- **Primary copper:** `color="copper"` - Tertiary decorative gears
- **Brushed copper:** `bg-mechanica-brushed-copper` - Progress bars

### Usage
- MechanicaGear component decorations
- Progress indicators
- Mechanical aesthetic elements

---

## Background Colors

### Standard Backgrounds
- **Primary:** `bg-gray-50` - Main page background
- **Hero Gradient:** `bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark` - Hero sections
- **Card Background:** `bg-gradient-to-br from-blue-50 to-white` - Tool page cards

### Footer Background
- **Footer:** `bg-gradient-to-br from-gray-900 to-gray-800` - Dark footer

### Usage Guidelines
- **ALWAYS use** `bg-gray-50` for main page backgrounds
- **NEVER use** `bg-slate-100`, `bg-gray-100` (inconsistent)
- Use hero gradient only for hero sections
- Use card background for tool page cards

---

## Text Colors

### Headings
- **Primary:** `text-mechanica-moonlight-blue` - Main headings
- **Hero:** `text-white` - Hero section headings
- **Highlight:** `text-yellow-400` - Hero highlights

### Body Text
- **Primary:** `text-gray-600` - Standard body text
- **Secondary:** `text-gray-500` - Labels and secondary text
- **Hero Description:** `text-white` - Hero section descriptions

### Usage
- **ALWAYS use** `text-white` for hero descriptions (NOT `text-blue-100`)
- **ALWAYS use** `text-mechanica-moonlight-blue` for headings
- **ALWAYS use** `text-gray-600` for body text
- **NEVER use** `text-amber-900`, `text-amber-800`, `text-blue-100`

---

## Border Colors

### Standard Borders
- **Primary:** `border-mechanica-moonlight-blue/10` - Standard borders
- **Focus:** `focus:ring-mechanica-moonlight-blue/20` - Focus rings
- **Hover:** `hover:border-mechanica-moonlight-blue/20` - Hover states

### Usage
- **ALWAYS use** `border-mechanica-moonlight-blue/10` for borders
- **ALWAYS use** `focus:ring-mechanica-moonlight-blue/20` for focus states
- **NEVER use** `border-amber-600/10`, `focus:ring-amber-600/10`

---

## Card Variants

### MechanicaCard Variants
- **mechanical** - Standard mechanical styling
- **wood** - Wood grain texture
- **brass** - Brass metal texture
- **default** - Basic card styling

### Usage
- Use `variant="mechanical"` for primary cards
- Use `variant="wood"` for form cards and content cards
- Use `variant="brass"` for special accent cards
- Use `variant="default"` for simple cards

---

## Color Tokens Reference

### Background Gradients
```css
/* Hero Section */
bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark

/* Card Background */
bg-gradient-to-br from-blue-50 to-white

/* Footer */
bg-gradient-to-br from-gray-900 to-gray-800
```

### Text Colors
```css
/* Headings */
text-mechanica-moonlight-blue

/* Body */
text-gray-600
text-gray-500

/* Hero */
text-white
text-yellow-400
```

### Border Colors
```css
/* Standard */
border-mechanica-moonlight-blue/10

/* Focus */
focus:ring-mechanica-moonlight-blue/20

/* Hover */
hover:border-mechanica-moonlight-blue/20
```

---

## Prohibited Colors

### Never Use These
- `text-amber-900` - Use `text-mechanica-moonlight-blue`
- `text-amber-800` - Use `text-gray-600` or `text-mechanica-moonlight-blue`
- `text-blue-100` - Use `text-white`
- `bg-slate-100` - Use `bg-gray-50`
- `bg-gray-100` - Use `bg-gray-50`
- `border-amber-600/10` - Use `border-mechanica-moonlight-blue/10`
- `focus:ring-amber-600/10` - Use `focus:ring-mechanica-moonlight-blue/20`
- `focus:border-amber-600` - Use `focus:border-mechanica-moonlight-blue`

---

## Component-Specific Guidelines

### Hero Sections
- Background: `from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark`
- Text: `text-white`
- Highlight: `text-yellow-400`
- Bottom accent: `from-transparent via-yellow-500 to-transparent opacity-50`

### Forms
- Input borders: `border-mechanica-moonlight-blue/10`
- Focus rings: `focus:ring-mechanica-moonlight-blue/20`
- Labels: `text-gray-500`
- Placeholder: `placeholder-gray-400`

### Cards
- Tool pages: `bg-gradient-to-br from-blue-50 to-white`
- Borders: `border-mechanica-moonlight-blue/10`
- Hover states: `hover:bg-mechanica-moonlight-blue/5`

### Navigation
- Active: `bg-mechanica-moonlight-blue text-white`
- Inactive: `text-gray-600 hover:text-mechanica-moonlight-blue`

---

## Testing Guidelines

### Color Contrast
- Ensure all text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Test with color blindness simulators
- Verify in both light and dark modes (if applicable)

### Consistency Checks
- Verify all pages use `bg-gray-50` for backgrounds
- Verify all hero descriptions use `text-white`
- Verify all borders use `border-mechanica-moonlight-blue/10`
- Verify all focus states use `focus:ring-mechanica-moonlight-blue/20`

---

## Migration Guide

### When Adding New Pages
1. Use `bg-gray-50` for main background
2. Use hero gradient for hero section
3. Use `text-white` for hero descriptions
4. Use `text-mechanica-moonlight-blue` for headings
5. Use `text-gray-600` for body text
6. Use `border-mechanica-moonlight-blue/10` for borders
7. Use `focus:ring-mechanica-moonlight-blue/20` for focus states

### When Modifying Existing Pages
1. Replace `bg-slate-100` with `bg-gray-50`
2. Replace `text-blue-100` with `text-white`
3. Replace `text-amber-*` with appropriate moonlight-blue colors
4. Replace `border-amber-*` with `border-mechanica-moonlight-blue/10`
5. Replace `focus:ring-amber-*` with `focus:ring-mechanica-moonlight-blue/20`

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)

---

**Document Maintained By:** Development Team
**Last Review:** February 11, 2026
