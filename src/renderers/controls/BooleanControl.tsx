import React from 'react';
import { ControlProps, rankWith, isBooleanControl } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Text, useInput } from 'ink';
import { FormField } from '../../components';
import { useInkControl } from '../../hooks';

/**
 * Renderer for boolean inputs with Y/N toggle.
 */
const InkBooleanControl: React.FC<ControlProps> = (props) => {
  const { value, onChange, isFocused, label, errors, visible, enabled, required } =
    useInkControl<boolean>(props);

  useInput(
    (input: string) => {
      if (!enabled) return;

      const lower = input.toLowerCase();
      if (lower === 'y' || lower === 't') {
        onChange(true);
      } else if (lower === 'n' || lower === 'f') {
        onChange(false);
      } else if (input === ' ') {
        onChange(!value);
      }
    },
    { isActive: isFocused && enabled }
  );

  if (!visible) {
    return null;
  }

  const displayValue = value ? 'Yes' : 'No';
  const color = value ? 'green' : 'red';

  return (
    <FormField
      label={label}
      required={required}
      errors={errors}
      isFocused={isFocused}
    >
      <Box>
        <Text color={color} bold>
          {displayValue}
        </Text>
        {enabled && isFocused && (
          <Text dimColor> (Y/N or Space to toggle)</Text>
        )}
      </Box>
    </FormField>
  );
};

export const inkBooleanControlTester = rankWith(2, isBooleanControl);

export default withJsonFormsControlProps(InkBooleanControl);
