import store from 'redux/store';
import { render } from '@testing-library/react';
import { Post } from './';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('Post', () => {
  beforeAll(() => {
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: jest.fn(),
      useSelector: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Компонент должен успешно смонтироваться', () => {
    const mockPostProps = {
      id: '1',
      title: 'Test Title',
      createdAt: '2023-09-15T12:34:56Z',
      imageUrl: 'https://example.com/image.jpg',
      user: {
        _id: '1',
        rank: 'user',
        email: 'mock@mail.ru',
        fullName: 'MockFullName',
        created: '2023-09-15T12:34:56Z',
        avatarUrl: 'https://example.com/avatar.jpg',
      },
      viewsCount: 10,
      commentsCount: 5,
      tags: ['tag1', 'tag2'],
      isLoading: false,
      isEditable: true,
    };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Post {...mockPostProps} />
        </Provider>
      </MemoryRouter>,
    );
  });
});
