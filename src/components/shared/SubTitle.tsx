import React from 'react'
import { Heading } from 'rebass'

const SubTitle = (props: any) =>
    <Heading
        {...props}
        sx={{ fontFamily: 'Roboto Mono, monospace' }}
        fontSize={[2, 3]} />

export default SubTitle