import 'react-native';
import React from 'react';
import Container from '@components/Container';

import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Text } from 'react-native';

describe('Container', () => {
  it('renders correctly', () => {
    expect(renderer.create(<Container />)).toBeTruthy();
  });

  it('has expected childred', () => {
    const node = renderer.create(
      <Container>
        <Text>Test</Text>
      </Container>,
    );

    expect(Array.isArray(node.toJSON())).toBeFalsy();

    const json = node.toJSON() as ReactTestRendererJSON;
    const fstChild = json.children?.[0] as ReactTestRendererJSON;

    expect(fstChild.type).toBe('Text');
    expect(fstChild.children?.[0]).toBe('Test');
  });

  // it('does not accept text', () => {
  //   expect(renderer.create(<Container>Test</Container>)).toBeFalsy();
  // });
});
