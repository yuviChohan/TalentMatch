import axios from 'axios';

export async function getServerSideProps() {
  try {
    // Fetch data for different parts of the website
    const [pagesRes, postsRes, categoriesRes] = await Promise.all([
      axios.get('https://zelboller.com/talentmatch/wp-json/wp/v2/pages'),
      axios.get('https://zelboller.com/talentmatch/wp-json/wp/v2/posts'),
      axios.get('https://zelboller.com/talentmatch/wp-json/wp/v2/categories'),
    ]);

    const pages = pagesRes.data;
    const posts = postsRes.data;
    const categories = categoriesRes.data;

    return {
      props: {
        pages,
        posts,
        categories,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pages: [],
        posts: [],
        categories: [],
      },
    };
  }
}

export default function Home({ pages, posts, categories }) {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      
      <h2>Pages</h2>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <a href={page.link}>{page.title.rendered}</a>
          </li>
        ))}
      </ul>

      <h2>Latest Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={post.link}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>

      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key
