import React from 'react';
import { Box } from 'rebass';
import { withTheme } from 'styled-components';

const Divider = (props: any) =>
  <Box
    {...props}
    as='hr'
    sx={{
      bg: props.theme.colors.grey,
      border: 0,
      height: 1,
      maxWidth: '98%',
      margin: '0 auto'
    }}
  />

export default withTheme(Divider) 