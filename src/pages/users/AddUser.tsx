import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputField } from './InputField'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import apiService from '../../services/api'
import { RoleSelector } from './RoleSelector'
import { StatusSwitch } from './StatusSwitch'
import { ApiStatus, User } from '../../services/apiTypes'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../components/navigation/DefaultNavigation'
import { Loading } from '../../components/Loading'
import UmAppContext from '../../contexts/UmAppContext'

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
        api.hardDeleteUser(id)
        openSnackbar('User deleted')
        navigate('/')
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (appLocation.pathname === '/AddUser') {
            const res = await api.addUser({
                ...data,
                azureAdUserId: data.email,
            })

            reset()
            if (res.ok && openSnackbar) openSnackbar('User added')

            navigate('/', { state: { newUser: data.email } })
        } else {
            const res = await api.updateUser(
                id,
                data.username,
                data.firstName,
                data.lastName,
                data.email,
                data.userRoleId,
                data.status
            )
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
                        <InputField name="username" label="Username" />
                        <InputField name="firstName" label="First name" />
                        <InputField name="lastName" label="Last name" />
                        <InputField name="email" label="Email" type="email" />

                        <RoleSelector label="User role" user={user} />
                        {addUserPath && <Button type="submit">Add User</Button>}
                        {!addUserPath && (
                            <Container>
                                <StatusSwitch user={user} label="User status" />
                                <ButtonContainer>
                                    <Button type="submit">Update User</Button>
                                    <Button
                                        color="danger"
                                        onClick={() => setIsDeleteDialogOpen(true)}
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
            <Dialog open={isDeleteDialogOpen} isDismissable /* onClose={handleStatusClose} */>
                <Dialog.Header>
                    <Dialog.Title>Delete user?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography variant="body_short">
                        Are you sure you want to delete the user
                        <Typography as="span" bold variant="body_short">
                            {' '}
                            {user?.firstName} {user?.lastName},{' '}
                        </Typography>
                        this permanently deletes the user.
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
    gap: 20px;
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
