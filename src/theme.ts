import { DefaultTheme } from 'styled-components'

const darkGreen = '#458314',
  lightGreen = '#A0C182',
  lightBlue = '#81BFD5',
  darkBlue = '#127FAB',
  red = '#C74B36',
  orange = '#F28E24',
  black = '#37454D',
  grey = '#9BA8A6',
  background = '#EBECED'

const AppTheme: DefaultTheme = {
  colors: {
    darkGreen,
    lightGreen,
    lightBlue,
    darkBlue,
    red,
    orange,
    black,
    grey,
    background,
  },
  buttons: {
    primary: {
      color: darkBlue,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      border: `2px solid ${darkBlue}`,
      borderRadius: 0,
      '&:hover': {
        color: '#fff',
        backgroundColor: darkBlue,
      },
    },
    secondary: {
      color: darkGreen,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      border: `2px solid ${darkGreen}`,
      borderRadius: 0,
      '&:hover': {
        color: '#fff',
        backgroundColor: darkGreen,
      },
    },
  },
}

export { AppTheme }
