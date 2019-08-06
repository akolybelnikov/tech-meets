import React from 'react'
import { Heading } from 'rebass'

const Title = (props: any) =>
    <Heading
        {...props}
        children={'This is a title'}
        sx={{ fontFamily: 'Roboto Mono, monospace' }}
        fontSize={[5, 6, 7]} />

export default Title