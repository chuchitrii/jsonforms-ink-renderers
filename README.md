# JSONForms Ink Renderers

Terminal UI renderers for [JSONForms](https://jsonforms.io/) using [Ink](https://github.com/vadimdemedes/ink). Build beautiful, interactive command-line forms with automatic validation from JSON Schema.

## Features

- **Complete renderer set** for terminal UIs with ~15 specialized renderers
- **Automatic validation** via AJV integration from JSONForms core
- **Focus management** with Tab/Shift+Tab navigation
- **Debounced updates** for optimal terminal performance
- **Type-safe** TypeScript implementation
- **Extensible** - create custom renderers using provided hooks and components

## Installation

```bash
npm install @jsonforms/ink-renderers @jsonforms/core @jsonforms/react ink react
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { render } from 'ink';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '@jsonforms/ink-renderers';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    age: { type: 'integer', minimum: 0, title: 'Age' },
  },
  required: ['name', 'email'],
};

const App = () => {
  const [data, setData] = useState({});

  return (
    <JsonForms
      schema={schema}
      data={data}
      renderers={inkRenderers}
      onChange={({ data }) => setData(data)}
    />
  );
};

render(<App />);
```

## Supported Renderers

### Basic Controls

- **TextControl** - String input fields
- **NumberControl** - Integer and number input with validation
- **BooleanControl** - Y/N toggle with space bar
- **DateControl** - Date format (YYYY-MM-DD)

### Enum Controls

- **EnumControl** - Single selection from enum values (arrow keys + Enter)
- **MultiEnumControl** - Multiple selection with checkboxes (Space to toggle)

### Layouts

- **VerticalLayout** - Stack elements vertically (default)
- **HorizontalLayout** - Arrange elements side-by-side
- **GroupLayout** - Bordered section with label

### Complex Controls

- **ArrayControl** - Dynamic arrays with add/delete (press 'a' to add, 'd' to delete)
- **ObjectRenderer** - Nested object fields
- **OneOfControl** - Schema variant selection

## Keyboard Navigation

- **Tab** / **Shift+Tab** - Navigate between fields
- **Arrow Keys** - Navigate lists and select options
- **Space** - Toggle boolean fields or multi-select items
- **Enter** - Submit text input / select option
- **Y/N** - Quick boolean toggle
- **a** - Add array item
- **d** - Delete selected array item

## Examples

### Registration Form

```tsx
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      minLength: 3,
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 8,
    },
    role: {
      type: 'string',
      enum: ['admin', 'user', 'guest'],
      title: 'Role',
    },
    active: {
      type: 'boolean',
      title: 'Active',
    },
  },
  required: ['username', 'password'],
};
```

### Array of Objects

```tsx
const schema = {
  type: 'object',
  properties: {
    contacts: {
      type: 'array',
      title: 'Contacts',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
          phone: { type: 'string', title: 'Phone' },
        },
        required: ['name'],
      },
    },
  },
};
```

### Custom Layout with UI Schema

```tsx
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Personal Info',
      elements: [
        { type: 'Control', scope: '#/properties/name' },
        { type: 'Control', scope: '#/properties/email' },
      ],
    },
    {
      type: 'HorizontalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/age' },
        { type: 'Control', scope: '#/properties/birthDate' },
      ],
    },
  ],
};

<JsonForms
  schema={schema}
  uischema={uischema}
  data={data}
  renderers={inkRenderers}
  onChange={({ data }) => setData(data)}
/>
```

## Running the Demo

```bash
npm install
npm run demo
```

Or run the simple demo:

```bash
npm run demo:simple
```

## Building Custom Renderers

Use the provided hooks and components to create custom renderers:

```tsx
import { ControlProps, rankWith, isStringControl } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { useInkControl, FormField } from '@jsonforms/ink-renderers';
import TextInput from 'ink-text-input';

const CustomTextControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required } =
    useInkControl<string>(props);

  if (!visible) return null;

  return (
    <FormField
      label={label}
      required={required}
      errors={errors}
      isFocused={isFocused}
    >
      <TextInput
        value={value || ''}
        onChange={onChange}
        focus={isFocused}
      />
    </FormField>
  );
};

export const customTextControlTester = rankWith(10, isStringControl);
export default withJsonFormsControlProps(CustomTextControl);
```

## API

### Hooks

#### `useInkControl<T>(props: ControlProps)`

Combines JSONForms control props with Ink-specific features:

- Local state for responsive UI
- Debounced JSONForms updates (150ms)
- Focus state via `useFocus()`
- Returns: `{ value, onChange, isFocused, label, errors, visible, enabled, required, schema, path }`

#### `useDebounce<T>(callback: T, delay: number)`

Creates a debounced function with configurable delay.

### Components

#### `<FormField>`

Standard wrapper for form fields with label, focus indicator, and error display.

Props:
- `label: string` - Field label
- `required?: boolean` - Show required indicator
- `errors?: string` - Validation errors
- `isFocused?: boolean` - Focus state
- `children: ReactNode` - Input component

#### `<ErrorDisplay>`

Displays validation errors in red with warning symbol.

#### `<FocusIndicator>`

Visual indicator (❯) for focused field.

## Architecture

The renderer set follows JSONForms' pluggable architecture:

1. **Core** (`@jsonforms/core`) - Schema processing, validation, state management
2. **React bindings** (`@jsonforms/react`) - HOCs for renderer integration
3. **Ink renderers** (this package) - Terminal UI components

Each renderer exports:
- A **tester** function that returns a priority rank
- A **component** wrapped with the appropriate JSONForms HOC

Higher ranks take precedence. Built-in predicates (`isStringControl`, `isEnumControl`, etc.) make matching straightforward.

## Validation

Validation is automatic via AJV integration in JSONForms core:

```tsx
const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email', // AJV validates email format
    },
    age: {
      type: 'integer',
      minimum: 18,
      maximum: 100,
    },
  },
  required: ['email'],
};
```

Errors appear immediately below the field in red. Validation runs on every change.

## Performance

- **Debouncing**: JSONForms state updates are debounced (150ms) while local state updates immediately for responsive feel
- **Conditional rendering**: Hidden fields don't render at all
- **Efficient focus**: Only focused component receives input events

## Project Structure

```
@jsonforms/ink-renderers/
├── src/
│   ├── index.ts                    # Main exports
│   ├── renderers/
│   │   ├── controls/               # Basic field controls
│   │   ├── layouts/                # Layout renderers
│   │   └── complex/                # Arrays, objects, oneOf
│   ├── components/                 # Shared UI components
│   └── hooks/                      # Shared hooks
├── examples/
│   ├── demo.tsx                    # Comprehensive demo
│   └── simple-demo.tsx             # Basic example
└── dist/                           # Compiled output
```

## Contributing

Contributions welcome! Areas for improvement:

- Additional format-specific renderers (time, date-time, uri, etc.)
- Wizard mode for large forms
- Better error message formatting
- Performance optimizations for very large forms

## License

MIT

## Credits

Built with:
- [JSONForms](https://jsonforms.io/) - JSON Schema based forms
- [Ink](https://github.com/vadimdemedes/ink) - React for CLIs
- [AJV](https://ajv.js.org/) - JSON Schema validation
