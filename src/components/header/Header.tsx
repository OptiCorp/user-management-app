import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import apiService from '../../services/api'
import { COLORS } from '../../style/GlobalStyles'
import Sidebar from '../sidebar/Sidebar'
import { HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const navigate = useNavigate()
    const [activeUrl, setActiveUrl] = useState<string>('')
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const api = apiService()

    const [title, setTitle] = useState('')
    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [location])

    const useBasePath = () => {
        const params = useParams<Record<string, string>>()

        return Object.values(params).reduce(
            (path, param) => path?.replace('/' + param, ''),
            location.pathname.slice(1)
        )
    }
    const basePath = useBasePath()
    /* const { id, workflowId, taskId, punchId } = useParams() as {
        id: string
        taskId: string
        workflowId: string
        punchId: string
    } */

    /* useEffect(() => {
        let pathTitle = ''

        if (location.pathname.includes('FillOutCheckList')) {
            pathTitle =
                workflow?.checklist.title + ' ' + workflow?.id.slice(10, -18) ||
                ''
        } else if (location.pathname === '/AddUser/') {
            pathTitle = 'Add user'
        } else if (location.pathname === '/ListUsers/') {
            pathTitle = 'List of users'
        } else if (location.pathname.includes('PreviewCheckList')) {
            pathTitle = checklist?.title || ''
        } else if (location.pathname.includes('ForReviewChecklists')) {
            pathTitle = 'For review'
        } else if (location.pathname.includes('EditCheckList')) {
            pathTitle = 'Edit' + ' ' + checklist?.title || ''
        } else if (location.pathname === '/SendCheckList/') {
            pathTitle = 'Send checklist' || ''
        } else if (location.pathname === `/SendChecklist/${id}`) {
            pathTitle = 'Send' + ' ' + checklist?.title || ''
        } else if (
            location.pathname === `/workflow/${workflowId}/punch/${punchId}`
        ) {
            pathTitle =
                (workflow?.checklist.title || '') +
                ' ' +
                ' Punch ' +
                punchId.slice(0, -28)
        } else if (location.pathname.includes(workflowId && taskId)) {
            pathTitle = 'Create punch'
        } else if (location.pathname.includes('Checklists')) {
            pathTitle = `${
                isLeader ? 'Checklists in progress' : 'Outgoing checklists'
            }`
        } else if (location.pathname.includes('MyCheckLists')) {
            pathTitle = `${
                isLeader ? 'Checklists templates' : 'Incomming checklists'
            }`
        } else {
            pathTitle =
                basePath?.match(/[A-Z][a-z]+|[0-9]+/g)?.join('') ||
                basePath ||
                ''
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, workflow, checklist]) */

    const onClick = () => {
        navigate(-1)
    }

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />
            <NewTopBar>
                <TopBar.Header>
                    {activeUrl === '/' ? null : (
                        <Icon data={arrow_back_ios} color={COLORS.white} onClick={onClick} />
                    )}
                </TopBar.Header>
                <TopBar.CustomContent>
                    <HeaderLocation>{title}</HeaderLocation>
                </TopBar.CustomContent>
                <TopBar.Actions>
                    <Icon
                        data={menu}
                        size={40}
                        style={{
                            color: COLORS.white,
                        }}
                        onClick={() => setOpen(!open)}
                    />
                </TopBar.Actions>
            </NewTopBar>
        </>
    )
}
