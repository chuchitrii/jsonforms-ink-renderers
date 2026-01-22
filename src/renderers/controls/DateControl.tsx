import React from 'react';
import { ControlProps, rankWith, isStringControl, formatIs, and } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import TextInput from 'ink-text-input';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

/**
 * Renderer for date format strings (YYYY-MM-DD).
 */
const InkDateControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required } =
    useInkControl<string>(props);

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
        <TextInput
          value={value || ''}
          onChange={onChange}
          focus={isFocused}
          placeholder="YYYY-MM-DD"
        />
      ) : (
        <span>{value || ''}</span>
      )}
    </FormField>
  );
};

export const inkDateControlTester = rankWith(
  3,
  and(isStringControl, formatIs('date'))
);

export default withJsonFormsControlProps(InkDateControl);
