import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputField } from './InputField'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import apiService from '../../services/api'
import { NavActionsComponent } from '../../components/navigation/useNavActionBtn'
import { RoleSelector } from './RoleSelector'
import { StatusSwitch } from './StatusSwitch'
import { User } from '../../services/apiTypes'
import { Button, Dialog, Input, Label, Typography } from '@equinor/eds-core-react'

const AddUser = () => {
    const api = apiService()
    const navigate = useNavigate()
    const methods = useForm()
    const { handleSubmit } = methods
    const { reset } = methods
    const { id } = useParams() as { id: string }
    const appLocation = useLocation()

    const [user, setUser] = useState<User>()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const path = appLocation.pathname.split('/')

    useEffect(() => {
        if (!id) return
        ;(async () => {
            const userFromApi = await api.getUser(id)
            setUser(userFromApi)
        })()
    }, [id])

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const deleteUser = (id: string) => {
        api.hardDeleteUser(id)
        navigate('/')
    }

    const submitNewUser = () => {
        api.addUser(
            methods.getValues('username'),
            methods.getValues('email'),
            methods.getValues('firstName'),
            methods.getValues('lastName'),
            methods.getValues('email'),
            methods.getValues('userRoleId')
        )
        navigate('/')
    }
    const updateUser = () => {
        api.updateUser(
            id,
            methods.getValues('username'),
            methods.getValues('firstName'),
            methods.getValues('lastName'),
            methods.getValues('email'),
            methods.getValues('userRoleId'),
            methods.getValues('status')
        )
        navigate(`/EditUser/${id}`)
    }

    return (
        <>
            <FormProvider {...methods}>
                <Wrapper>
                    <FormWrapper onSubmit={handleSubmit(submitNewUser)}>
                        <InputField name="username" label="Username" placeholder="username" />
                        <InputField name="firstName" label="First name" placeholder="first name" />
                        <InputField name="lastName" label="Last name" placeholder="last name" />
                        <InputField name="email" label="Email" placeholder="email" type="email" />

                        <RoleSelector label="User role" user={user} />
                        {!path.includes('AddUser') && (
                            <>
                                <StatusSwitch user={user} />
                                <Button color="danger" onClick={() => setIsDeleteDialogOpen(true)}>
                                    Delete user
                                </Button>
                            </>
                        )}
                    </FormWrapper>
                </Wrapper>
                <NavActionsComponent
                    onClick={() => console.log('test')}
                    buttonVariant="outlined"
                    ButtonMessage="Clear"
                    secondButtonColor="primary"
                    secondOnClick={path.includes('AddUser') ? submitNewUser : updateUser}
                    SecondButtonMessage={path.includes('AddUser') ? 'Create User' : 'Update User'}
                    isShown={true}
                />
            </FormProvider>
            <Dialog open={isDeleteDialogOpen} isDismissable /* onClose={handleStatusClose} */>
                <Dialog.Header>
                    <Dialog.Title>Delete user?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography variant="body_short">
                        Are you sure you want to delete{' '}
                        <strong>
                            {user?.firstName} {user?.lastName}
                        </strong>
                        , this permanently deletes the user.
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button color="danger" onClick={() => deleteUser(id)}>
                        Delete
                    </Button>
                    <Button onClick={() => setIsDeleteDialogOpen(false)} variant="ghost">
                        Cancel
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
    max-width: 600px;
    height: 600px;
    display: grid;
    align-items: center;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr;
`

const FormWrapper = styled.form`
    margin: 0 auto;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
