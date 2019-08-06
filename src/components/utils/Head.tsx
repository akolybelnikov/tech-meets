import React from 'react'
import { Helmet } from "react-helmet"

const Head: React.FC = (props: any) => (
    <Helmet {...props}>
        <link
            href="https://fonts.googleapis.com/css?family=Lato:400,500,700|Roboto+Mono:400,500,700&display=swap"
            rel="stylesheet"
        />
    </Helmet>
)

export default Head