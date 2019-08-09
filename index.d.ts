import 'styled-components'
import AppTheme from './src/theme'
import { background } from 'styled-system'

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
      backgroundGrey: string
      black: string
      grey: string
    }
    buttons: {
      primary: {
        color: string
        backgroundColor: string
        cursor: string
        border: string
        borderRadius: number
        '&:hover': object
      }
      primaryInverted: {
        color: string
        backgroundColor: string
        cursor: string
        border: string
        borderRadius: number
        fontWeight: number
        '&:hover': object
        minWidth: string
      }
      secondary: {
        color: string
        backgroundColor: string
        cursor: string
        border: string
        borderRadius: number
        '&:hover': object
      }
      secondaryInverted: {
        color: string
        backgroundColor: string
        cursor: string
        border: string
        borderRadius: number
        '&:hover': object
      }
      warningInverted: {
        color: string
        backgroundColor: string
        cursor: string
        border: string
        borderRadius: number
        '&:hover': object
      }
    }
  }
}
