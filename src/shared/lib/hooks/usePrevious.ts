import { useRef } from 'react'

/**
 * @param value Current value.
 * @returns Previous value.
 */
export const usePrevious = (value: unknown) => {
    const currentRef = useRef<unknown>(value)
    const previousRef = useRef<null | unknown>(null)

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current
        currentRef.current = value
    }
    return previousRef.current
}
