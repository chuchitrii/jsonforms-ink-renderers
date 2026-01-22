import React from 'react';
import { ControlProps, rankWith, isStringControl, and, not, formatIs } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import TextInput from 'ink-text-input';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

/**
 * Renderer for basic string inputs (without enum or special format).
 */
const InkTextControl: React.FC<ControlProps> = (props) => {
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
        />
      ) : (
        <span>{value || ''}</span>
      )}
    </FormField>
  );
};

export const inkTextControlTester = rankWith(
  2,
  and(
    isStringControl,
    not(formatIs('date')),
    not(formatIs('time')),
    not(formatIs('date-time'))
  )
);

export default withJsonFormsControlProps(InkTextControl);
