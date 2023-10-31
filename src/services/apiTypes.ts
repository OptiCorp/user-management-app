export type User = {
    id: string
    azureAdUserId: string
    firstName: string
    lastName: string
    email: string
    username: string
    userRole: UserRole
    status: string
    createdDate: string
    updatedDate: string | null
}

export type UserRole = {
    id: string
    name: string
}
