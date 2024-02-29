import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import clsx from 'clsx'

import './input.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    /** Additional styles. */
    readonly className?: string
}

export const Input: FC<IInput> = (props) => {
    const {
        value,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
        placeholder,
        className,
    } = props

    const [inputData, setinputData] = useState<string>('')

    const onChangeinputData = (e: ChangeEvent<HTMLInputElement>) => {
        setinputData(e.target.value)
    }

    return (
        <input
            className={clsx('input', className)}
            type='text'
            value={value ?? inputData}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange ?? onChangeinputData}
            onKeyDown={onKeyDown}
        />
    )
}
