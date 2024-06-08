import React, { useEffect, useState } from "react";
import appwriteservice from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteservice.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = (post) =>
    post && userData ? post.userId === userData.$id : false;

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {userData ? (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Empty : No Article Published
                </h1>
              ) : (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-2xl font-bold pb-3">Your Posts</h1>
        <div className="flex flex-wrap">
          {posts.map((post) =>
            isAuthor(post) ? (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
