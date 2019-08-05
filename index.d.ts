import 'styled-components'
import AppTheme from './src/theme'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string
            secondary: string
        }
    }
}