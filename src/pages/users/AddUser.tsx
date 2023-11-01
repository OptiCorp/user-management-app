import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputField } from './InputField'
import { useLocation, useParams } from 'react-router'
import { users } from './Users'
import { useEffect } from 'react'
import { DefaultNavigation } from '../../components/navigation/DefaultNavigation'
import { UserNav } from './navigation/UserNav'
import { Button } from '@equinor/eds-core-react'
import apiService from '../../services/api'
import { NavActionsComponent } from '../../components/navigation/useNavActionBtn'
import { RoleSelector } from './RoleSelector'
import { StatusSwitch } from './StatusSwitch'

const AddUser = () => {
    const api = apiService()
    const methods = useForm()
    const { handleSubmit } = methods
    const { reset } = methods
    const { id } = useParams() as { id: string }
    const appLocation = useLocation()
    const path = appLocation.pathname.split('/')
    const user = users.find((user) => user.id === id)

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const submitNewUser = () => {
        /* console.log({
            azureAdUserId: methods.getValues('email'),
            firstName: methods.getValues('firstName'),
            lastName: methods.getValues('lastName'),
            username: methods.getValues('username'),
            email: methods.getValues('email'),
        }) */
        /* api.addUser({
            azureAdUserId: methods.getValues('email'),
            firstName: methods.getValues('firstName'),
            lastName: methods.getValues('lastName'),
            username: methods.getValues('username'),
            email: methods.getValues('email'),
        }) */
    }
    const updateUser = () => {
        console.log('user updated')
        console.log(methods.getValues('email'))
        api.updateUser(
            id,
            methods.getValues('username'),
            methods.getValues('firstName'),
            methods.getValues('lastName'),
            methods.getValues('email'),
            'user role id here',
            'status here'
        )
    }

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <FormWrapper onSubmit={handleSubmit(submitNewUser)}>
                    <InputField name="username" label="Username" placeholder="username" />
                    <InputField name="firstName" label="First name" placeholder="first name" />
                    <InputField name="lastName" label="Last name" placeholder="last name" />
                    <InputField name="email" label="Email" placeholder="email" type="email" />
                    {/* {path.includes('AddUser') && <Button type="submit">Add User</Button>}
                    {!path.includes('AddUser') && <Button type="submit">Update User</Button>} */}
                    <RoleSelector />
                    <StatusSwitch />
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
    gap: 30px;
`
