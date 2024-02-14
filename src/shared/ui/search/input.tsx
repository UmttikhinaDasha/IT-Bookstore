import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import clsx from 'clsx'

import './input.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    /** Additional styles. */
    readonly className?: string
}

export const Input: FC<IInput> = (props) => {
    const { value, onChange, onBlur, onFocus, placeholder, className } = props

    const [inputData, setinputData] = useState<string>('')

    const onChangeinputData = (e: ChangeEvent<HTMLInputElement>) => {
        setinputData(e.target.value)
    }

    return (
        <input
            onBlur={onBlur}
            onFocus={onFocus}
            className={clsx('input', className)}
            type='text'
            value={value ?? inputData}
            onChange={onChange ?? onChangeinputData}
            placeholder={placeholder}
        />
    )
}
