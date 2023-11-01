import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'

export const RoleSelector = () => {
    const { control } = useFormContext()

    // const [userRoles, setUserRoles] = useState<UserRole[]>()

    const userRoles = [
        {
            id: '72c9c2c2-c6cf-4456-807e-86df907f482c',
            name: 'Leader',
        },
        {
            id: 'a8a9ed66-274f-4c64-b08d-e3fc234119e7',
            name: 'Admin',
        },
        {
            id: 'd9a578ef-ed33-41bd-954f-9577c51ae902',
            name: 'Inspector',
        },
    ]
    /* 
    useEffect(() => {
        ;(async () => {
            const userRolesFromApi = await api.getAllUserRoles()
            setUserRoles(userRolesFromApi)
        })()
    }, []) */

    /*  const currentDefaultValue = userRoles?.find(
        (role) => role.name === user?.userRole.name
    ) */
    const options = userRoles?.map(({ id, name }: { id: string; name: string }) => ({
        value: id,
        label: name,
    }))

    return (
        <>
            <Controller
                control={control}
                name="userRoleId"
                rules={{
                    required: 'Required',
                }}
                defaultValue={'Inspector'}
                render={({ field: { onChange, value } }) => {
                    /* if (!value && currentDefaultValue) {
                        setValue('userRoleId', currentDefaultValue.id)
                    } */

                    return (
                        <Select
                            /* placeholder={userRoles.name} */

                            options={options}
                            value={options?.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val?.value)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}
