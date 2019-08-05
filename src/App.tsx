import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import logo from './logo.svg';
import './App.scss';
import styled, { ThemeProvider } from 'styled-components';
import { AppTheme } from './theme';
import { useAsyncEffect } from './hooks/asyncEffect';
import Posts from './components/PostItem';
import { Post } from './models/Post';

const Root = styled.div`
  text-align: center;
`
const Header = styled.header`
  color: ${props => props.theme.colors.main}
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

const App: React.FC = () => {
  const [posts, setData] = useState<Post[]>([])

  useAsyncEffect(async () => {
    const { data }: AxiosResponse = await axios('http://localhost:3001/posts')

    setData(data)
  })

  return (
    <ThemeProvider theme={AppTheme}>
      <Root>
        <Header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <Posts posts={posts} />
        </Header>
      </Root>
    </ThemeProvider>
  );
}

export default App;
