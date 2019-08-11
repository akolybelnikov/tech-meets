import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Events from './components/events/Events';
import Filters from './components/filters/Filters';
import Container from './components/shared/Container';
import Head from './components/utils/Head';
import applyFilters from './helpers/apply-filters';
import { City } from './models/City';
import { TechEvent } from './models/Event';
import { $filteredEvents, $filters, filtersService } from './services/filters.service';
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
  const [searchView, setView] = useState<boolean>(false)
  const [filteredEvents, setFilteredEvents] = useState<TechEvent[]>([])

  useEffect(() => {
    async function fetchData() {
      const cities: AxiosResponse = await axios('http://localhost:3001/cities')
      setCities(cities.data)

      const events: AxiosResponse = await axios('http://localhost:3001/events')
      setEvents(events.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))

      const user: AxiosResponse = await axios('http://localhost:3001/user')
      setUserEvents(user.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))

      setFilteredEvents(events.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      ))
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filtersSubscription: Subscription = $filteredEvents.subscribe(
      curr => setFilteredEvents(curr)
    )

    return () => {
      filtersSubscription.unsubscribe()
    }
  }, [])

  const fetchUserEvents = async () => {
    const user: AxiosResponse = await axios('http://localhost:3001/user')
      const sorted = user.data.sort(
        (a: TechEvent, b: TechEvent) => (a.startDate > b.startDate) ? 1 : -1
      )
      setUserEvents(sorted)
      setView(false)

      const filtersSubscription: Subscription = $filters.subscribe((curr) => {
        let filteredEvents: TechEvent[]
        if (curr.view === 'my') {
          filteredEvents = applyFilters(sorted, curr)
          filtersService.setEvents(filteredEvents)
        }
      })

      filtersSubscription.unsubscribe()
  }

  const leaveEvent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`)   
      fetchUserEvents()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ThemeProvider theme={AppTheme}>
      <Container>
        <Head />
        <GlobalStyle />
        <Container sx={{ margin: '0 auto' }} px={[2, 3]} pt={['5.5rem', 6]} width={['100%', '95%', '760px']}>
          <Filters
            events={events}
            userEvents={userEvents}
            setView={setView}
          />
        </Container>
        <Container sx={{ margin: '0 auto' }} px={[1, 2, 3]} py={[1]} width={['100%', '95%', '760px']}>
          <Events
            searchView={searchView}
            events={filteredEvents}
            cities={cities}
            userEvents={userEvents}
            fetchUserEvents={fetchUserEvents}
            leaveEvent={leaveEvent} />
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App;
