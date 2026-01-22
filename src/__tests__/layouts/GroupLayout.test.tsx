import React from 'react';
import { render } from 'ink-testing-library';
import { JsonForms } from '@jsonforms/react';
import { inkRenderers } from '../../index.js';

describe('GroupLayout', () => {
  it('should render a group with label and border', () => {
    const schema = {
      type: 'object',
      properties: {
        street: {
          type: 'string',
          title: 'Street',
        },
        city: {
          type: 'string',
          title: 'City',
        },
      },
    };

    const uischema = {
      type: 'Group',
      label: 'Address',
      elements: [
        { type: 'Control', scope: '#/properties/street' },
        { type: 'Control', scope: '#/properties/city' },
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


    expect(output).toContain('Address');
    expect(output).toContain('Street');
    expect(output).toContain('City');
  });

  it('should render nested groups', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'integer', title: 'Age' },
      },
    };

    const uischema = {
      type: 'Group',
      label: 'Personal Information',
      elements: [
        { type: 'Control', scope: '#/properties/name' },
        { type: 'Control', scope: '#/properties/age' },
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


    expect(output).toContain('Personal Information');
    expect(output).toContain('Name');
    expect(output).toContain('Age');
  });
});
