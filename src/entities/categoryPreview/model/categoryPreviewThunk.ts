import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPreviewCategory, IBookPreview } from 'shared/api'
import { ErrorType, RejectedDataType } from 'shared/types'

interface ResponseType {
    /** List of books. */
    readonly books: IBookPreview[]

    /** Category title.  */
    readonly category: string
}

export const fetchCategoryPreview = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: RejectedDataType }
>('books/fetchCategoryPreview', async (category, thunkAPI) => {
    try {
        const response = await getPreviewCategory(category)

        return { books: response.books, category }
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
