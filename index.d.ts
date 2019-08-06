import 'styled-components'
import AppTheme from './src/theme'
import { background } from 'styled-system';

declare module 'typography-theme-bootstrap'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            darkBlue: string
            lightBlue: string
            lightGreen: string
            darkGreen: string
            red: string
            orange: string
            background: string
            black: string
            grey: string
        }
    }
}