import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Post } from './';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const createMockStore = configureStore();
const initialState = {
  auth: {
    data: {
      userData: {
        _id: '0',
        rank: 'user',
        email: 'mock_auth@mail.ru',
        fullName: 'MockAuthFullName',
        created: '2023-09-15T12:34:56Z',
        avatarUrl: 'https://example.com/avatar.jpg',
      },
    },
  },
};
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
  isEditable: false,
};

describe('Post component tests', () => {
  beforeAll(() => {
    const mockAuthUser = {
      _id: '1',
      rank: 'user',
      email: 'mock@mail.ru',
      fullName: 'MockFullName',
      created: '2023-09-15T12:34:56Z',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: jest.fn(),
      useSelector: jest.fn().mockReturnValue(mockAuthUser),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should be successful rendered', () => {
    const store = createMockStore(initialState);

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Post {...mockPostProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(container.querySelector('.tags')).toBeInTheDocument();
    expect(screen.getByText('#tag1')).toBeInTheDocument();
    expect(screen.getByText('#tag2')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.queryByTestId('views-count').textContent).toEqual('10');
    expect(screen.queryByTestId('comments-count').textContent).toEqual('5');
  });

  test('should be unlock post control buttons because auth user is author', () => {
    const modifiedState = {
      auth: {
        data: {
          userData: {
            ...initialState.auth.data.userData,
            _id: '1',
          },
        },
      },
    };
    const store = createMockStore(modifiedState);

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Post {...mockPostProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(container.querySelector('.editButtons')).toBeInTheDocument();
  });

  test('should be unlock post control buttons because auth user is admin', async () => {
    const modifiedState = {
      auth: {
        data: {
          userData: {
            ...initialState.auth.data.userData,
            rank: 'admin',
          },
        },
      },
    };
    const store = createMockStore(modifiedState);

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Post {...mockPostProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(container.querySelector('.editButtons')).toBeInTheDocument();
  });
});
