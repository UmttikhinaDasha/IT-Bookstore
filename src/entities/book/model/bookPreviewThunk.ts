import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPreviewCategory } from 'shared/api/books'
import { IBookPreview } from 'shared/types/bookType'

interface ResponseType {
    readonly data: {
        /** List of books. */
        readonly books: IBookPreview[]
    }
    /** Category title.  */
    readonly category: string
}

export const fetchBookPreview = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: string }
>('books/fetchBookPreview', async (category, thunkAPI) => {
    try {
        const response = await getPreviewCategory(category)
        return { data: response.data, category }
    } catch (e: unknown) {
        return thunkAPI.rejectWithValue('Ошибка получения данных')
    }
})
