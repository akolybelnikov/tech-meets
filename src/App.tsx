import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Events from './components/events/Events';
import Search from './components/filters/Search';
import Switch from './components/filters/Switch';
import Header from './components/layout/Header';
import Container from './components/shared/Container';
import Flex from './components/shared/Flex';
import Head from './components/utils/Head';
import { City } from './models/City';
import { TechEvent } from './models/Event';
import { AppTheme } from './theme';
import searchEvents from './helpers/fuse-search';

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
  const [onlyFree, setOnlyFree] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

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
    if (subset === 'my' && sorted.length) {
      if (onlyFree) {
        const freeSorted = sorted.filter((event: TechEvent) => event.isFree)
        if (freeSorted.length) {
          setRenderedEvents(freeSorted)
        } else {
          setRenderedEvents(events.filter((event: TechEvent) => event.isFree))
          setSubset('all')
        }
      } else {
        setRenderedEvents(sorted)
      }
    } else {
      setRenderedEvents(events)
      setSubset('all')
    }
  }

  const setCurrentSubset = (subset: string) => {
    setSubset(subset)
    if (subset === 'all') {
      if (searchTerm) {
        const searchedEvents = searchEvents(searchTerm, events)
        if (onlyFree) {
          setRenderedEvents(searchedEvents.filter((event: TechEvent) => event.isFree))
        } else {
          setRenderedEvents(searchedEvents)
        }
      } else {
        if (onlyFree) {
          setRenderedEvents(events.filter((event: TechEvent) => event.isFree))
        } else {
          setRenderedEvents(events)
        }
      }

    } else {
      if (searchTerm) {
        const searchedEvents = searchEvents(searchTerm, userEvents)
        if (onlyFree) {
          setRenderedEvents(searchedEvents.filter((event: TechEvent) => event.isFree))
        } else {
          setRenderedEvents(searchedEvents)
        }
      } else {
        if (onlyFree) {
          setRenderedEvents(userEvents.filter((event: TechEvent) => event.isFree))
        } else {
          setRenderedEvents(userEvents)
        }
      }
    }
  }

  const setFilteredEvents = (onlyFree: boolean) => {
    setOnlyFree(onlyFree)

    if (onlyFree) {
      if (subset === 'my' && userEvents.length) {
        setRenderedEvents(userEvents.filter((event: TechEvent) => event.isFree))
      } else {
        setRenderedEvents(events.filter((event: TechEvent) => event.isFree))
        setSubset('all')
      }

    } else {
      if (subset === 'my' && userEvents.length) {
        setRenderedEvents(userEvents)
      } else {
        setRenderedEvents(events)
        setSubset('all')
      }
    }
  }

  return (
    <ThemeProvider theme={AppTheme}>
      <Container>
        <Head />
        <GlobalStyle />
        <Header active={subset} setSubset={setCurrentSubset} setView={setView} />
        <Container sx={{ margin: '0 auto' }} px={[1, 2, 3]} py={[6]} width={['100%', '95%', '760px']}>
          <Flex px={[2]} sx={{ alignItems: ['flex-start', 'center'], justifyContent: ['space-around'], flexDirection: ['column', 'row'] }}>
            <Search
              events={subset === 'all' ? events : userEvents}
              setEvents={setRenderedEvents}
              setView={setView}
              setSearchTerm={setSearchTerm} />
            <Switch filterEvents={setFilteredEvents} />
          </Flex>
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
