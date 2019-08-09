import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Events from './components/events/Events';
import Search from './components/filters/Search';
import Header from './components/layout/Header';
import Container from './components/shared/Container';
import Head from './components/utils/Head';
import { City } from './models/City';
import { TechEvent } from './models/Event';
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
    background: ${props => (props.theme.colors.backgroundGrey)};
    color: ${props => (props.theme.colors.black)};
  }
  h1,h2,h3,h4,h5 {
    font-family: 'Roboto', monospace;
  }
`

const App: React.FC = () => {
  const [events, setEvents] = useState<TechEvent[]>([])
  const [userEvents, setUserEvents] = useState<TechEvent[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [subset, setSubset] = useState<string>('all')
  const [renderedEvents, setRenderedEvents] = useState<TechEvent[]>([])
  const [searchView, setView] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      const cities: AxiosResponse = await axios('http://localhost:3001/cities')
      setCities(cities.data)

      const result: AxiosResponse = await axios('http://localhost:3001/events')
      setEvents(result.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))

      const userResult: AxiosResponse = await axios('http://localhost:3001/user')
      setUserEvents(userResult.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))

      setRenderedEvents(result.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))
    }

    fetchData()
  }, [])

  const reFetchUserEvents = async () => {
    const userResult: AxiosResponse = await axios('http://localhost:3001/user')
    const sorted = userResult.data.sort(
      (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
    )
    setUserEvents(sorted)
    if (subset === 'my') {
      setRenderedEvents(sorted)
    }
  }

  const setCurrentSubset = (subset: string) => {
    setSubset(subset)
    subset === 'all' ? setRenderedEvents(events) : setRenderedEvents(userEvents)
  }

  return (
    <ThemeProvider theme={AppTheme}>
      <Container>
        <Head />
        <GlobalStyle />
        <Header active={subset} setSubset={setCurrentSubset} setView={setView} />
        <Container sx={{ margin: '0 auto' }} px={[1, 2, 3]} py={[5, 6]} width={['100%', '95%', '760px']}>
          <Search
            events={subset === 'all' ? events : userEvents}
            cities={cities}
            setEvents={setRenderedEvents}
            setView={setView} />
          <Events
            searchView={searchView}
            events={renderedEvents}
            cities={cities}
            userEvents={userEvents}
            fetchUserEvents={reFetchUserEvents} />
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App;
