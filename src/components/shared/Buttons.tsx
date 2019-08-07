import React from 'react'
import { withTheme } from 'styled-components'
import { Button as PrimaryButton } from 'rebass'

const Button = (props: any) => {

    return <PrimaryButton sx={{ fontFamily: 'Lato, sans-serif' }} {...props} />
}

export default withTheme(Button)