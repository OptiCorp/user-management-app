import { Chip, Switch } from '@equinor/eds-core-react'
import { Controller, useFormContext } from 'react-hook-form'

export const StatusSwitch = () => {
    const { control } = useFormContext()
    // const [checked, setChecked] = useState(user?.status === 'Active')

    // useEffect(() => {
    //     setChecked(user?.status === 'Active')
    // }, [user])

    return (
        <>
            <Chip
                // variant={user?.status ? 'active' : 'error'}
                style={{ display: 'flex', width: '200px', height: '20px' }}
            >
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        required: 'Required',
                    }}
                    // defaultValue={user?.status || 'Disabled'}
                    render={({ field: { onChange, value } }) => (
                        <Switch
                            size="small"
                            type="checkbox"
                            value={value}
                            // disabled={!hasPermission}
                            // {...register(String(user?.status))}
                            checked={value === 'Active'}
                            onChange={(e) => {
                                const newChecked = e.target.checked
                                // setChecked(newChecked)
                                onChange(newChecked ? 'Active' : 'Disabled')
                            }}
                            // label={`User is ${checked ? 'Active' : 'Disabled'}`}
                        />
                    )}
                />
            </Chip>
        </>
    )
}