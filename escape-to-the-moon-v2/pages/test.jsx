import React from 'react';
import { parse } from 'cookie';

function TestPage({ cookies }) {
  const { fname, userId } = cookies;

  return (
    <div>
      <h1>Test Page</h1>
      <p>Cookie Values:</p>
      <p>fname: {fname}</p>
      <p>userId: {userId}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || '');
  return {
    props: {
      cookies,
    },
  };
}

export default TestPage;
