# Component Color Usage Guide

**Version:** 1.0
**Last Updated:** February 11, 2026

This guide documents how colors should be used in specific components across the application.

---

## Layout Components

### MechanicaLayout
**Purpose:** Main layout wrapper for all pages

**Color Usage:**
- Background: `bg-gray-50` (inherent)
- Navigation: `bg-white border-b border-gray-200`
- Footer: Uses MechanicaFooter component

**Example:**
```tsx
<MechanicaLayout>
  {/* Page content */}
</MechanicaLayout>
```

---

### MechanicaFooter
**Purpose:** Site-wide footer

**Color Usage:**
- Background: `bg-gradient-to-br from-gray-900 to-gray-800`
- Text: `text-white`
- Links: `text-gray-400 hover:text-white`
- Headings: `text-yellow-500`

**Example:**
```tsx
<MechanicaFooter />
```

---

## UI Components

### MechanicaCard
**Purpose:** Content container with mechanical styling

**Variants:**
- `mechanical` - Standard mechanical styling
- `wood` - Wood grain texture
- `brass` - Brass metal texture
- `default` - Basic card styling

**Color Usage by Variant:**

**mechanical:**
- Border: `border-mechanica-moonlight-blue/10`
- Background: `bg-white`
- Text: `text-gray-900`

**wood:**
- Border: `border-amber-600/10`
- Background: `bg-gradient-to-br from-amber-50 to-orange-50`
- Text: `text-amber-950`

**brass:**
- Border: `border-mechanica-polished-brass/20`
- Background: `bg-gradient-to-br from-amber-100 to-amber-200`
- Text: `text-amber-900`

**default:**
- Border: `border-gray-200`
- Background: `bg-white`
- Text: `text-gray-900`

**Example:**
```tsx
<MechanicaCard variant="mechanical">
  <div className="p-8">
    <h2 className="text-mechanica-moonlight-blue">Title</h2>
    <p className="text-gray-600">Content</p>
  </div>
</MechanicaCard>
```

---

### MechanicaButton
**Purpose:** Interactive buttons

**Variants:**
- `default` - Standard button
- `wood` - Wood texture button
- `mechanical` - Mechanical button

**Color Usage:**
- Background: `bg-mechanica-moonlight-blue`
- Text: `text-white`
- Hover: `hover:bg-mechanica-moonlight-blue-dark`
- Focus: `focus:ring-mechanica-moonlight-blue/20`

**Example:**
```tsx
<MechanicaButton variant="wood">
  Click Me
</MechanicaButton>
```

---

### MechanicaGear
**Purpose:** Decorative gear component

**Colors:**
- `brass` - Primary decorative gears
- `steel` - Secondary decorative gears
- `copper` - Tertiary decorative gears

**Speeds:**
- `slow` - 20s rotation
- `medium` - 10s rotation
- `fast` - 5s rotation
- `reverse` - 15s reverse rotation

**Example:**
```tsx
<MechanicaGear size="xl" color="brass" speed="slow" />
```

---

## Form Components

### MechanicaInput
**Purpose:** Text input fields

**Color Usage:**
- Border: `border-mechanica-moonlight-blue/10`
- Background: `bg-white`
- Text: `text-gray-900`
- Placeholder: `placeholder-gray-400`
- Focus: `focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue`

**Example:**
```tsx
<MechanicaInput
  placeholder="Enter text"
  className="w-full px-6 py-5 bg-white border-2 border-mechanica-moonlight-blue/10 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-black text-gray-900 placeholder-gray-400"
/>
```

---

### AuthForm
**Purpose:** Authentication form (login/signup)

**Color Usage:**
- Background: `bg-gradient-to-br from-gray-50 to-amber-50`
- Card: `MechanicaCard variant="wood"`
- Labels: `text-gray-500`
- Inputs: Standard MechanicaInput colors
- Buttons: `text-mechanica-moonlight-blue`

**Example:**
```tsx
<AuthForm type="login" />
```

---

## Page Components

### Hero Sections
**Purpose:** Page headers with mechanical styling

**Color Usage:**
- Background: `bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark`
- Text: `text-white`
- Highlight: `text-yellow-400`
- Bottom accent: `bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50`

**Example:**
```tsx
<section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white">
    Page <span className="text-yellow-400">Title</span>
  </h1>
  <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-light">
    Description text
  </p>
</section>
```

---

### Tool Page Cards
**Purpose:** Container for tool pages (risk-assessment, portfolio-monitor, etc.)

**Color Usage:**
- Background: `bg-gradient-to-br from-blue-50 to-white`
- Border: `border-mechanica-moonlight-blue/10`
- Heading: `text-mechanica-moonlight-blue`
- Body: `text-gray-600`

**Example:**
```tsx
<MechanicaCard variant="wood" animated className="bg-gradient-to-br from-blue-50 to-white mechanica-hum w-full max-w-5xl">
  <div className="p-8">
    <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
      Tool Title
    </h2>
    <p className="text-gray-600 mechanica-text-technical">
      Tool description
    </p>
  </div>
</MechanicaCard>
```

