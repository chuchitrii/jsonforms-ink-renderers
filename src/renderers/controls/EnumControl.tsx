import React, { useMemo } from 'react';
import { ControlProps, rankWith, isEnumControl, and, not, schemaMatches } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import SelectInput from 'ink-select-input';
import { Box } from 'ink';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

interface SelectItem {
  label: string;
  value: any;
}

/**
 * Renderer for enum selections (single select dropdown).
 */
const InkEnumControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required, schema } =
    useInkControl(props);

  const items = useMemo<SelectItem[]>(() => {
    const enumValues = schema.enum || [];
    const enumLabels = (schema as any).enumLabels || enumValues;

    return enumValues.map((val: any, index: number) => ({
      label: enumLabels[index] || String(val),
      value: val,
    }));
  }, [schema]);

  if (!visible) {
    return null;
  }

  const handleSelect = (item: SelectItem) => {
    onChange(item.value);
  };

  // Find the initially selected item
  const initialIndex = items.findIndex(item => item.value === value);

  return (
    <FormField
      label={label}
      required={required}
      errors={errors}
      isFocused={isFocused}
    >
      {enabled ? (
        <Box>
          <SelectInput
            items={items}
            initialIndex={initialIndex >= 0 ? initialIndex : 0}
            onSelect={handleSelect}
            isFocused={isFocused}
          />
        </Box>
      ) : (
        <span>{items.find(item => item.value === value)?.label || value}</span>
      )}
    </FormField>
  );
};

export const inkEnumControlTester = rankWith(
  3,
  and(
    isEnumControl,
    not(schemaMatches(schema => schema.type === 'array'))
  )
);

export default withJsonFormsControlProps(InkEnumControl);
