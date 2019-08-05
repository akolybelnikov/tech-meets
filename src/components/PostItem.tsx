import React from 'react';
import styled from 'styled-components';
import { Post } from '../models/Post';

const Item = styled.p`
    color: #fff;
`

export default ({ posts }: { posts: Post[] }) => {

    return (
        <React.Fragment>
            {
                posts && posts.map((post, idx) => (
                    <Item key={idx}>{post.id}</Item>

                ))
            }
        </React.Fragment>
    )
}