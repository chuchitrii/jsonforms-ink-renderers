import React from 'react';
import { Box, Text } from 'ink';
import {
  ControlProps,
  rankWith,
  isObjectControl,
  composePaths,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonFormsDispatch } from '@jsonforms/react';

/**
 * Renderer for nested object controls.
 */
const InkObjectRenderer: React.FC<ControlProps> = ({
  schema,
  uischema,
  path,
  renderers,
  cells,
  label,
  visible,
  enabled,
}) => {
  if (!visible) {
    return null;
  }

  const properties = schema.properties || {};
  const propertyKeys = Object.keys(properties);

  return (
    <Box flexDirection="column" gap={1}>
      {label && (
        <Text bold underline>
          {label}
        </Text>
      )}
      <Box flexDirection="column" gap={1} paddingLeft={2}>
        {propertyKeys.map((propertyName) => {
          const propertySchema = properties[propertyName];
          const childPath = composePaths(path, propertyName);

          return (
            <JsonFormsDispatch
              key={propertyName}
              schema={propertySchema}
              uischema={uischema}
              path={childPath}
              enabled={enabled}
              renderers={renderers}
              cells={cells}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const inkObjectRendererTester = rankWith(2, isObjectControl);

export default withJsonFormsControlProps(InkObjectRenderer);
