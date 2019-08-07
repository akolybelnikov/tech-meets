import React, { useState } from 'react'
import { Flex as RebassFlex } from 'rebass'
import styled, { withTheme } from 'styled-components'

import Logo from '../shared/Logo'
import SubTitle from '../shared/SubTitle'

const Flex = (props: any) => (
    <RebassFlex {...props} />
)

const Button = styled(SubTitle)`
    cursor: pointer;
`

const Header = (props: any) => {
    const [active, setState] = useState(false)

    const setActive = () => {}

    return (
        <Flex py={3}>
        <Flex sx={{ justifyContent: 'center', flex: ['15%'] }}>
            <Logo />
        </Flex>
        <Flex sx={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: props.theme.colors.orange,
            flex: ['85%']
        }}>
            <Button px={3}>All Events</Button>
            <Button px={3}>My Events</Button>
        </Flex>
    </Flex >
    )
}
    

export default withTheme(Header)