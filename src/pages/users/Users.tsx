import { Chip, Icon, Table } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../../style/GlobalStyles'
import { edit } from '@equinor/eds-icons'
import styled from 'styled-components'
import { DefaultNavigation } from '../../components/navigation/DefaultNavigation'
import apiService from '../../services/api'
import { useEffect, useState } from 'react'
import { ApiStatus, User } from '../../services/apiTypes'
import { Loading } from '../../components/Loading'

const Users = () => {
    const navigate = useNavigate()
    const api = apiService()

    const [users, setUsers] = useState<User[]>()
    const [fetchUsersStatus, setFetchUsersStatus] = useState<ApiStatus>(ApiStatus.LOADING)

    const editUser = (id: string) => {
        navigate(`EditUser/${id}`)
    }

    useEffect(() => {
        ;(async () => {
            const usersFromApi = await api.getAllUsers()
            setUsers(usersFromApi)
            setFetchUsersStatus(ApiStatus.SUCCESS)
        })()
    }, [])

    if (fetchUsersStatus === ApiStatus.LOADING) {
        return <Loading text="Loading users .." />
    }

    // TODO: Make an error component?
    if (fetchUsersStatus === ApiStatus.ERROR) {
        return <>Error</>
    }

    return (
        <>
            <UserListItem>
                <TableWrapper>
                    <Table style={{ width: '100%' }}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell>Name</Table.Cell>
                                <Table.Cell>Role</Table.Cell>
                                <Table.Cell>Status</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {users &&
                                users.map((user) => (
                                    <Table.Row key={user.id} onClick={() => editUser(user.id)}>
                                        <Table.Cell>
                                            {user.firstName} {user.lastName}
                                        </Table.Cell>
                                        <Table.Cell>{user.userRole.name}</Table.Cell>
                                        <Table.Cell>
                                            {user.status === 'Active' && (
                                                <Chip variant="active">{user.status}</Chip>
                                            )}
                                            {user.status === 'Deleted' && (
                                                <Chip variant="error">{user.status}</Chip>
                                            )}
                                        </Table.Cell>
                                        <CustomTableCell>
                                            <Icon size={16} color={COLORS.primary} data={edit} />
                                        </CustomTableCell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </TableWrapper>
            </UserListItem>
            <>
                <DefaultNavigation hideNavbar={false} />
            </>
        </>
    )
}
export default Users

const UserListItem = styled.div`
    padding: 10px;
    background-color: ${COLORS.frostyGray};
`

const TableWrapper = styled.div`
    width: 100%;
    padding-bottom: 15%;
    text-overflow: ellipsis;
    overflow: hidden;
`
const CustomTableCell = styled(Table.Cell)`
    text-align: center;
`
