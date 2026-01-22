import React from 'react';
import { render } from 'ink-testing-library';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../../index.js';

describe('EnumControl', () => {
  it('should render a select input for enum type', () => {
    const schema = {
      type: 'object',
      properties: {
        country: {
          type: 'string',
          enum: ['USA', 'UK', 'Canada', 'Australia'],
          title: 'Country',
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

    expect(output).toContain('Country');
  });

  it('should display all enum options', () => {
    const schema = {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          enum: ['admin', 'user', 'guest'],
          title: 'Role',
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

    expect(output).toContain('Role');
    expect(output).toContain('admin');
    expect(output).toContain('user');
    expect(output).toContain('guest');
  });

  it('should handle selected value', () => {
    const schema = {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending'],
          title: 'Status',
        },
      },
    };

    const { lastFrame } = render(
      <JsonForms
        schema={schema}
        data={{ status: 'active' }}
        renderers={inkRenderers}
        onChange={() => {}}
      />
    );

    const output = lastFrame();

    expect(output).toContain('Status');
    expect(output).toContain('active');
  });
});