---

### Progress Bars
**Purpose:** Display progress indicators

**Color Usage:**
- Background: `bg-gray-200`
- Fill: `bg-mechanica-moonlight-blue`, `bg-mechanica-polished-brass`, `bg-mechanica-brushed-copper`

**Example:**
```tsx
<div className="w-full bg-gray-200 rounded-full h-3">
  <div
    className="bg-mechanica-moonlight-blue h-3 rounded-full transition-all duration-500 ease-out"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

### Status Badges
**Purpose:** Display status information

**Color Usage:**
- Success: `bg-emerald-950/5 text-emerald-900 border-emerald-600/20`
- Error: `bg-red-950/5 text-red-900 border-red-600/20`
- Info: `bg-mechanica-moonlight-blue/5 text-mechanica-moonlight-blue border-mechanica-moonlight-blue/20`

**Example:**
```tsx
<div className="p-6 bg-emerald-950/5 text-emerald-900 rounded-2xl border-2 border-emerald-600/20 flex items-center shadow-inner">
  <span className="text-2xl mr-4">✓</span>
  <span className="text-sm font-black uppercase tracking-tight">Success message</span>
</div>
```

---

### Navigation Links
**Purpose:** Site navigation

**Color Usage:**
- Active: `bg-mechanica-moonlight-blue text-white`
- Inactive: `text-gray-600 hover:text-mechanica-moonlight-blue`
- Hover: `hover:bg-mechanica-moonlight-blue/5`

**Example:**
```tsx
<Link
  href="/dashboard"
  className={`text-gray-600 hover:text-mechanica-moonlight-blue px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === '/dashboard' ? 'bg-mechanica-moonlight-blue text-white' : ''
  }`}
>
  Dashboard
</Link>
```

---

## Special Components

### MechanicaTicker
**Purpose:** Scrolling ticker for market data

**Color Usage:**
- Background: `bg-gray-900`
- Text: `text-white`
- Accent: `text-yellow-400`

**Example:**
```tsx
<MechanicaTicker />
```

---

### NudgeChatWidget
**Purpose:** Chat widget for user support

**Color Usage:**
- Background: `bg-white`
- Border: `border-mechanica-moonlight-blue/10`
- Button: `bg-mechanica-moonlight-blue text-white`

**Example:**
```tsx
<NudgeChatWidget />
```

---

## Color Usage Patterns

### Text Hierarchy
```
H1 (Hero): text-4xl md:text-5xl lg:text-6xl text-white
H2 (Section): text-2xl md:text-3xl text-mechanica-moonlight-blue
H3 (Card): text-xl text-mechanica-moonlight-blue
Body: text-gray-600
Secondary: text-gray-500
Label: text-gray-500
Placeholder: placeholder-gray-400
```

### Border Hierarchy
```
Primary: border-mechanica-moonlight-blue/10
Focus: focus:ring-mechanica-moonlight-blue/20
Hover: hover:border-mechanica-moonlight-blue/20
Divider: border-gray-200
```

### Background Hierarchy
```
Page: bg-gray-50
Hero: from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark
Card: bg-white or bg-gradient-to-br from-blue-50 to-white
Footer: from-gray-900 to-gray-800
```

---

## Testing Checklist

When creating or modifying components, verify:

- [ ] No prohibited colors used (amber, blue-100, slate-100, gray-100)
- [ ] Required colors present (moonlight-blue, gray-600, white)
- [ ] Hero sections use correct gradient
- [ ] Hero descriptions use text-white (not blue-100)
- [ ] Borders use moonlight-blue/10
- [ ] Focus rings use moonlight-blue/20
- [ ] Backgrounds use gray-50 (not slate-100 or gray-100)
- [ ] Text colors follow hierarchy
- [ ] Component variant colors match design system

---

## Migration Checklist

When migrating existing components:

1. Replace `text-amber-900` with `text-mechanica-moonlight-blue`
2. Replace `text-amber-800` with `text-gray-600` or `text-mechanica-moonlight-blue`
3. Replace `text-blue-100` with `text-white`
4. Replace `bg-slate-100` with `bg-gray-50`
5. Replace `bg-gray-100` with `bg-gray-50`
6. Replace `border-amber-600/10` with `border-mechanica-moonlight-blue/10`
7. Replace `focus:ring-amber-600/10` with `focus:ring-mechanica-moonlight-blue/20`
8. Replace `focus:border-amber-600` with `focus:border-mechanica-moonlight-blue`
9. Verify all colors match DESIGN_SYSTEM_COLORS.md

---

## Resources

- [Design System Colors](./DESIGN_SYSTEM_COLORS.md)
- [Color Consistency Tests](./__tests__/color-consistency.test.js)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Document Maintained By:** Development Team
**Last Review:** February 11, 2026
