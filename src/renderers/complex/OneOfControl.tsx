import React, { useState, useMemo } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import {
  ControlProps,
  rankWith,
  schemaMatches,
  JsonSchema,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { JsonFormsDispatch } from '@jsonforms/react';

interface OneOfOption {
  label: string;
  value: number;
  schema: JsonSchema;
}

/**
 * Renderer for oneOf schemas - allows selecting between multiple schema variants.
 */
const InkOneOfControl: React.FC<ControlProps> = ({
  schema,
  uischema,
  path,
  data,
  handleChange,
  renderers,
  cells,
  label,
  visible,
  enabled,
}) => {
  const options = useMemo<OneOfOption[]>(() => {
    const oneOfSchemas = (schema.oneOf || []) as JsonSchema[];
    return oneOfSchemas.map((subSchema, index) => ({
      label: subSchema.title || `Option ${index + 1}`,
      value: index,
      schema: subSchema,
    }));
  }, [schema]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!visible) {
    return null;
  }

  const handleSelect = (item: OneOfOption) => {
    setSelectedIndex(item.value);
    // Reset data when switching schemas
    handleChange(path, {});
  };

  const currentSchema = options[selectedIndex]?.schema;

  return (
    <Box flexDirection="column" gap={1}>
      {label && (
        <Text bold>
          {label}
        </Text>
      )}
      <Box flexDirection="column" gap={1}>
        <Text>Select type:</Text>
        {enabled ? (
          <SelectInput
            items={options}
            initialIndex={selectedIndex}
            onSelect={handleSelect}
          />
        ) : (
          <Text>{options[selectedIndex]?.label}</Text>
        )}
      </Box>
      {currentSchema && (
        <Box paddingTop={1}>
          <JsonFormsDispatch
            schema={currentSchema}
            uischema={uischema}
            path={path}
            renderers={renderers}
            cells={cells}
          />
        </Box>
      )}
    </Box>
  );
};

export const inkOneOfControlTester = rankWith(
  5,
  schemaMatches(schema => schema.hasOwnProperty('oneOf'))
);

export default withJsonFormsControlProps(InkOneOfControl);
