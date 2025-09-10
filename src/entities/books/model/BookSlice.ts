import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../types";
import axios from "axios";


export const fetchBooks = createAsyncThunk(
    'books/fetchAll',
    async(_,thunkAPI) => {
        try {
            const {data} = await axios.get('https://www.googleapis.com/books/v1/volumes?q=books&maxResults=10')
            return data.items
        } catch (error) {
            return thunkAPI.rejectWithValue(`Не удалось загрузить задачу, ${error}`);
        }
    }

)

interface BookState {
    books:IBook[],
    currentBook:IBook | null,
    isLoading:boolean,
    error:string
}

const initialState:BookState = {
    books:[],
    currentBook:null,
    isLoading:false,
    error:''
}

export const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{},
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
    }
})

export const bookReducer = bookSlice.reducer;