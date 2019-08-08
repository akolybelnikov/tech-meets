import React from 'react';
import { Flex as RebassFlex } from 'rebass';
import { withTheme } from 'styled-components';

const Flex = (props: any) => <RebassFlex {...props} />

export default withTheme(Flex)