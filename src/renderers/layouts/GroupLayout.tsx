import React from 'react';
import { Box, Text } from 'ink';
import {
  GroupLayout,
  LayoutProps,
  rankWith,
  uiTypeIs,
  isVisible,
  UISchemaElement,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { JsonFormsDispatch } from '@jsonforms/react';

/**
 * Renderer for group layouts (displays elements with a border and label).
 */
const InkGroupLayout: React.FC<LayoutProps> = ({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells,
}) => {
  if (!visible) {
    return null;
  }

  const group = uischema as GroupLayout;
  const elements = group.elements || [];
  const label = group.label;

  return (
    <Box flexDirection="column" gap={1} borderStyle="round" borderColor="gray" padding={1}>
      {label && (
        <Text bold underline>
          {label}
        </Text>
      )}
      <Box flexDirection="column" gap={1}>
        {elements
          .filter((element: UISchemaElement) => isVisible(element, schema, undefined as any, undefined as any))
          .map((element: UISchemaElement, index: number) => (
            <JsonFormsDispatch
              key={index}
              uischema={element}
              schema={schema}
              path={path}
              enabled={enabled}
              renderers={renderers}
              cells={cells}
            />
          ))}
      </Box>
    </Box>
  );
};

export const inkGroupLayoutTester = rankWith(2, uiTypeIs('Group'));

export default withJsonFormsLayoutProps(InkGroupLayout);
