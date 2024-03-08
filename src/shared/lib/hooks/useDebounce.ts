import { useEffect, useRef, useState } from 'react'

type Timer = ReturnType<typeof setTimeout>
type SomeFunction = (...args: any[]) => void

interface UseDebounceResult<Func> {
    readonly debouncedFunction: Func
    readonly loadingDebounce: boolean
}

/**
 * @param func The original, non debounced function (You can pass any number of args to it).
 * @param delay The delay (in ms) for the function to return.
 * @returns DebouncedFunction - The debounced function, which will run only
 *          if the debounced function has not been called in the last (delay) ms.
 *          LoadingDebounce - The status shows whether the function call is currently pending or not.
 */
export const useDebounce = <Func extends SomeFunction>(
    func: Func,
    delay = 1200
): UseDebounceResult<Func> => {
    const timer = useRef<Timer>()
    const [loadingDebounce, setLoadingDebounce] = useState(false)

    useEffect(() => {
        return () => {
            if (!timer.current) return
            clearTimeout(timer.current)
        }
    }, [])

    const debouncedFunction = ((...args) => {
        setLoadingDebounce(true)
        const newTimer = setTimeout(() => {
            setLoadingDebounce(false)
            func(...args)
        }, delay)
        clearTimeout(timer.current)
        timer.current = newTimer
    }) as Func

    return { debouncedFunction, loadingDebounce }
}
