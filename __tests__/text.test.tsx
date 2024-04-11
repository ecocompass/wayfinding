import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../wayfinding/components/ui/text.tsx'; // Update with the correct path

describe('Text Component', () => {

  it('renders correctly with default props', () => {
    const { getByText } = render(<Text>Default Text</Text>);
    const textComponent = getByText('Default Text');

    // Check default styling
    expect(textComponent.props.style).toMatchObject({
      color: '$text700', 
      fontWeight: 'normal',
      fontFamily: 'StyledText',
      fontSize: 14, 
      
    });
  });

  it('applies bold style when bold prop is true', () => {
    const { getByText } = render(<Text bold>Bold Text</Text>);
    expect(getByText('Bold Text').props.style).toMatchObject({
      fontWeight: 'bold', 
    });
  });

  it('truncates text when isTruncated prop is true', () => {
    const { getByText } = render(<Text isTruncated>Long Text</Text>);
    const textComponent = getByText('Long Text');

    expect(textComponent.props).toMatchObject({
      numberOfLines: 1,
      ellipsizeMode: 'tail',
    });
  });

  

  it('changes font size for size variants', () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
    sizes.forEach(size => {
      const { getByText } = render(<Text size={size}>Size Test</Text>);
      expect(getByText('Size Test').props.style.fontSize).toBe(/* expected font size for the variant */);
    });
  });

  
});

