import { Snackbar, Typography } from '@equinor/eds-core-react'
import { useContext } from 'react'
import UmAppContext from '../contexts/UmAppContext'
import styled from 'styled-components'

const SnackbarComponent = () => {
    const { isSnackbarOpen, snackbarText, closeSnackbar } = useContext(UmAppContext)

    return (
        <CustomSnackbar
            autoHideDuration={3000}
            onClose={() => {
                closeSnackbar()
            }}
            open={isSnackbarOpen}
        >
            {snackbarText}
        </CustomSnackbar>
    )
}

export default SnackbarComponent

const CustomSnackbar = styled(Snackbar)`
    top: 80%;
    height: 40px;
`
