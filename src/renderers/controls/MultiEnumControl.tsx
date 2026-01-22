import React, { useState, useMemo } from 'react';
import { ControlProps, rankWith, and, schemaMatches, isEnumControl } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Text } from 'ink';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

// Safe useInput hook that handles test environments
function useSafeInput(handler: any, options?: any) {
  try {
    // Dynamically import useInput to avoid issues in test environments
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useInput } = require('ink');
    return useInput(handler, options);
  } catch (error) {
    // In test environments, input handling may not work
    return null;
  }
}

interface MultiSelectItem {
  label: string;
  value: any;
  selected: boolean;
}

/**
 * Renderer for multi-select enum arrays with checkbox-style selection.
 */
const InkMultiEnumControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required, schema } =
    useInkControl<any[]>(props);

  const [cursor, setCursor] = useState(0);

  const items = useMemo<MultiSelectItem[]>(() => {
    const enumValues = (schema.items as any)?.enum || [];
    const enumLabels = (schema.items as any)?.enumLabels || enumValues;
    const selectedValues = value || [];

    return enumValues.map((val: any, index: number) => ({
      label: enumLabels[index] || String(val),
      value: val,
      selected: selectedValues.includes(val),
    }));
  }, [schema, value]);

  useSafeInput(
    (input: string, key: any) => {
      if (!enabled) return;

      if (key.upArrow && cursor > 0) {
        setCursor(cursor - 1);
      } else if (key.downArrow && cursor < items.length - 1) {
        setCursor(cursor + 1);
      } else if (input === ' ') {
        // Toggle current item
        const item = items[cursor];
        const newValue = item.selected
          ? (value || []).filter((v: any) => v !== item.value)
          : [...(value || []), item.value];
        onChange(newValue);
      } else if (input === 'a') {
        // Toggle all
        const allSelected = items.every(item => item.selected);
        const newValue = allSelected ? [] : items.map(item => item.value);
        onChange(newValue);
      }
    },
    { isActive: isFocused && enabled }
  );

  if (!visible) {
    return null;
  }

  return (
    <FormField
      label={label}
      required={required}
      errors={errors}
      isFocused={isFocused}
    >
      {enabled ? (
        <Box flexDirection="column">
          <Text dimColor>↑↓ navigate | Space toggle | a toggle all</Text>
          {items.map((item, index) => (
            <Box key={index}>
              <Text color={index === cursor ? 'cyan' : 'white'}>
                {index === cursor ? '❯ ' : '  '}
                [{item.selected ? 'x' : ' '}] {item.label}
              </Text>
            </Box>
          ))}
        </Box>
      ) : (
        <Text>{(value || []).join(', ')}</Text>
      )}
    </FormField>
  );
};

export const inkMultiEnumControlTester = rankWith(
  5,
  and(
    schemaMatches(schema => schema.type === 'array' && schema.uniqueItems === true),
    schemaMatches(schema => (schema.items as any)?.enum !== undefined)
  )
);

export default withJsonFormsControlProps(InkMultiEnumControl);
