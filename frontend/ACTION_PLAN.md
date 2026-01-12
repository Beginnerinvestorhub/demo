# 🛠️ Frontend Standardization Action Plan

## **📋 Objective**
Consolidate the frontend codebase into a single, unified design system (**mechanica**) and remove the conflicting/legacy **Ordinatus** implementation. This will eliminate technical debt, ensure visual consistency, and simplify future development.

---

## **Phase 1: Design System Consolidation (High Priority)**

### **1.1 CSS Unification**
- [ ] **Audit `styles/mechanica-design-system.css`**: Ensure it contains all necessary styles (animations, gradients, utility classes) currently found in `Ordinatus-design-system.css`.
- [ ] **Verify Tailwind Config**: Ensure `tailwind.config.js` prioritizes `mechanica-*` tokens and eventually removes `Ordinatus-*` aliases once migration is complete.
- [ ] **Delete Legacy CSS**: Remove `frontend/styles/Ordinatus-design-system.css`.

### **1.2 Component Standardization**
- [ ] **Audit Component Parity**: Ensure `mechanicaButton`, `mechanicaCard`, `mechanicaInput`, and `mechanicaGear` handle all props and variants that `Ordinatus` equivalents did.
- [ ] **Layout Components**:
    - [ ] Ensure `mechanicaLayout` and `mechanicaHeader` are fully functional.
    - [ ] Deprecate/Remove `OrdinatusLayout` and `OrdinatusHeader`.

---

## **Phase 2: Page & Component Refactoring**

### **2.1 Update Core Pages**
Replace all imports of `Ordinatus*` components with `mechanica*` components in the following files:
- [ ] `pages/dashboard.tsx`
- [ ] `pages/admin.tsx`
- [ ] `pages/tools.tsx`
- [ ] `pages/risk-assessment.tsx`
- [ ] `pages/portfolio-monitor.tsx`
- [ ] `pages/esg-screener.tsx`
- [ ] `pages/fractional-share-calculator.tsx`
- [ ] `pages/profile.tsx` & `pages/profileForm.tsx` (Consolidate these two if they are duplicates).
- [ ] `pages/contact.tsx`
- [ ] `pages/faq.tsx`
- [ ] `pages/login.tsx` & `pages/signup.tsx`

**Example Refactor:**
```typescript
// BEFORE
import { OrdinatusLayout } from '../components/layout/OrdinatusLayout';
import { OrdinatusCard } from '../components/ui/OrdinatusCard';

// AFTER
import { mechanicaLayout } from '../components/layout/mechanicaLayout';
import { mechanicaCard } from '../components/ui/mechanicaCard';
```

### **2.2 Refactor Feature Components**
Update internal components to use the mechanica system:
- [ ] `components/PortfolioMonitor.tsx`
- [ ] `components/RiskAssessmentForm.tsx`
- [ ] `components/FractionalShareCalculator.tsx`
- [ ] `components/ESGScreener.tsx`

---

## **Phase 3: API & Logic Cleanup**

### **3.1 Hooks Integration**
- [ ] **Refactor `AdminPanel.tsx`**: Replace direct `axios` usage with `useApiGet` / `useApiPost` hooks for consistent error handling and loading states.
- [ ] **Refactor `ProfileForm.tsx`**: Ensure it uses `useApi` hooks.

### **3.2 Type Safety**
- [ ] **Strict Typing**: Ensure all new mechanica components export their Prop interfaces.
- [ ] **Remove Legacy Types**: Remove any types specific only to the Ordinatus system if they are no longer used.

---

## **Phase 4: Final Cleanup & Verification**

### **4.1 File Removal**
Once all pages are refactored and verified:
- [ ] Delete `components/ui/Ordinatus*.tsx`
- [ ] Delete `components/layout/Ordinatus*.tsx`
- [ ] Delete `IMPLEMENTATION_COMPLETE.md` (Legacy documentation).

### **4.2 Testing**
- [ ] **Visual Check**: Run `npm run dev` and verify Homepage, Dashboard, and Tools pages look consistent (Mechanical/Wood/Brass aesthetic).
- [ ] **Unit Tests**: Run `npm test` to ensure no imports are broken.
- [ ] **Build Check**: Run `npm run build` to confirm the project compiles without errors.

---

## **🏁 Definition of Done**
1. No files reference `Ordinatus*` components.
2. The application builds successfully.
3. The UI is visually consistent using the mechanica aesthetic (Moonlight Blue, Wood, Brass).
4. `UPDATE_GUIDE.md` is the sole design documentation source.
