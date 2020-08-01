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

const Delete = styled.button`
  float: right;
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
  };

  return (
    <Card>
      <Head>
        <title>test_task</title>
      </Head>
      <Delete onClick={() => deleteItem()}>X</Delete>
      <h2>{post.title}</h2>
      <p>{post.body} </p>
      <p>Comments:</p>
      {post.comments.map((item) => (
        <p key={item.id}>{item.body} </p>
      ))}
      <input type="text" onChange={(e) => changeComment(e.target.value)} />
      <button onClick={() => sendComment()}>Send</button>
      <hr />
      <button onClick={() => Router.push(`/`)}>go home</button>
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
