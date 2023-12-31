import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputField } from './InputField'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import apiService from '../../services/api'
import { RoleSelector } from './RoleSelector'
import { StatusSwitch } from './StatusSwitch'
import { ApiStatus, User } from '../../services/apiTypes'
import { Button, Dialog, Progress, Typography } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../components/navigation/DefaultNavigation'
import { Loading } from '../../components/Loading'
import UmAppContext from '../../contexts/UmAppContext'
import { validation } from './validation'
import { COLORS } from '../../style/GlobalStyles'

type FormValues = {
    firstName: string
    lastName: string
    userRoleId: string
    email: string
    username: string
    status: string
}

const AddUser = () => {
    const api = apiService()
    const navigate = useNavigate()

    const methods = useForm<FormValues>()
    const { handleSubmit } = methods
    const { reset } = methods
    const { id } = useParams() as { id: string }
    const appLocation = useLocation()
    const { openSnackbar } = useContext(UmAppContext)

    const [user, setUser] = useState<User>()
    const [fetchUserStatus, setFetchUserStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const [fetchStatus, setFetchStatus] = useState<ApiStatus>(ApiStatus.SUCCESS)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const path = appLocation.pathname.split('/')
    const addUserPath = path.includes('AddUser')

    useEffect(() => {
        if (!id) return
        ;(async () => {
            const userFromApi = await api.getUser(id)
            setUser(userFromApi)
            setFetchUserStatus(ApiStatus.SUCCESS)
        })()
    }, [id])

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const deleteUser = (id: string) => {
        api.softDeleteUser(id)
        openSnackbar('User deleted')
        navigate('/')
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setFetchStatus(ApiStatus.LOADING)
        if (appLocation.pathname === '/AddUser') {
            const res = await api.addUser({
                ...data,
                azureAdUserId: data.email,
            })
            setFetchStatus(ApiStatus.SUCCESS)
            reset()
            navigate('/', { state: { newUser: data.email } })
            if (res.ok && openSnackbar) openSnackbar('User added')
        } else {
            setFetchStatus(ApiStatus.LOADING)
            const res = await api.updateUser(
                id,
                data.username,
                data.firstName,
                data.lastName,
                data.email,
                data.userRoleId,
                data.status
                )
                setFetchStatus(ApiStatus.SUCCESS)
                if (res.ok && openSnackbar) openSnackbar('User updated')
        }
    }

    if (!addUserPath && fetchUserStatus === ApiStatus.LOADING) {
        return <Loading text="Loading user .." />
    }

    return (
        <>
            <FormProvider {...methods}>
                <Wrapper>
                    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                        <InputField name="username" label="Username" validation={validation} />

                        <InputField name="firstName" label="First name" validation={validation} />
                        <InputField name="lastName" label="Last name" validation={validation} />
                        <InputField
                            name="email"
                            label="Email"
                            type="email"
                            validation={validation}
                        />
                        <div>
                            <RoleSelector
                                name="userRoleId"
                                label="User role"
                                user={user}
                                validation={validation}
                            />

                            {methods.formState.errors.userRoleId && (
                                <RoleSelectorValidation>
                                    {methods.formState.errors.userRoleId.message}
                                </RoleSelectorValidation>
                            )}
                        </div>
                        {addUserPath && (
                            <Button
                                disabled={
                                    !methods.formState.isDirty ||
                                    fetchStatus === ApiStatus.LOADING
                                }
                                type="submit"
                            >
                                {fetchStatus === ApiStatus.SUCCESS && 'Add User'}
                                {fetchStatus === ApiStatus.LOADING && (
                                    <Progress.Dots color={'neutral'} />
                                )}
                            </Button>
                        )}
                        {!addUserPath && (
                            <Container>
                                <StatusSwitch user={user} label="User status" />
                                <ButtonContainer>
                                    <Button
                                        disabled={
                                            !methods.formState.isDirty ||
                                            fetchStatus === ApiStatus.LOADING
                                        }
                                        type="submit"
                                    >
                                        {fetchStatus === ApiStatus.SUCCESS && 'Update User'}
                                        {fetchStatus === ApiStatus.LOADING && (
                                            <Progress.Dots color={'neutral'} />
                                        )}
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="outlined"
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                        disabled={user?.status === 'Deleted'}
                                    >
                                        Delete user
                                    </Button>
                                </ButtonContainer>
                            </Container>
                        )}
                    </FormWrapper>
                </Wrapper>
                <>
                    <DefaultNavigation />
                </>
            </FormProvider>
            <Dialog
                open={isDeleteDialogOpen}
                isDismissable
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <Dialog.Header>
                    <Dialog.Title>Delete user?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography variant="body_short">
                        Are you sure you want to delete the user
                        <Typography as="span" bold variant="body_short">
                            {' '}
                            {user?.firstName} {user?.lastName}
                        </Typography>
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button
                        onClick={() => setIsDeleteDialogOpen(false)}
                        variant="ghost"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button color="danger" onClick={() => deleteUser(id)}>
                        Delete
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

export default AddUser

export const Wrapper = styled.div`
    margin: 2rem auto;
    width: 80%;
`

const FormWrapper = styled.form`
    margin: 0 auto;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`

const RoleSelectorValidation = styled.p`
    margin: 0;
    padding: 5px 0 0 10px;
    color: ${COLORS.crimson};
    font-weight: 500;
`
