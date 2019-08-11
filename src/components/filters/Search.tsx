import { Form, FormApi, Text as Input, useFormApi, useFormState } from 'informed';
import React from 'react';
import { filtersService } from '../../services/filters.service';
import { AppTheme } from '../../theme';
import Box from "../shared/Box";
import Button from '../shared/Buttons';
import Flex from '../shared/Flex';

const Search = ({ setEvents }: { setEvents: Function }) => {
    const formApi = useFormApi<FormApi>()
    const { values: field } = useFormState()

    const handleInput = () => {
        filtersService.setSearchTerm(field.term)
        setEvents()
    }

    const onClearInput = () => {
        formApi.reset()
        filtersService.setSearchTerm('')
        setEvents()
    }

    return (
        <Flex>
            <Input
                field="term"
                style={{
                    border: `2px solid ${AppTheme.colors.darkGreen}`,
                    padding: '.5rem', minWidth: '14rem'
                }}
                onChange={handleInput}
                onBlur={handleInput}
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

const SearchForm = ({ setEvents }: { setEvents: Function }) => (<Box pb={[3, 0]}>
    <Form>
        <Search setEvents={setEvents} />
    </Form>
</Box>)


export default SearchForm