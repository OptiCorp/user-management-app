import { Button, Chip, Dialog, Icon, Search, Table } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../../style/GlobalStyles'
import { close, edit, search } from '@equinor/eds-icons'
import styled from 'styled-components'
import { DefaultNavigation } from '../../components/navigation/DefaultNavigation'
import apiService from '../../services/api'
import React, { useEffect, useState } from 'react'
import { ApiStatus, User } from '../../services/apiTypes'
import { Loading } from '../../components/Loading'

const Users = () => {
    const navigate = useNavigate()
    const api = apiService()

    const [users, setUsers] = useState<User[]>()
    const [fetchUsersStatus, setFetchUsersStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const [searchText, setSearchText] = useState('')
    const [searchButtonClicked, setSearchButtonClicked] = useState(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    const editUser = (id: string) => {
        navigate(`EditUser/${id}`)
    }

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value)
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
    users?.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
            return -1
        }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
            return 1
        } else {
            return 0
        }
    })

    const filteredUsers = searchButtonClicked
        ? users?.filter(
              (user) =>
                  user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.username.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.userRole.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.status.toLowerCase().includes(searchText.toLowerCase())
          )
        : users

    return (
        <>
            <UserListItem>
                <TableWrapper>
                    <CustomTable>
                        <Table.Head sticky>
                            <Table.Row>
                                <Table.Cell>Name</Table.Cell>
                                <Table.Cell>Role</Table.Cell>
                                <Table.Cell>Status</Table.Cell>
                                <Table.Cell>
                                    <Icon
                                        onClick={() => {
                                            if (!searchText) setIsSearchModalOpen(true)
                                            if (searchText) setSearchText('')
                                        }}
                                        color={COLORS.primary}
                                        data={!searchText ? search : close}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {filteredUsers &&
                                filteredUsers.map((user) => {
                                    return (
                                        <Table.Row key={user.id} onClick={() => editUser(user.id)}>
                                            <Table.Cell>
                                                {user.firstName} {user.lastName}
                                            </Table.Cell>
                                            <Table.Cell>{user.userRole.name}</Table.Cell>
                                            <Table.Cell>
                                                {user.status === 'Active' && (
                                                    <Chip variant="active">{user.status}</Chip>
                                                )}
                                                {user.status === 'Disabled' && (
                                                    <Chip variant="default">Inactive</Chip>
                                                )}
                                                {user.status === 'Deleted' && (
                                                    <Chip variant="error">{user.status}</Chip>
                                                )}
                                            </Table.Cell>
                                            <CustomTableCell>
                                                <Icon
                                                    size={16}
                                                    color={COLORS.primary}
                                                    data={edit}
                                                />
                                            </CustomTableCell>
                                        </Table.Row>
                                    )
                                })}
                        </Table.Body>
                    </CustomTable>
                </TableWrapper>
                <CustomButton onClick={() => navigate('/AddUser')}>Add User</CustomButton>
            </UserListItem>
            <Dialog
                open={isSearchModalOpen}
                isDismissable
                onClose={() => setIsSearchModalOpen(false)}
            >
                <Dialog.Header>
                    <Dialog.Title>Search {searchText && `(${filteredUsers?.length})`}</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Search onChange={handleSearch} placeholder="Search for user.." />
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button
                        onClick={() => {
                            setIsSearchModalOpen(false)
                            setSearchText('')
                        }}
                        variant="ghost"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            setSearchButtonClicked(true)
                            setIsSearchModalOpen(false)
                        }}
                        disabled={searchText === ''}
                    >
                        Search
                    </Button>
                </Dialog.Actions>
            </Dialog>
            <>
                <DefaultNavigation />
            </>
        </>
    )
}
export default Users

const CustomTable = styled(Table)`
    width: 100%;
`

const UserListItem = styled.div`
    padding: 10px;
`

const TableWrapper = styled.div`
    margin-bottom: 10px;
    width: 100%;
    max-height: 82%;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-y: auto;
`
const CustomTableCell = styled(Table.Cell)`
    text-align: center;
`
const CustomButton = styled(Button)`
    width: 100%;
`
