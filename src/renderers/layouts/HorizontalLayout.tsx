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
 * Renderer for horizontal layouts (arranges elements side by side).
 * Note: Terminal width limitations may cause wrapping.
 */
const InkHorizontalLayout: React.FC<LayoutProps> = ({
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
    <Box gap={2}>
      {elements
        .filter((element: UISchemaElement) => isVisible(element, schema, undefined as any, undefined as any))
        .map((element: UISchemaElement, index: number) => (
          <Box key={index} flexGrow={1}>
            <JsonFormsDispatch
              uischema={element}
              schema={schema}
              path={path}
              enabled={enabled}
              renderers={renderers}
              cells={cells}
            />
          </Box>
        ))}
    </Box>
  );
};

export const inkHorizontalLayoutTester = rankWith(2, uiTypeIs('HorizontalLayout'));

export default withJsonFormsLayoutProps(InkHorizontalLayout);
