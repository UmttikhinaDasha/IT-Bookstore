import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategory } from 'shared/api/books'
import { IBookPreview } from 'shared/types/bookType'

interface IFetchCategory {
    /** Name of category. */
    readonly category: string
    /** Page number to receive new items. */
    readonly page: number
}

interface ResponseType {
    readonly data: {
        /** Total number of books. */
        readonly total: string
        /** Current page. */
        readonly page: string
        /** List of books for one page. */
        readonly books: IBookPreview[]
    }
}

export const fetchCategory = createAsyncThunk<
    ResponseType,
    IFetchCategory,
    { readonly rejectValue: string }
>('books/fetchCategory', async ({ category, page }, thunkAPI) => {
    try {
        const response = await getCategory(category, page)
        return { data: response.data, category }
    } catch (e: unknown) {
        return thunkAPI.rejectWithValue('Ошибка получения данных')
    }
})
