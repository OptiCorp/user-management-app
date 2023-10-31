import { createGlobalStyle } from 'styled-components'

export const COLORS = {
    white: '#FFF',
    black: '#000',
    gray: '#BEBEBE',
    lightGray: '#CCC',
    silverGray: '#DCDCDC',
    paleGray: '#EAEAEA',
    frostyGray: '#F0F3F3',
    lightSteelBlue: '#DEEDEE',
    primary: '#007079',
    secondary: '#243746',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
    whiteSmoke: '#f5f5f5',
}

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0 auto;
        max-width: 768px;
        font-family: equinor;
    }
`

export default GlobalStyles
