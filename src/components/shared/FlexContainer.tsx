import React from 'react';
import { Flex } from 'rebass';
import { withTheme } from 'styled-components';

const FlexContainer = (props: any) => <Flex {...props} sx={{ flexDirection: 'column' }} />

export default withTheme(FlexContainer)