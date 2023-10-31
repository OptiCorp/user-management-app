import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputField } from './InputField'
import { useParams } from 'react-router'
import { users } from './Users'
import { useEffect } from 'react'

const AddUser = () => {
    const methods = useForm()
    const { reset } = methods
    const { id } = useParams()
    const user = users.find((user) => user.id === id)

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <FormWrapper>
                    <InputField name="username" label="Username" placeholder="username" />
                    <InputField name="firstName" label="First name" placeholder="first name" />
                    <InputField name="lastName" label="Last name" placeholder="last name" />
                    <InputField name="email" label="email" placeholder="email" type="email" />
                </FormWrapper>
            </Wrapper>
        </FormProvider>
    )
}

export default AddUser

export const Wrapper = styled.div`
    margin: 2rem auto;
    display: grid;
    align-items: center;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr;
    width: 80%;
    height: 600px;
    max-width: 600px;
`

const FormWrapper = styled.form`
    margin: 0 auto;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`
