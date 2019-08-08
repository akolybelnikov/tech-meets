import React from 'react';
import { Card as RebassCard, CardProps } from 'rebass';
import { withTheme } from 'styled-components';

const Card = (props: any) => <RebassCard {...props} />

export default withTheme(Card)