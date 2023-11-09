import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { User, UserRole } from '../../services/apiTypes'
import apiService from '../../services/api'
import { Label } from '@equinor/eds-core-react'
import styled from 'styled-components'

type Props = {
    user?: User
    /** Label text */
    label?: string
    /** Name */
    name: string
    /** Validation */
    validation: Record<string, any>
}

export const RoleSelector = ({ user, label, name, validation }: Props) => {
    const api = apiService()
    const { control, setValue } = useFormContext()
    const [userRoles, setUserRoles] = useState<UserRole[]>()

    useEffect(() => {
        ;(async () => {
            const userRolesFromApi = await api.getAllUserRoles()
            setUserRoles(userRolesFromApi)
        })()
    }, [])

    const currentDefaultValue = userRoles?.find((role) => role.name === user?.userRole.name)
    const options = userRoles?.map(({ id, name }: { id: string; name: string }) => ({
        value: id,
        label: name,
    }))

    return (
        <Controller
            control={control}
            name={name}
            rules={validation[name]}
            defaultValue={currentDefaultValue}
            render={({ field: { onChange, value } }) => {
                if (!value && currentDefaultValue) {
                    setValue('userRoleId', currentDefaultValue.id)
                }

                return (
                    <Container>
                        {label && <Label label={label} />}
                        <Select
                            placeholder={user?.userRole.name}
                            options={options}
                            value={options?.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val?.value)
                            }}
                        />
                    </Container>
                )
            }}
        />
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
`
