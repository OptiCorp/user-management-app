import { Chip, Label, Switch } from '@equinor/eds-core-react'
import { Controller, useFormContext } from 'react-hook-form'
import { User } from '../../services/apiTypes'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
    user?: User
    /** Label text. */
    label?: string
}

export const StatusSwitch = ({ user, label }: Props) => {
    const { control, register } = useFormContext()
    const [checked, setChecked] = useState(user?.status === 'Active')

    useEffect(() => {
        setChecked(user?.status === 'Active')
    }, [user])

    return (
        <Container>
            {label && <Label label={label} />}
            <SwitchChip
                variant={checked ? 'active' : 'error'}
                style={{ display: 'flex', width: '200px', height: '20px' }}
            >
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        required: 'Required',
                    }}
                    defaultValue={user?.status || 'Disabled'}
                    render={({ field: { onChange, value } }) => (
                        <Switch
                            size="small"
                            type="checkbox"
                            value={value}
                            {...register(String(user?.status))}
                            checked={value === 'Active'}
                            onChange={(e) => {
                                const newChecked = e.target.checked
                                setChecked(newChecked)
                                onChange(newChecked ? 'Active' : 'Disabled')
                            }}
                            label={` ${checked ? 'Deactivate user' : 'Activate user'}`}
                        />
                    )}
                />
            </SwitchChip>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const SwitchChip = styled(Chip)`
    display: flex;
    width: 200px;
    height: 20px;
`
