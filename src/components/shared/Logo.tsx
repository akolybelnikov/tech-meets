import React from 'react'
import styled, { keyframes } from 'styled-components'

import logo from '../../logo.svg'
import { Image } from 'rebass';

const rotate = keyframes`
  from {
    transform: rotateY(0);
  }

  to {
    transform: rotateY(-360deg);
  }
`;

const AppLogo = styled(Image)`
    animation: ${rotate} infinite 5s linear;
    pointer-events: none;
`

const Logo = (props: any) => <AppLogo src={logo} {...props} sx={{ height: '40vmin' }} alt="logo" />

export default Logo