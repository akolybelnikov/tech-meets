import React from 'react';
import { Flex } from 'rebass';
import { withTheme } from 'styled-components';

const FlexRow = (props: any) => <Flex
    {...props}
    p={[1, 2]}
    sx={{ justifyContent: ['flex-end', 'space-between'], flexWrap: 'wrap' }} />

export default withTheme(FlexRow)