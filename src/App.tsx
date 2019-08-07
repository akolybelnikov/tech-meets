import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Events from './components/events/Events';
import Header from './components/layout/Header';
import Button from './components/shared/Buttons';
import { Container } from './components/shared/Container';
import Head from './components/utils/Head';
import { AppTheme } from './theme';

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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Container p={3}>
        <Head />
        <GlobalStyle />
        <Header />
        <Container px={5}>
          <Button variant='secondary'>Events</Button>
          <Events />
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App;
