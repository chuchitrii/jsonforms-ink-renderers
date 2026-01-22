#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../src';

/**
 * Simple example with basic field types
 */
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      minLength: 3,
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 8,
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 18,
    },
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to Newsletter',
    },
    country: {
      type: 'string',
      enum: ['USA', 'UK', 'Canada', 'Australia'],
      title: 'Country',
    },
  },
  required: ['username', 'password', 'age'],
};

const SimpleDemoApp = () => {
  const [data, setData] = useState({});

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan" marginBottom={1}>
        Simple Registration Form
      </Text>

      <JsonForms
        schema={schema}
        data={data}
        renderers={inkRenderers}
        onChange={({ data, errors }) => {
          setData(data);
          if (errors && errors.length > 0) {
            console.log('Validation errors:', errors);
          }
        }}
      />

      <Box marginTop={1} borderStyle="single" padding={1}>
        <Text dimColor>Form Data: {JSON.stringify(data)}</Text>
      </Box>
    </Box>
  );
};

render(<SimpleDemoApp />);
