# Code Splitting Implementation Guide

## What is Code Splitting?

Code splitting is a technique that allows you to split your JavaScript bundle into smaller chunks that can be loaded on demand. This reduces the initial bundle size and improves your app's loading performance.

## Step-by-Step Implementation

### 1. **Identify Heavy Components**
Look for components that:
- Are large and complex
- Have many dependencies
- Are not immediately needed on page load
- Are used conditionally (like modals, different user views)

In our app, we identified:
- `PatientDashboard` and `CaretakerDashboard` (heavy, conditional)
- `Authentication` (separate route)
- `MedicationForm` (modal, not always visible)
- `AdherenceStats` (complex calculations)
- `NotificationSettings` (tab content)

### 2. **Create Lazy Components**
Use React's `lazy()` function to create lazy-loaded versions:

```tsx
// src/components/LazyComponents.tsx
import { lazy } from 'react';

export const LazyPatientDashboard = lazy(() => import('./PatientDashboard'));
export const LazyCaretakerDashboard = lazy(() => import('./CaretakerDashboard'));
```

### 3. **Add Suspense Boundaries**
Wrap lazy components with `Suspense` and provide fallbacks:

```tsx
<Suspense fallback={<LoadingSpinner text="Loading dashboard..." />}>
  <LazyPatientDashboard />
</Suspense>
```

### 4. **Create Loading Components**
Build reusable loading states:

```tsx
// src/components/LoadingSpinner.tsx
const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader2 className="animate-spin" />
    <p>{text}</p>
  </div>
);
```

### 5. **Add Error Boundaries**
Handle loading errors gracefully:

```tsx
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends Component {
  // Error handling logic
}
```

### 6. **Update Your Routes**
Apply lazy loading to route components:

```tsx
<Route 
  path="/auth" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <LazyAuthentication />
    </Suspense>
  } 
/>
```

## Benefits You'll See

### 1. **Smaller Initial Bundle**
- Before: ~500KB initial bundle
- After: ~200KB initial bundle
- Remaining code loads as needed

### 2. **Faster First Paint**
- Reduced time to interactive
- Better Core Web Vitals scores
- Improved user experience

### 3. **Better Caching**
- Unchanged components stay cached
- Only modified chunks need re-downloading
- More efficient updates

## Best Practices

### 1. **Strategic Splitting**
```tsx
// ✅ Good - Split at route level
const LazyDashboard = lazy(() => import('./Dashboard'));

// ✅ Good - Split heavy modals
const LazyMedicationForm = lazy(() => import('./MedicationForm'));

// ❌ Avoid - Too granular
const LazyButton = lazy(() => import('./Button'));
```

### 2. **Meaningful Loading States**
```tsx
// ✅ Good - Specific loading messages
<Suspense fallback={<LoadingSpinner text="Loading dashboard..." />}>

// ❌ Generic - Less helpful
<Suspense fallback={<div>Loading...</div>}>
```

### 3. **Error Boundaries**
```tsx
// ✅ Always wrap lazy components
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 4. **Preloading Critical Routes**
```tsx
// Preload important routes on hover/focus
const handleMouseEnter = () => {
  import('./Dashboard'); // Starts loading before click
};
```

## Testing Your Implementation

### 1. **Bundle Analysis**
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze your bundle
npm run build
npx webpack-bundle-analyzer dist/static/js/*.js
```

### 2. **Network Tab Testing**
1. Open DevTools → Network tab
2. Navigate through your app
3. Verify chunks load on demand
4. Check for unnecessary re-downloads

### 3. **Performance Metrics**
- Lighthouse scores
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

## Common Pitfalls to Avoid

### 1. **Over-splitting**
Don't split every component - focus on meaningful chunks (>30KB)

### 2. **Missing Error Boundaries**
Always handle loading failures gracefully

### 3. **Poor Loading States**
Provide meaningful feedback during loading

### 4. **Blocking Critical Path**
Don't lazy load components needed immediately

## Advanced Techniques

### 1. **Route-based Splitting**
```tsx
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./Dashboard'))
  }
];
```

### 2. **Component-based Splitting**
```tsx
const HeavyChart = lazy(() => import('./HeavyChart'));

// Only load when needed
{showChart && (
  <Suspense fallback={<ChartSkeleton />}>
    <HeavyChart data={data} />
  </Suspense>
)}
```

### 3. **Library Splitting**
```tsx
// Split heavy libraries
const HeavyLibComponent = lazy(() => 
  import('./HeavyLibComponent').then(module => ({
    default: module.HeavyLibComponent
  }))
);
```

## Monitoring and Optimization

### 1. **Bundle Size Monitoring**
- Set up CI checks for bundle size
- Monitor chunk sizes over time
- Alert on significant increases

### 2. **Performance Monitoring**
- Track loading times
- Monitor error rates
- User experience metrics

### 3. **Continuous Optimization**
- Regular bundle analysis
- Identify new splitting opportunities
- Remove unused code

## Next Steps

1. **Implement the basic setup** shown in this guide
2. **Test thoroughly** across different network conditions
3. **Monitor performance** improvements
4. **Iterate and optimize** based on real usage data
5. **Consider advanced patterns** like prefetching and preloading

Remember: Code splitting is about finding the right balance between bundle size and user experience. Start with obvious wins (routes, modals) and gradually optimize based on your app's usage patterns.