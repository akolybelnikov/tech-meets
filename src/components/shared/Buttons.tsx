import React from 'react'
import { withTheme } from 'styled-components'
import { Button as RebassButton } from 'rebass'

const Button = (props: any) => {

    return <RebassButton sx={{ fontFamily: 'Lato, sans-serif' }} {...props} />
}

export default withTheme(Button)