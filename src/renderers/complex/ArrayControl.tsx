import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import {
  ArrayLayoutProps,
  rankWith,
  isObjectArrayControl,
  composePaths,
  createDefaultValue,
} from '@jsonforms/core';
import { withJsonFormsArrayLayoutProps } from '@jsonforms/react';
import { JsonFormsDispatch } from '@jsonforms/react';

/**
 * Renderer for arrays of objects with add/delete/navigate controls.
 */
const InkArrayControl: React.FC<ArrayLayoutProps> = ({
  data,
  path,
  schema,
  uischema,
  addItem,
  removeItems,
  renderers,
  cells,
  label,
  visible,
  enabled,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput(
    (input: string, key: any) => {
      if (!enabled) return;

      const itemCount = data?.length || 0;

      if (key.upArrow && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (key.downArrow && selectedIndex < itemCount - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (input === 'a') {
        // Add new item
        const defaultValue = createDefaultValue((schema as any).items || {});
        addItem?.(path, defaultValue)();
        setSelectedIndex(itemCount);
      } else if (input === 'd' && itemCount > 0) {
        // Delete current item
        removeItems?.(path, [selectedIndex])();
        if (selectedIndex >= itemCount - 1 && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
      }
    },
    { isActive: enabled }
  );

  if (!visible) {
    return null;
  }

  const itemCount = data?.length || 0;

  return (
    <Box flexDirection="column" gap={1}>
      <Box>
        <Text bold>
          {label || schema.title || 'Items'} ({itemCount} items)
        </Text>
      </Box>
      {enabled && (
        <Text dimColor>[a]dd item | [d]elete item | ↑↓ navigate</Text>
      )}
      {itemCount === 0 ? (
        <Text dimColor>No items. Press 'a' to add one.</Text>
      ) : (
        <Box flexDirection="column" gap={1}>
          {Array.from({ length: itemCount }).map((_, index) => {
            const childPath = composePaths(path, `${index}`);
            const isSelected = index === selectedIndex;

            return (
              <Box
                key={index}
                flexDirection="column"
                borderStyle="single"
                borderColor={isSelected ? 'cyan' : 'gray'}
                padding={1}
              >
                <Box marginBottom={1}>
                  <Text color={isSelected ? 'cyan' : 'white'}>
                    {isSelected ? '❯ ' : '  '}Item {index + 1}
                  </Text>
                </Box>
                <JsonFormsDispatch
                  schema={(schema as any).items || {}}
                  uischema={uischema}
                  path={childPath}
                  renderers={renderers}
                  cells={cells}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export const inkArrayControlTester = rankWith(3, isObjectArrayControl);

export default withJsonFormsArrayLayoutProps(InkArrayControl);
