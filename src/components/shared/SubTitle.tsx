import React from 'react'
import { Heading } from 'rebass'

const SubTitle = (props: any) =>
    <Heading
        {...props}
        children={'This is a subtitle'}
        sx={{ fontFamily: 'Roboto Mono, monospace' }}
        fontSize={[2, 3, 4]} />

export default SubTitle