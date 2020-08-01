import { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';

const Btn = styled.button`
  margin: 5% auto;
  display: block;
  text-transform: uppercase;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  padding: 1rem;
  background: ${(props) => props.background};
`;

const Input = styled.input`
  width: 500px;
  border-radius: 10px;
  border: 0;
  padding: 2%;
  margin: 2%;
`;

const TextArea = styled.textarea`
  width: 500px;
  border-radius: 10px;
  border: 0;
  padding: 2%;
  margin: 2%;
`;

export default function Post() {
  const [title, changeTitle] = useState('');
  const [text, changeText] = useState('');

  const sendPost = () => {
    axios({
      method: 'post',
      url: 'https://simple-blog-api.crew.red/posts',
      data: {
        id: +new Date(),
        title: title,
        body: text,
      },
    });
    Router.push('/');
  };

  return (
    <div>
      <Head>
        <title>create post</title>
      </Head>
      <Btn background="#" onClick={() => Router.push('/')}>
        Go back
      </Btn>
      <form>
        <label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => changeTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          <TextArea
            name="body"
            placeholder="Text"
            value={text}
            onChange={(e) => changeText(e.target.value)}
          />
        </label>
        <br />
      </form>
      <Btn background="#4CAF50" onClick={() => sendPost()}>
        Send
      </Btn>
    </div>
  );
}
