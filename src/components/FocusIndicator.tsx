import React from 'react';
import { Text } from 'ink';

export interface FocusIndicatorProps {
  isFocused: boolean;
}

/**
 * Displays a visual indicator for the currently focused field.
 */
export const FocusIndicator: React.FC<FocusIndicatorProps> = ({ isFocused }) => {
  return (
    <Text color={isFocused ? 'cyan' : 'white'}>
      {isFocused ? '❯ ' : '  '}
    </Text>
  );
};
