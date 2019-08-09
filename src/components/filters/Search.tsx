import Fuse, { FuseOptions, FuseResult } from "fuse.js";
import { Form, FormApi, Text as Input, useFormApi, useFormState } from 'informed';
import React from 'react';
import { City } from '../../models/City';
import { TechEvent } from '../../models/Event';
import { AppTheme } from '../../theme';
import Button from '../shared/Buttons';
import Flex from '../shared/Flex';
import { SwipeableListView } from "react-native";

const Search = ({ events, setEvents, setView }: { events: any[], setEvents: Function, setView: Function }) => {
    const formApi = useFormApi<FormApi>();
    const { values: field } = useFormState()

    const onChange = () => {
        let searchItems: TechEvent[] = []
        if (field.term) {
            const options: FuseOptions<any> = {
                shouldSort: true,
                includeMatches: true,
                threshold: 0.3,
                location: 0,
                distance: 1000,
                keys: ["name", "cityName"],
            }

            const fuse = new Fuse(events, options)
            const results: FuseResult<any>[] = fuse.search(field.term)

            if (results.length) {
                for (let result of results) {
                    if (result.matches.length) {
                        searchItems = [...searchItems, ...[result.item]]
                    }
                }
            }
            setEvents(searchItems)
            setView(true)
        }
    }

    const onClearInput = () => {
        formApi.reset()
        setEvents(events)
        setView(false)
    }

    return (
        <Flex pb={[2, 3, 4]}>
            <Input field="term" style={{ border: `2px solid ${AppTheme.colors.darkGreen}`, padding: '.5rem', minWidth: '10rem' }} onChange={onChange} placeholder="Search events by name or city" />
            <Button ml={[2]} py={[1]} variant="secondary" sx={{ borderRadius: 9999 }} onClick={onClearInput}>clear</Button>
        </Flex>
    )
}

const SearchForm = (
    { events, cities, setEvents, setView }: { events: TechEvent[], cities: City[], setEvents: Function, setView: Function }
) => {
    return (
        <Form>
            <Search events={events.slice()} setEvents={setEvents} setView={setView} />
        </Form>
    )
}


export default SearchForm