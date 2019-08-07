import React from 'react'
import { Heading } from 'rebass'

const SubTitle = (props: any) =>
    <Heading
        {...props}
        sx={{ fontFamily: 'Roboto Mono, monospace' }}
        fontSize={[1, 2]} />

export default SubTitle