import { render } from '@testing-library/react';
import { Post } from './';

describe('Post', () => {
  test('should be defined', () => {
    render(<Post />);
  });
});
