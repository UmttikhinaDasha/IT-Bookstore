import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBook } from 'shared/api/books'
import { IBookDescription } from 'shared/types/bookType'

interface ResponseType {
    readonly data: IBookDescription
}

export const fetchBookDescription = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: string }
>('books/fetchBookDescription', async (isbn13, thunkAPI) => {
    try {
        const response = await getBook(isbn13)
        return { data: response.data }
    } catch (e: unknown) {
        return thunkAPI.rejectWithValue('Ошибка получения данных')
    }
})
