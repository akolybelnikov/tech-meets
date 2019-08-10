import { Form, FormApi, Text as Input, useFormApi, useFormState } from 'informed';
import React from 'react';
import searchEvents from '../../helpers/fuse-search';
import { TechEvent } from '../../models/Event';
import { AppTheme } from '../../theme';
import Box from "../shared/Box";
import Button from '../shared/Buttons';
import Flex from '../shared/Flex';

const Search = (
    { events, setEvents, setView, setTerm }:
        { events: any[], setEvents: Function, setView: Function, setTerm: Function }
) => {
    const formApi = useFormApi<FormApi>();
    const { values: field } = useFormState()

    const onChange = () => {
        if (field.term) {
            const results: TechEvent[] = searchEvents(field.term, events)
            setEvents(results)
            setView(true)
            setTerm(field.term)
        }
    }

    const onClearInput = () => {
        formApi.reset()
        setEvents(events)
        setView(false)
        setTerm(null)
    }

    return (
        <Flex>
            <Input
                field="term"
                style={{
                    border: `2px solid ${AppTheme.colors.darkGreen}`,
                    padding: '.5rem', minWidth: '14rem'
                }}
                onChange={onChange}
                placeholder="Search events by name / city" />
            <Button
                ml={[2]}
                py={[1]}
                variant="secondary"
                sx={{ borderRadius: 9999 }}
                onClick={onClearInput}>
                clear
                </Button>
        </Flex>
    )
}

const SearchForm = (
    { events, setEvents, setView, setSearchTerm }:
        { events: TechEvent[], setEvents: Function, setView: Function, setSearchTerm: Function }
) => {

    return (
        <Box pb={[3, 0]}>
            <Form>
                <Search
                    events={events.slice()}
                    setEvents={setEvents}
                    setView={setView}
                    setTerm={setSearchTerm} />
            </Form>
        </Box>
    )
}


export default SearchForm