import { Form, FormApi, Text as Input, useFormApi, useFormState } from 'informed';
import React, { forwardRef, MutableRefObject, useImperativeHandle, useRef } from 'react';
import { filtersService } from '../../services/filters.service';
import { AppTheme } from '../../theme';
import Box from "../shared/Box";
import Button from '../shared/Buttons';
import Flex from '../shared/Flex';

const Search = forwardRef(({ setEvents }: { setEvents: Function }, ref) => {
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

    useImperativeHandle(ref, () => ({
        reset() {
            onClearInput()
        }
    }))

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
})

const SearchForm = forwardRef(({ setEvents }: { setEvents: Function }, ref) => {
    const inputRef: MutableRefObject<any> = useRef()

    useImperativeHandle(ref, () => ({
        reset() {
            inputRef.current.reset()
        }
    }))

    return (<Box pb={[3, 0]}>
        <Form>
            <Search ref={inputRef} setEvents={setEvents} />
        </Form>
    </Box>)
})


export default SearchForm