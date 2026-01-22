import React from 'react';
import { render } from 'ink-testing-library';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../../index.js';

describe('VerticalLayout', () => {
  it('should render fields vertically', () => {
    const schema = {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
      },
    };

    const uischema = {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/firstName' },
        { type: 'Control', scope: '#/properties/lastName' },
        { type: 'Control', scope: '#/properties/email' },
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
  });

  it('should render empty layout gracefully', () => {
    const schema = {
      type: 'object',
      properties: {},
    };

    const uischema = {
      type: 'VerticalLayout',
      elements: [],
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
    expect(output).toBeDefined();
  });
});
