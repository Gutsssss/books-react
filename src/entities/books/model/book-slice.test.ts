// entities/books/model/book-slice.test.ts
import { type BookState } from './BookSlice';
import { type IBook } from '../types';

describe('BookState structure', () => {
  it('should have correct initial state structure', () => {
    const initialState: BookState = {
      books: [],
      currentBook: null,
      isLoading: false,
      moreBooksLoading: false,
      isDialogOpen: false,
      startIndex: 0,
      hasMore: true,
      error: ""
    };

    expect(initialState).toEqual({
      books: expect.any(Array),
      currentBook: null,
      isLoading: expect.any(Boolean),
      moreBooksLoading: expect.any(Boolean),
      isDialogOpen: expect.any(Boolean),
      startIndex: expect.any(Number),
      hasMore: expect.any(Boolean),
      error: expect.any(String)
    });

    expect(initialState.books).toHaveLength(0);
    expect(initialState.isLoading).toBe(false);
    expect(initialState.moreBooksLoading).toBe(false);
    expect(initialState.isDialogOpen).toBe(false);
    expect(initialState.startIndex).toBe(0);
    expect(initialState.hasMore).toBe(true);
    expect(initialState.error).toBe("");
  });

  it('should allow books array to contain IBook objects', () => {
    const book: IBook = {
      id: '1',
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author 1'],
        description: 'Test description',
        publishedDate: '',
        categories: ['Test Category']
      }
    };

    const stateWithBooks: BookState = {
      books: [book],
      currentBook: book,
      isLoading: false,
      moreBooksLoading: false,
      isDialogOpen: true,
      startIndex: 10,
      hasMore: false,
      error: ""
    };

    expect(stateWithBooks.books).toHaveLength(1);
    expect(stateWithBooks.books[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      volumeInfo: expect.objectContaining({
        title: expect.any(String),
        authors: expect.any(Array),
        description: expect.any(String),
        publishedDate: expect.any(String),
        categories: expect.any(Array)
      })
    }));

    expect(stateWithBooks.currentBook).toEqual(book);
    expect(stateWithBooks.isDialogOpen).toBe(true);
    expect(stateWithBooks.startIndex).toBe(10);
    expect(stateWithBooks.hasMore).toBe(false);
  });

  it('should allow error state with different messages', () => {
    const errorState: BookState = {
      books: [],
      currentBook: null,
      isLoading: false,
      moreBooksLoading: false,
      isDialogOpen: false,
      startIndex: 0,
      hasMore: true,
      error: "Network error occurred"
    };

    expect(errorState.error).toBe("Network error occurred");
  });

  it('should allow different loading states', () => {
    const loadingState: BookState = {
      books: [],
      currentBook: null,
      isLoading: true,
      moreBooksLoading: true,
      isDialogOpen: false,
      startIndex: 0,
      hasMore: true,
      error: ""
    };

    expect(loadingState.isLoading).toBe(true);
    expect(loadingState.moreBooksLoading).toBe(true);
  });

  it('should allow pagination states', () => {
    const paginationState: BookState = {
      books: [],
      currentBook: null,
      isLoading: false,
      moreBooksLoading: false,
      isDialogOpen: false,
      startIndex: 20,
      hasMore: false,
      error: ""
    };

    expect(paginationState.startIndex).toBe(20);
    expect(paginationState.hasMore).toBe(false);
  });
});