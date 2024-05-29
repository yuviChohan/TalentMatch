// pages/index.js
import React from 'react';
import butter from '../buttercms'; // Adjust the path if buttercms.js is in a different directory

const Home = ({ page }) => {
  return (
    <div>
      <h1>{page.data.fields.title}</h1>
      <p>{page.data.fields.body}</p>
    </div>
  );
};

export async function getStaticProps() {
  const response = await butter.page.retrieve('*', 'homepage');
  return {
    props: {
      page: response.data,
    },
  };
}

export default Home;
