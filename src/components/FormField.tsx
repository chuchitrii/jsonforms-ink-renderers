import React from 'react';
import { Box, Text } from 'ink';
import { ErrorDisplay } from './ErrorDisplay';
import { FocusIndicator } from './FocusIndicator';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  errors?: string;
  isFocused?: boolean;
  children: React.ReactNode;
}

/**
 * Standard wrapper component for form fields with label, focus indicator,
 * and error display.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  errors,
  isFocused = false,
  children,
}) => {
  return (
    <Box flexDirection="column">
      <Box>
        <FocusIndicator isFocused={isFocused} />
        <Text color={isFocused ? 'cyan' : 'white'}>
          {label}
        </Text>
        {required && <Text color="red"> *</Text>}
      </Box>
      <Box paddingLeft={3}>
        {children}
      </Box>
      {errors && (
        <Box paddingLeft={3}>
          <ErrorDisplay errors={errors} />
        </Box>
      )}
    </Box>
  );
};
