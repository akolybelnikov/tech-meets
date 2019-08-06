import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Helmet } from "react-helmet"
import { Box } from 'rebass'

import Events from './components/events/Events'
import { AppTheme } from './theme'
import Logo from './components/shared/Logo'
import Title from './components/shared/Title'
import SubTitle from './components/shared/SubTitle'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => (props.theme.colors.background)};
    color: ${props => (props.theme.colors.black)};
  }
`

const Root = (props: any) => <Box {...props} sx={{}} />


const Header = styled.header`
  color: ${props => props.theme.colors.black}
  // background-color: #282c34;
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
        <GlobalStyle />
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700|Roboto+Mono:400,500,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Header className="App-header">
          <Logo />
          <Title />
          <SubTitle />
        </Header>
        <Box>
          <Events />
        </Box>
      </Root>
    </ThemeProvider>
  )
}

export default App;
