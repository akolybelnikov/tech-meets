import React from 'react'
import { Text as RebassText } from 'rebass'
import { withTheme } from 'styled-components';

const Text = (props: any) =>
    <RebassText
        {...props}
        sx={{ fontFamily: 'Lato, sans-serif' }}
        fontSize={[1]} />

export default withTheme(Text)