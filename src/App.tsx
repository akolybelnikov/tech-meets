import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Events from './components/events/Events';
import Header from './components/layout/Header';
import Container from './components/shared/Container';
import Head from './components/utils/Head';
import { Event } from './models/Event';
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
  const [events, setEventsData] = useState<Event[]>([])
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [subset, setSubset] = useState<string>('all')

  useEffect(() => {
    async function fetchAllEventsData() {
      const { data }: AxiosResponse = await axios('http://localhost:3001/events')
      setEventsData(data);
    }

    async function fetchMyEventsData() {
      const { data }: AxiosResponse = await axios('http://localhost:3001/user')
      setUserEvents(data)
    }

    fetchAllEventsData()
    fetchMyEventsData()
  }, [])

  return (
    <ThemeProvider theme={AppTheme}>
      <Container>
        <Head />
        <GlobalStyle />
        <Header setSubset={setSubset} />
        <Container sx={{ margin: '0 auto' }} p={[1, 2, 3]} width={['100%', '95%', '760px']}>
          <Events events={subset === 'all' ? events : userEvents} />
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App;
