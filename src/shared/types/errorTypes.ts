/** Type of error received after the request. */
export interface ErrorType {
    /** Error message. */
    readonly message: string
    /** Error response object. */
    readonly response: {
        /** Error status. */
        readonly status?: string
    }
}

/** Type of error sent to the storage. */
export interface RejectedDataType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}
