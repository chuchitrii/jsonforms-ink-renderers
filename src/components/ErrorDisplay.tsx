import React from 'react';
import { Box, Text } from 'ink';

export interface ErrorDisplayProps {
  errors?: string;
}

/**
 * Displays validation errors in red with a warning symbol.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  if (!errors) {
    return null;
  }

  return (
    <Box>
      <Text color="red">⚠ {errors}</Text>
    </Box>
  );
};
