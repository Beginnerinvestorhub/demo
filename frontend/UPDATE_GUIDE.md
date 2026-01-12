# 🎨 mechanica Design System Implementation Guide

## **📋 OVERVIEW**

This guide serves as the **Single Source of Truth** for the frontend design system of BeginnerInvestorHub. We are standardizing on the **mechanica-inspired mechanical beauty** aesthetic, which combines professional financial credibility with engaging, precision-engineered visuals.

**Status:** 🔄 Migration in Progress (Ordinatus -> mechanica)
**Current Goal:** Consolidate all UI components to use the `mechanica` prefix and styling.

---

## **🎯 DESIGN PHILOSOPHY**

### **Core Principles**
1. **Mechanical Beauty**: Visible working components, gears, and engineering elements.
2. **Natural Wood Finishes**: Warm, authentic wood textures (Birch, Oak) to balance the technical feel.
3. **Artistic Engineering**: Functional components that look like precision instruments.
4. **Interactive Functionality**: Subtle animations (rotating gears, pistons) that respond to user interaction.
5. **Authentic Realism**: Gradients and shadows that mimic real materials (Brass, Copper, Steel).

### **Color Palette**
- **Primary**: Moonlight Drive Blue Metallic (#4F738E)
- **Accents**: 
  - **Brass**: #B8860B (Primary interactive elements)
  - **Copper**: #B87333 (Secondary accents)
  - **Steel**: #8B8D8E (Structural elements/backgrounds)
- **Surfaces**: 
  - **Wood**: #F5E6D3 (Panels, Cards)
  - **Paper/blueprint**: #F8F9FA

---

## **🔧 STANDARD COMPONENTS**

All development must use these standard components. Do not use raw HTML elements for UI primitives.

### **1. Layouts**
*   **`mechanicaLayout`**: The primary page wrapper. Includes the mechanical background, decorative corner gears, and the standard footer.
*   **`mechanicaHeader`**: The top navigation bar with the branding and login/user controls.

### **2. UI Primitives**
*   **`mechanicaButton`**:
    *   `variant="mechanical"` (Default): Moonlight blue with metallic sheen.
    *   `variant="wood"`: Natural wood finish for alternative actions.
    *   `variant="brass"`: High-visibility calls to action.
*   **`mechanicaCard`**:
    *   `variant="mechanical"` (Default): Clean metallic look with gear decorations.
    *   `variant="wood"`: Warm wood grain texture for educational content.
    *   `gearDecoration={true}`: Adds subtle animated gears to the corners.
*   **`mechanicaInput`**: Styled form inputs with focus states matching the metallic theme.
*   **`mechanicaGear`**: Decorative rotating gear element. Use sparingly to avoid performance costs.

---

## **🔄 MIGRATION GUIDE (Ordinatus to mechanica)**

We are deprecating the "Ordinatus" named components in favor of "mechanica".

| Legacy Component | Replacement Component | Notes |
| :--- | :--- | :--- |
| `OrdinatusLayout` | `mechanicaLayout` | Same props, updated visual style. |
| `OrdinatusHeader` | `mechanicaHeader` | Ensure links match. |
| `OrdinatusButton` | `mechanicaButton` | Map `primary` -> `mechanical`, `secondary` -> `wood`. |
| `OrdinatusCard` | `mechanicaCard` | Map `professional` -> `mechanical`. |
| `OrdinatusGear` | `mechanicaGear` | Direct replacement. |
| `OrdinatusInput` | `mechanicaInput` | Direct replacement. |

### **Refactoring Steps**
1.  **Import Change**: Update your imports to point to `../components/ui/mechanica[Component]`.
2.  **Prop Verification**: Check that `variant` names match the mechanica system (see "Standard Components" above).
3.  **Visual Check**: Verify the page still looks cohesive with the mechanical theme.

---

## **📂 FILE STRUCTURE**

```
frontend/
├── styles/
│   ├── globals.css             # Imports mechanica-design-system.css
│   └── mechanica-design-system.css # CORE STYLES (Do not edit Ordinatus-*.css)
├── components/
│   ├── ui/
│   │   ├── mechanicaButton.tsx
│   │   ├── mechanicaCard.tsx
│   │   ├── mechanicaInput.tsx
│   │   └── mechanicaGear.tsx
│   └── layout/
│       ├── mechanicaLayout.tsx
│       └── mechanicaHeader.tsx
└── pages/
    └── [YourPage].tsx          # Must use mechanica components
```

---

## **🚀 DEPLOYMENT CHECKLIST**

Before merging or deploying:
1.  [ ] No direct usage of `Ordinatus-design-system.css` classes in your component.
2.  [ ] All buttons and cards use `mechanica*` components.
3.  [ ] `npm run build` passes without TypeScript errors.
4.  [ ] Responsive design checked on mobile view (Gears should resize/hide appropriately).

---

## **🎨 EXAMPLE USAGE**

```tsx
import { mechanicaLayout } from '../components/layout/mechanicaLayout';
import { mechanicaCard } from '../components/ui/mechanicaCard';
import { mechanicaButton } from '../components/ui/mechanicaButton';

export default function ExamplePage() {
  return (
    <mechanicaLayout title="Example Page">
      <div className="container mx-auto py-12">
        <mechanicaCard variant="wood" animated>
          <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
          <p className="mb-6">Start your precision investment journey.</p>
          <mechanicaButton variant="brass">
            Get Started
          </mechanicaButton>
        </mechanicaCard>
      </div>
    </mechanicaLayout>
  );
}
```