import { Icon, Typography } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import { ImageContainerActive } from './style'
import { COLORS } from '../../style/GlobalStyles'

export const NavItem = ({ name, icon, to }: { name?: string; icon: IconData; to: string }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <ImageContainerActive>
                <Icon data={icon} size={24} color={COLORS.white} />
                <Typography variant="caption" color={COLORS.white}>
                    {name}
                </Typography>
            </ImageContainerActive>
        </Link>
    )
}
