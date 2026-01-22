import React from 'react';
import { render } from 'ink-testing-library';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../../index.js';

describe('Integration Tests - Multiple Schemas', () => {
  describe('User Registration Form', () => {
    it('should render complete registration form', () => {
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

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('Username');
      expect(output).toContain('Password');
      expect(output).toContain('Age');
      expect(output).toContain('Subscribe to Newsletter');
      expect(output).toContain('Country');
    });
  });

  describe('Product Form', () => {
    it('should render product form with nested structure', () => {
      const schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Product Name',
          },
          price: {
            type: 'number',
            title: 'Price',
            minimum: 0,
          },
          inStock: {
            type: 'boolean',
            title: 'In Stock',
          },
          category: {
            type: 'string',
            enum: ['Electronics', 'Clothing', 'Books', 'Food'],
            title: 'Category',
          },
        },
        required: ['name', 'price'],
      };

      const data = {
        name: 'Laptop',
        price: 999.99,
        inStock: true,
        category: 'Electronics',
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={data}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('Product Name');
      expect(output).toContain('Laptop');
      expect(output).toContain('Price');
      expect(output).toContain('999.99');
      expect(output).toContain('In Stock');
      expect(output).toContain('Yes');
      expect(output).toContain('Category');
      expect(output).toContain('Electronics');
    });
  });

  describe('Contact Form with Layout', () => {
    it('should render form with vertical layout', () => {
      const schema = {
        type: 'object',
        properties: {
          firstName: { type: 'string', title: 'First Name' },
          lastName: { type: 'string', title: 'Last Name' },
          email: { type: 'string', format: 'email', title: 'Email' },
          phone: { type: 'string', title: 'Phone' },
        },
        required: ['firstName', 'lastName', 'email'],
      };

      const uischema = {
        type: 'VerticalLayout',
        elements: [
          { type: 'Control', scope: '#/properties/firstName' },
          { type: 'Control', scope: '#/properties/lastName' },
          { type: 'Control', scope: '#/properties/email' },
          { type: 'Control', scope: '#/properties/phone' },
        ],
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('First Name');
      expect(output).toContain('Last Name');
      expect(output).toContain('Email');
      expect(output).toContain('Phone');
    });
  });

  describe('Settings Form with Groups', () => {
    it('should render grouped settings', () => {
      const schema = {
        type: 'object',
        properties: {
          displayName: { type: 'string', title: 'Display Name' },
          email: { type: 'string', title: 'Email' },
          notifications: { type: 'boolean', title: 'Enable Notifications' },
          theme: {
            type: 'string',
            enum: ['light', 'dark', 'auto'],
            title: 'Theme',
          },
        },
      };

      const uischema = {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'Profile',
            elements: [
              { type: 'Control', scope: '#/properties/displayName' },
              { type: 'Control', scope: '#/properties/email' },
            ],
          },
          {
            type: 'Group',
            label: 'Preferences',
            elements: [
              { type: 'Control', scope: '#/properties/notifications' },
              { type: 'Control', scope: '#/properties/theme' },
            ],
          },
        ],
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('Profile');
      expect(output).toContain('Display Name');
      expect(output).toContain('Email');
      expect(output).toContain('Preferences');
      expect(output).toContain('Enable Notifications');
      expect(output).toContain('Theme');
    });
  });

  describe('Multi-Select Form', () => {
    it('should render multi-select enum control', () => {
      const schema = {
        type: 'object',
        properties: {
          skills: {
            type: 'array',
            title: 'Skills',
            uniqueItems: true,
            items: {
              type: 'string',
              enum: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
            },
          },
        },
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('Skills');
      expect(output).toContain('JavaScript');
      expect(output).toContain('TypeScript');
      expect(output).toContain('React');
    });
  });

  describe('Complex Nested Form', () => {
    it('should render form with all control types', () => {
      const schema = {
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Title' },
          priority: {
            type: 'integer',
            title: 'Priority',
            minimum: 1,
            maximum: 5,
          },
          completed: { type: 'boolean', title: 'Completed' },
          status: {
            type: 'string',
            enum: ['todo', 'in-progress', 'done'],
            title: 'Status',
          },
          tags: {
            type: 'array',
            title: 'Tags',
            uniqueItems: true,
            items: {
              type: 'string',
              enum: ['bug', 'feature', 'enhancement', 'documentation'],
            },
          },
        },
        required: ['title', 'status'],
      };

      const data = {
        title: 'Implement feature',
        priority: 3,
        completed: false,
        status: 'in-progress',
        tags: ['feature'],
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={data}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toContain('Title');
      expect(output).toContain('Implement feature');
      expect(output).toContain('Priority');
      expect(output).toContain('3');
      expect(output).toContain('Completed');
      expect(output).toContain('No');
      expect(output).toContain('Status');
      expect(output).toContain('in-progress');
      expect(output).toContain('Tags');
      expect(output).toContain('feature');
    });
  });

  describe('Empty Schema', () => {
    it('should handle empty schema gracefully', () => {
      const schema = {
        type: 'object',
        properties: {},
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toBeDefined();
    });
  });

  describe('Minimal Schema', () => {
    it('should render single string field', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      };

      const { lastFrame } = render(
        <JsonForms
          schema={schema}
          data={{}}
          renderers={inkRenderers}
          onChange={() => {}}
        />
      );

      const output = lastFrame();
      expect(output).toBeDefined();
    });
  });
});
