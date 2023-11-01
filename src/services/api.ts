import { API_URL } from '../config'
import { pca } from '../msalConfig'
import { User, UserRole } from './apiTypes'

const request = {
    scopes: ['cc0af56e-ee49-46ce-aad6-010dce5bcbb6/User.Read'],
    account: pca.getAllAccounts()[0],
}

const apiService = () => {
    // Generic function for get requests
    const getByFetch = async (url: string): Promise<any> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const getOperation = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, getOperation)
            if (res.ok) {
                const jsonResult = await res.json()
                const resultObj = jsonResult
                return resultObj
            } else {
                console.error('Get by fetch failed. Url=' + url, res)
            }
        })
    }

    // Generic function for post requests
    const postByFetch = async (url: string, bodyData?: any) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const postOperation = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, postOperation)
            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Generic function for put requests
    const putByFetch = async (url: string, bodyData: any) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const putOperations = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, putOperations)

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Generic function for delete requests
    const deleteByFetch = async (url: string) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const deleteOperation = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, deleteOperation)

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    //USER

    const getAllUsers = async () => {
        const data = await getByFetch('GetAllUsers')
        return data
    }

    const getUser = async (id: string) => {
        const data = await getByFetch(`GetUser?id=${id}`)
        return data
    }

    const addUser = async (
        user: Omit<User, 'id' | 'status' | 'userRole' | 'createdDate' | 'updatedDate'>
    ): Promise<Response> => {
        return await postByFetch('AddUser', {
            ...user,
        })
    }

    const updateUser = async (
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        userRoleId: string,
        status: string
    ) => {
        return postByFetch('UpdateUser', {
            id: id,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userRoleId: userRoleId,
            status: status,
        })
    }

    const softDeleteUser = (id: string) => {
        return deleteByFetch(`SoftDeleteUser?=${id}`)
    }

    const hardDeleteUser = (id: string) => {
        return deleteByFetch(`HardDeleteUser?=${id}`)
    }

    // USER ROLE

    const getAllUserRoles = async (): Promise<UserRole[]> => {
        const data = await getByFetch('GetAllUsers')
        return data
    }

    const getUserRole = async (id: string): Promise<UserRole> => {
        const data = await getByFetch(`GetUser?id=${id}`)
        return data
    }

    const addUserRole = async (userRole: Pick<UserRole, 'name'>): Promise<void> => {
        await postByFetch('AddUserRole', {
            userRole,
        })
    }
    const updateUserRole = async (id: string, name: string): Promise<Response> => {
        return await postByFetch('UpdateUserRole', {
            id: id,
            name: name,
        })
    }

    const deleteUserRole = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUserRole?id=${id}`)
    }

    return {
        getAllUsers,
        getUser,
        addUser,
        updateUser,
        softDeleteUser,
        hardDeleteUser,
        getAllUserRoles,
        getUserRole,
        addUserRole,
        updateUserRole,
        deleteUserRole,
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
