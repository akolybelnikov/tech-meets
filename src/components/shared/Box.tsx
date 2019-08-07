import React from 'react';
import { Box as RebassBox } from 'rebass';
import { withTheme } from 'styled-components';

const Box = (props: any) => <RebassBox {...props} />

export default withTheme(Box)