import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Box } from 'rebass'

import Head from './components/utils/Head'
import Events from './components/events/Events'
import { AppTheme } from './theme'
import Logo from './components/shared/Logo'
import Title from './components/shared/Title'
import SubTitle from './components/shared/SubTitle'
import Button from './components/shared/Buttons'

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    overflow-x: hidden;
  }
  body {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => (props.theme.colors.background)};
    color: ${props => (props.theme.colors.black)};
  }
  h1,h2,h3,h4,h5 {
    font-family: 'Roboto', monospace;
  }
`

const Root = (props: any) => <Box {...props} sx={{}} />


const Header = styled.header`
  color: ${props => props.theme.colors.black}
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

const App: React.FC = () => {


  return (
    <ThemeProvider theme={AppTheme}>
      <Root>
        <Head />
        <GlobalStyle />
        <Header>
          <Logo />
          <Title />
          <SubTitle />
        </Header>
        <Box>
          <Button variant='secondary'>Events</Button>
          <Events />
        </Box>
      </Root>
    </ThemeProvider>
  )
}

export default App;
