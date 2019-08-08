import React from 'react'
import { Heading } from 'rebass'

const Title = (props: any) =>
    <Heading
        {...props}
        sx={{ fontFamily: 'Roboto Mono, monospace' }}
        fontSize={[2, 3, 4]} />

export default Title