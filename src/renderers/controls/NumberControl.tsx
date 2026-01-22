import React from 'react';
import { ControlProps, rankWith, isNumberControl, isIntegerControl, or } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import TextInput from 'ink-text-input';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

/**
 * Renderer for number and integer inputs with validation.
 */
const InkNumberControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required, schema } =
    useInkControl<number>(props);

  if (!visible) {
    return null;
  }

  const handleChange = (val: string) => {
    // Allow empty string or valid number format during input
    if (val === '' || val === '-' || val === '.') {
      onChange(val as any);
      return;
    }

    const num = schema.type === 'integer' ? parseInt(val, 10) : parseFloat(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <FormField
      label={label}
      required={required}
      errors={errors}
      isFocused={isFocused}
    >
      {enabled ? (
        <TextInput
          value={value?.toString() || ''}
          onChange={handleChange}
          focus={isFocused}
        />
      ) : (
        <span>{value?.toString() || ''}</span>
      )}
    </FormField>
  );
};

export const inkNumberControlTester = rankWith(
  2,
  or(isNumberControl, isIntegerControl)
);

export default withJsonFormsControlProps(InkNumberControl);
