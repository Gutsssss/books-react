import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { bookReducer } from "../../entities/books/model/BookSlice"

const rootReducer = combineReducers({
    bookReducer
})

export const setupStore = () => {
    return configureStore({
        reducer:rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']