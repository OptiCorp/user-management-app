import { Icon, TextField } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import React, { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputFieldProps {
    /** Name */
    name: string
    /** Label text */
    label: React.HTMLInputTypeAttribute
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
    /** Validation */
    validation?: Record<string, any>
}

export const InputField: FunctionComponent<InputFieldProps> = ({
    name,
    label,
    placeholder,
    validation = {},
}) => {
    const { control, register } = useFormContext()

    return (
        <Controller
            defaultValue=""
            name={name}
            control={control}
            rules={validation[name]}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
                <TextField
                    {...props}
                    id={props.name}
                    inputRef={ref}
                    inputIcon={error ? <Icon data={error_filled} title="error" /> : undefined}
                    label={label}
                    type=""
                    placeholder={placeholder}
                    {...register(name)}
                    helperText={error?.message}
                    variant={error ? 'error' : undefined}
                />
            )}
        />
    )
}
