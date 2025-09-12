import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../types";
import axios from "axios";
import type { RootState } from "../../../app/store";

export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (q: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: q,
            startIndex: state.bookReducer.startIndex,
            maxResults: 10,
          },
        }
      );
      return data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Не удалось загрузить задачу, ${error}`);
    }
  }
);
export const getCurrentBook = createAsyncThunk(
  "books/getOneBook",
  async (id: string, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const book = state.bookReducer.books.find((book) => book.id === id);
      if (!book) {
        throw new Error(`Книга с id: ${id} не найдена`);
      }
      return book;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Не удалось получить книгу с id:${id},${error}`
      );
    }
  }
);
export const loadMore = createAsyncThunk(
  "books/loadMore",
  async (q: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    try {
        if (q.trim() === '') {
        return thunkApi.rejectWithValue('Пустой поисковый запрос');
      }
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            startIndex: state.bookReducer.startIndex,
            maxResults: 10,
            q,
          },
        }
      );
      return data.items;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Не удалось загрузить больше книг, ${error}`
      );
    }
  }
);

export interface BookState {
  books: IBook[];
  currentBook: IBook | null;
  isLoading: boolean;
  moreBooksLoading: boolean;
  isDialogOpen: boolean;
  startIndex: number;
  hasMore: boolean;
  error: string;
}

const initialState: BookState = {
  books: [],
  currentBook: null,
  isLoading: false,
  moreBooksLoading: false,
  isDialogOpen: false,
  startIndex: 0,
  hasMore: true,
  error: "",
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
      state.currentBook = null;
    },
    updateBookTitle: (state,action:PayloadAction<{id:string,newTitle:string}>) => {
        const {id,newTitle} = action.payload
        const bookIndex = state.books.findIndex(book => book.id === id)

        if(bookIndex !== -1) {
            state.books[bookIndex].volumeInfo.title = newTitle
        }
        if(state.currentBook?.id === id) {
            state.currentBook.volumeInfo.title = newTitle
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state: BookState) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
        state.startIndex = 10;
        state.hasMore = action.payload.length === 10;
      })
      .addCase(fetchBooks.rejected, (state: BookState, action) => {
        state.isLoading = false;
        state.error = action.error.message || "произошла ошибка";
      })

      .addCase(loadMore.fulfilled, (state, action) => {
        state.books = [...state.books, ...action.payload];
        state.moreBooksLoading = false;
        state.startIndex += 10;
        state.hasMore = action.payload.length === 10;
      })
      .addCase(loadMore.pending, (state: BookState) => {
        state.moreBooksLoading = true;
      })
      .addCase(loadMore.rejected, (state: BookState, action) => {
        state.moreBooksLoading = false;
        state.error = action.error.message || "произошла ошибка";
      })

      .addCase(
        getCurrentBook.fulfilled,
        (state: BookState, action: PayloadAction<IBook>) => {
          state.isLoading = false;
          state.currentBook = action.payload;
          state.isDialogOpen = true;
        }
      );
  },
});
export const { openDialog, closeDialog,updateBookTitle } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
