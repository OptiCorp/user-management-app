export const validation = {
    username: {
        required: 'Username is required',
        minLength: {
            value: 4,
            message: 'Username must be at least 4 characters long',
        },
    },
    firstName: {
        required: 'First name is required',
        pattern: {
            value: /^[A-ZÆØÅa-zæøå ]+$/,
            message: 'First name can only contain letters',
        },
    },
    lastName: {
        required: 'Last name is required',
        pattern: {
            value: /^[A-ZÆØÅa-zæøå]+$/,
            message: 'Last name can only contain letters',
        },
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Not a valid email',
        },
    },
    userRoleId: {
        required: 'User role is required',
    },
}
