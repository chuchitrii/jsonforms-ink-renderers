#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../src';

/**
 * Example schema demonstrating various field types
 */
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address',
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0,
      maximum: 150,
    },
    birthDate: {
      type: 'string',
      format: 'date',
      title: 'Birth Date',
    },
    active: {
      type: 'boolean',
      title: 'Active Status',
    },
    role: {
      type: 'string',
      enum: ['admin', 'user', 'guest'],
      enumLabels: ['Administrator', 'Regular User', 'Guest'],
      title: 'User Role',
    },
    permissions: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        enum: ['read', 'write', 'delete', 'admin'],
      },
      title: 'Permissions',
    },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: {
          type: 'string',
          title: 'Street',
        },
        city: {
          type: 'string',
          title: 'City',
        },
        zipCode: {
          type: 'string',
          title: 'ZIP Code',
        },
      },
      required: ['city'],
    },
    contacts: {
      type: 'array',
      title: 'Emergency Contacts',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Contact Name',
          },
          phone: {
            type: 'string',
            title: 'Phone Number',
          },
          relationship: {
            type: 'string',
            enum: ['family', 'friend', 'colleague'],
            title: 'Relationship',
          },
        },
        required: ['name', 'phone'],
      },
    },
  },
  required: ['name', 'email', 'role'],
};

/**
 * Optional UI Schema for custom layout
 */
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Personal Information',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          scope: '#/properties/email',
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/age',
            },
            {
              type: 'Control',
              scope: '#/properties/birthDate',
            },
          ],
        },
      ],
    },
    {
      type: 'Group',
      label: 'Account Settings',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/active',
        },
        {
          type: 'Control',
          scope: '#/properties/role',
        },
        {
          type: 'Control',
          scope: '#/properties/permissions',
        },
      ],
    },
    {
      type: 'Control',
      scope: '#/properties/address',
    },
    {
      type: 'Control',
      scope: '#/properties/contacts',
    },
  ],
};

/**
 * Initial form data
 */
const initialData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  active: true,
  role: 'user',
  permissions: ['read', 'write'],
  address: {
    city: 'San Francisco',
  },
  contacts: [],
};

/**
 * Main demo application component
 */
const DemoApp = () => {
  const [data, setData] = useState(initialData);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold underline color="cyan">
          JSONForms Ink Renderers Demo
        </Text>
      </Box>
      <Text dimColor marginBottom={1}>
        Use Tab/Shift+Tab to navigate between fields. Press Ctrl+C to exit.
      </Text>

      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={inkRenderers}
        onChange={({ data }) => setData(data)}
      />

      <Box marginTop={1} borderStyle="single" borderColor="gray" padding={1}>
        <Box flexDirection="column">
          <Text bold>Current Form Data:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </Box>
      </Box>
    </Box>
  );
};

// Render the app
render(<DemoApp />);
