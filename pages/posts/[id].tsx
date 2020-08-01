import Router from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import { useState, FC } from 'react';

import { MyPost } from '../../interfaces/posts';
import { NextPageContext } from 'next';

const Card = styled.div`
  width: 1100px;
  background-color: #000;
  color: #fff;
  text-align: center;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Btn = styled.button`
  float: ${(props) => props.float};
  background-color: ${(props) => props.background || 'none'};
  border: none;
  color: #fff;
  text-align: center;
  margin: 1%;
  padding: 1%;
  border-radius: 5px;
`;

interface PostProps {
  post: MyPost;
}

export default function Post({ post }: PostProps) {
  const [comment, changeComment] = useState('');

  const deleteItem = () => {
    axios({
      method: 'delete',
      url: `https://simple-blog-api.crew.red/posts/${post.id}`,
    });
    Router.push('/');
  };

  const sendComment = () => {
    axios({
      method: 'post',
      url: `https://simple-blog-api.crew.red/comments`,
      data: {
        postId: post.id,
        body: comment,
        id: +new Date(),
      },
    });
    Router.push('/');
  };

  return (
    <Card>
      <Head>
        <title>test_task</title>
      </Head>
      <Btn background="#6B2634" float="right" onClick={() => deleteItem()}>
        X
      </Btn>
      <h2>{post.title}</h2>
      <p>{post.body} </p>
      <p>Comments:</p>
      {post.comments.map((item) => (
        <p key={item.id}>{item.body} </p>
      ))}
      {post.comments.length ? '' : <mark>nothing</mark>}
      <hr />
      <input
        type="text"
        placeholder="comment"
        onChange={(e) => changeComment(e.target.value)}
      />
      <Btn background="#00385C" onClick={() => sendComment()}>
        Send
      </Btn>
      <hr />
      <Btn background="#305E99" onClick={() => Router.push(`/`)}>
        go home
      </Btn>
    </Card>
  );
}

Post.getInitialProps = async (ctx: NextPageContext) => {
  const res = await axios.get(
    `https://simple-blog-api.crew.red/posts/${ctx.query.id}?_embed=comments`,
  );
  return {
    post: res.data,
  };
};
