
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BooksPage } from './index';
import { bookReducer } from '../../entities/books/model/BookSlice';

jest.mock('../../entities/books/ui/BooksTable/BooksTable', () => ({
  BooksTable: () => <div data-testid="books-table">Books Table</div>
}));

jest.mock('../../shared/ui/Loader', () => ({
  MyLoader: () => <div data-testid="loader">Loading...</div>
}));

const mockUseAppSelector = jest.fn();
const mockUseAppDispatch = jest.fn();

jest.mock('../../shared/hooks/redux', () => ({
  useAppDispatch: () => mockUseAppDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector)
}));

jest.mock('../../shared/hooks/useDebounce', () => ({
  useDebounce: (value: any) => value
}));

jest.mock('@mui/material', () => ({
  TextField: () => <input data-testid="search-input" />,
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: () => <button data-testid="load-more-button">Загрузить больше</button>,
  Dialog: () => null,
  DialogTitle: () => null,
  DialogContent: () => null,
  DialogContentText: () => null,
  DialogActions: () => null,
  Typography: () => null
}));

describe('BooksPage', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        bookReducer
      }
    });
  };

  beforeEach(() => {
    mockUseAppSelector.mockImplementation((selector) => selector({
      bookReducer: {
        books: [],
        isLoading: false,
        moreBooksLoading: false,
        currentBook: null,
        isDialogOpen: false,
        hasMore: true
      }
    }));
    
    mockUseAppDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders books page with table', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <BooksPage />
      </Provider>
    );
    
    expect(screen.getByTestId('search-input')).toBeDefined();
    expect(screen.getByTestId('books-table')).toBeDefined();
    expect(screen.getByTestId('load-more-button')).toBeDefined();
  });

  it('shows loader when loading', () => {
    mockUseAppSelector.mockImplementation((selector) => selector({
      bookReducer: {
        books: [],
        isLoading: false,
        moreBooksLoading: true,
        currentBook: null,
        isDialogOpen: false,
        hasMore: true
      }
    }));
    
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <BooksPage />
      </Provider>
    );
    
    expect(screen.getByTestId('loader')).toBeDefined();
  });
});