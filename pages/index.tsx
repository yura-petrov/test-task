import Router from 'next/router';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import styled from 'styled-components';

import { fetchPosts } from '../store/actions/postsAction';
import { MyPost } from '../interfaces/posts';

const Card = styled.div`
  background-color: #000;
  color: #fff;
  text-align: center;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: skew(-5deg);
  }
`;

const CreateBtn = styled.button`
  margin: 5% auto;
  display: block;
  text-transform: uppercase;
  background: #60a3bc;
  border-radius: 10px;
  border: none;
  transition: all 0.4s ease 0s;
  font-size: 2rem;
  padding: 2rem;

  &:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
`;

interface PostsProps {
  posts: MyPost[];
}

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const { posts }: PostsProps = useSelector((state) => state.post);

  return (
    <div className="main">
      <Head>
        <title>test_task</title>
      </Head>
      <div>
        <CreateBtn onClick={() => Router.push(`/posts/new`)}>
          Create post
        </CreateBtn>
        {posts &&
          posts.reverse().map((post) => (
            <Card
              key={post.id}
              onClick={() => Router.push(`/posts/${post.id}`)}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </Card>
          ))}
      </div>
    </div>
  );
}
