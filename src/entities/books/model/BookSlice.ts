import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../types";
import axios from "axios";
import type { RootState } from "../../../app/store";

let startIndex = 0
export const fetchBooks = createAsyncThunk(
    'books/fetchAll',
    async(q:string,thunkAPI) => {
        try {
            const {data} = await axios.get('https://www.googleapis.com/books/v1/volumes',
                {
                    params:{
                        q:q,
                        startIndex:startIndex,
                        maxResults:10
                        
                    }
                }
            )
            return data.items
        } catch (error) {
            return thunkAPI.rejectWithValue(`Не удалось загрузить задачу, ${error}`);
        }
    }
)
export const getCurrentBook = createAsyncThunk(
    'books/getOneBook',
    async(id:string,thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState
            const book = state.bookReducer.books.find(book => book.id === id)
            if(!book) {
                throw new Error(`Книга с id: ${id} не найдена`);
            }
            return book
        } catch (error) {
            return thunkApi.rejectWithValue(`Не удалось получить книгу с id:${id},${error}`)
        }
    }
)
export const loadMore = createAsyncThunk(
    'books/loadMore',
    async(q:string,thunkApi) => {
        startIndex = startIndex + 10
        try {
            const {data} = await axios.get('https://www.googleapis.com/books/v1/volumes',
                {
                    params:{
                        startIndex:startIndex,
                        maxResults:10,
                        q
                    }
                }
            )
            return data.items
        } catch (error) {
            return thunkApi.rejectWithValue(`Не удалось загрузить больше книг, ${error}`)
        }
    }
)


interface BookState {
    books:IBook[],
    currentBook:IBook | null,
    isLoading:boolean,
    moreBooksLoading:boolean,
    error:string,
    isDialogOpen:boolean
}

const initialState:BookState = {
    books:[],
    currentBook:null,
    isLoading:false,
    moreBooksLoading:false,
    error:'',
    isDialogOpen:false
}

export const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{
        openDialog:(state) => {
            state.isDialogOpen = true
        },
        closeDialog: (state) => {
      state.isDialogOpen = false;
      state.currentBook = null;
    }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchBooks.pending, (state:BookState) => {
            state.isLoading = true
        })
        .addCase(fetchBooks.fulfilled, (state:BookState,action:PayloadAction<IBook[]>) => {
            state.isLoading = false
            state.books = action.payload
        })
        .addCase(fetchBooks.rejected, (state:BookState,action) => {
            state.isLoading = false
            state.error = action.error.message || 'произошла ошибка'
        })

        .addCase(loadMore.fulfilled, (state:BookState,action:PayloadAction<IBook[]>) => {
            state.moreBooksLoading = false
            state.books = [...state.books,...action.payload]
        })
        .addCase(loadMore.pending, (state:BookState) => {
            state.moreBooksLoading = true
        })
        .addCase(loadMore.rejected, (state:BookState,action) => {
            state.moreBooksLoading = false
            state.error = action.error.message || 'произошла ошибка'
        })

        .addCase(getCurrentBook.fulfilled, (state:BookState,action:PayloadAction<IBook>) => {
            state.isLoading = false
            state.currentBook = action.payload
            state.isDialogOpen = true;
        })
    }
})
export const { openDialog, closeDialog } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;