import { Chip } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const FooterContainer = styled.div`
    width: 100%;
    min-height: 64px;
    position: fixed;
    bottom: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-sizing: border-box;
    background: ${COLORS.secondary};
`

export const FooterContainerHook = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    min-height: 64px;
    box-sizing: border-box;
    background: ${COLORS.secondary};
`

export const SideMenu = styled.div`
    width: 100%;
    min-height: 80vh;
    position: sticky;
    right: 0;
    display: grid;
    column-gap: 24px;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    box-sizing: border-box;
    background: ${COLORS.secondary};
`

export const ImageContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    border-bottom: none;
    text-decoration: none;
    color: ${COLORS.white};
`

export const ImageContainerActive = styled.div`
    margin: 0 auto;
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    border-bottom: none;
    text-decoration: none;
`

export const StyledTab = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: none;
    text-decoration: none;
    color: ${COLORS.white};
`

export const NavigationMainWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-bottom: none;
    text-decoration: none;
    color: ${COLORS.white};
`
export const StyledList = styled.div`
    display: flex;
`

export const StyledChip = styled(Chip)`
    margin-left: 0.2rem;
    padding: 0 8px;
    height: 20px;
    position: fixed;
    border-radius: 18px;
    color: ${COLORS.white};
`

export const BtnWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    justify-content: space-evenly;
`
