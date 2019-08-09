import React, { useState } from 'react'
import { Flex as RebassFlex } from 'rebass'
import styled, { withTheme, DefaultTheme } from 'styled-components'

import Logo from '../shared/Logo'
import SubTitle from '../shared/SubTitle'

const Flex = (props: any) => (
    <RebassFlex {...props} />
)

const HeaderContainer = styled(Flex).attrs({})`
    background: #fff;
    box-shadow: 0 1px 5px ${props => props.theme.colors.orange};
    width: 100%;
    position: fixed;
`

const Button = styled(SubTitle)`
    cursor: pointer;
    font-weight: 500;
    opacity: 0.7;
    &.active {
        transition: all 100ms ease-out;
        font-weight: 700;
        border-bottom: 1px solid ${props => props.theme.colors.orange};
        opacity: 1;
    }
`

const Header = ({ theme, setSubset }: { theme: DefaultTheme, setSubset: Function }) => {
    const [active, setState] = useState('all')

    const setAllActive = () => {
        setState('all')
        setSubset('all')
    }
    const setMyActive = () => {
        setState('my')
        setSubset('my')
    }

    return (
        <HeaderContainer py={3}>
            <Flex sx={{ justifyContent: 'center', flex: ['15%'] }}>
                <Logo />
            </Flex>
            <Flex sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: theme.colors.orange,
                flex: ['85%']
            }}>
                <Button
                    className={active === 'all' ? 'active' : ''}
                    onClick={setAllActive}
                    mx={3}>All Events</Button>
                <Button
                    className={active === 'my' ? 'active' : ''}
                    onClick={setMyActive}
                    mx={3}>My Events</Button>
            </Flex>
        </HeaderContainer>
    )
}


export default withTheme(Header)