import { Button, Icon, Table } from '@equinor/eds-core-react'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '../../style/GlobalStyles'
import { edit } from '@equinor/eds-icons'
import styled from 'styled-components'

export const users = [
    {
        id: '1',
        username: 'ola.norman',
        firstName: 'Ola',
        lastName: 'Norman',
        email: 'ola.norman@test.no',
    },
    {
        id: '2',
        username: 'kari.norman',
        firstName: 'Kari',
        lastName: 'Norman',
        email: 'kari.norman@test.no',
    },
    {
        id: '3',
        username: 'kai.norman',
        firstName: 'Kai',
        lastName: 'Norman',
        email: 'kai.norman@test.no',
    },
]

const Users = () => {
    const navigate = useNavigate()

    const editUser = (id: string) => {
        navigate(`EditUser/${id}`)
    }
    return (
        <UserListItem>
            <TableWrapper>
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Email</Table.Cell>
                            <Table.Cell>
                                <Button as={Link} to="/AddUser">
                                    New User
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {users.map((user) => (
                            <Table.Row key={user.id} onClick={() => editUser(user.id)}>
                                <Table.Cell>
                                    {user.firstName} {user.lastName}
                                </Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <CustomTableCell>
                                    <Icon size={16} color={COLORS.primary} data={edit} />
                                </CustomTableCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </TableWrapper>
        </UserListItem>
    )
}
export default Users

const UserListItem = styled.div`
    /* margin-bottom: 80px; */
    min-width: 375px;
    padding: 10px;
    padding-top: 10px;
    background-color: ${COLORS.frostyGray};
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const TableWrapper = styled.div`
    width: 100%;
    padding-bottom: 15%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
const CustomTableCell = styled(Table.Cell)`
    text-align: center;
`
