import { useLoaderData} from "@remix-run/react";
import { getPosts } from "~/models/posts.server";
import ListadoPosts from "~/components/listado-posts";
export function meta() {
  return [{
    title: 'GuitarLa - Nuestro Blog',
    description: 'GuitarraLA, Blog de musica y venta de guitarras'
  }]
}

export async function loader() {
  const posts = await getPosts();
  return posts.data;
}
const Blog = () => {
  const posts = useLoaderData();

  return (
      <ListadoPosts
      posts={posts}
      />

  );
};

export default Blog;
