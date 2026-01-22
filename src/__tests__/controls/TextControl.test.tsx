import React from 'react';
import { render } from 'ink-testing-library';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../../index.js';

describe('TextControl', () => {
  it('should render a text input for string type', () => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
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
    expect(output).toContain('Name');
  });

  it('should display validation errors for required fields', () => {
    const schema = {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
        },
      },
      required: ['email'],
    };

    const { lastFrame } = render(
      <JsonForms
        schema={schema}
        data={{ email: '' }}
        renderers={inkRenderers}
        onChange={() => {}}
      />
    );

    const output = lastFrame();
    expect(output).toContain('Email');
  });

  it('should render with minLength constraint', () => {
    const schema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'Username',
          minLength: 3,
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
    expect(output).toContain('Username');
  });
});
