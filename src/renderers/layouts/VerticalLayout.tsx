import React from 'react';
import { Box } from 'ink';
import {
  LayoutProps,
  rankWith,
  uiTypeIs,
  isVisible,
  UISchemaElement,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { JsonFormsDispatch } from '@jsonforms/react';

/**
 * Renderer for vertical layouts (stacks elements vertically).
 */
const InkVerticalLayout: React.FC<LayoutProps> = ({
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

  const elements = (uischema as any).elements || [];

  return (
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
  );
};

export const inkVerticalLayoutTester = rankWith(2, uiTypeIs('VerticalLayout'));

export default withJsonFormsLayoutProps(InkVerticalLayout);
