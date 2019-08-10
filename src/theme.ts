import { DefaultTheme } from 'styled-components'

const darkGreen = '#458314',
  lightGreen = '#A0C182',
  lightBlue = '#81BFD5',
  darkBlue = '#127FAB',
  red = '#C74B36',
  orange = '#F28E24',
  black = '#37454D',
  grey = '#9BA8A6',
  backgroundGrey = '#EBECED'

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
    backgroundGrey,
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
      minWidth: '7rem'
    },
    primaryInverted: {
      color: '#fff',
      backgroundColor: darkBlue,
      cursor: 'pointer',
      border: `2px solid ${darkBlue}`,
      borderRadius: 0,
      fontWeight: 700,
      '&:hover': {
        // color: darkBlue,
        // backgroundColor: 'transparent',
      },
      minWidth: '7rem'
    },
    primaryLight: {
      color: '#fff',
      backgroundColor: lightBlue,
      cursor: 'pointer',
      border: `2px solid ${lightBlue}`,
      borderRadius: 0,
      fontWeight: 700,
      '&:hover': {
        backgroundColor: darkBlue,
        border: `2px solid ${darkBlue}`,
      },
      '&:focus': {
        backgroundColor: darkBlue,
        border: `2px solid ${darkBlue}`,
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
    secondaryInverted: {
      color: '#fff',
      backgroundColor: darkGreen,
      cursor: 'pointer',
      border: `2px solid ${darkBlue}`,
      borderRadius: 0,
      '&:hover': {
        color: darkGreen,
        backgroundColor: 'transparent',
      },
    },
    warningInverted: {
      color: '#fff',
      backgroundColor: red,
      cursor: 'pointer',
      border: `2px solid ${red}`,
      borderRadius: 0,
      '&:hover': {
        // color: darkGreen,
        // backgroundColor: 'transparent',
      },
    }
  },
}

export { AppTheme }
