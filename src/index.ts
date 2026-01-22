import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';

// Import all renderers and testers
import {
  InkTextControl,
  inkTextControlTester,
  InkNumberControl,
  inkNumberControlTester,
  InkBooleanControl,
  inkBooleanControlTester,
  InkDateControl,
  inkDateControlTester,
  InkEnumControl,
  inkEnumControlTester,
  InkMultiEnumControl,
  inkMultiEnumControlTester,
} from './renderers/controls';

import {
  InkVerticalLayout,
  inkVerticalLayoutTester,
  InkHorizontalLayout,
  inkHorizontalLayoutTester,
  InkGroupLayout,
  inkGroupLayoutTester,
} from './renderers/layouts';

import {
  InkArrayControl,
  inkArrayControlTester,
  InkObjectRenderer,
  inkObjectRendererTester,
  InkOneOfControl,
  inkOneOfControlTester,
} from './renderers/complex';

/**
 * Main renderer registry for JSONForms Ink renderers.
 * Import this array and pass it to JsonForms via the renderers prop.
 */
export const inkRenderers: JsonFormsRendererRegistryEntry[] = [
  // Basic controls
  { tester: inkTextControlTester, renderer: InkTextControl },
  { tester: inkNumberControlTester, renderer: InkNumberControl },
  { tester: inkBooleanControlTester, renderer: InkBooleanControl },
  { tester: inkDateControlTester, renderer: InkDateControl },

  // Enum controls
  { tester: inkEnumControlTester, renderer: InkEnumControl },
  { tester: inkMultiEnumControlTester, renderer: InkMultiEnumControl },

  // Layouts
  { tester: inkVerticalLayoutTester, renderer: InkVerticalLayout },
  { tester: inkHorizontalLayoutTester, renderer: InkHorizontalLayout },
  { tester: inkGroupLayoutTester, renderer: InkGroupLayout },

  // Complex controls
  { tester: inkArrayControlTester, renderer: InkArrayControl },
  { tester: inkObjectRendererTester, renderer: InkObjectRenderer },
  { tester: inkOneOfControlTester, renderer: InkOneOfControl },
];

// Re-export components and hooks for custom renderer development
export * from './components';
export * from './hooks';
export * from './renderers/controls';
export * from './renderers/layouts';
export * from './renderers/complex';
