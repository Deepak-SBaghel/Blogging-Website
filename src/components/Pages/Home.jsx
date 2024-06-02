import React, { useEffect, useState } from "react";
import appwriteservice from "../../appwrite/config";
import { Container, PostCard } from "../index";
function Home() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    appwriteservice.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 test-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="test-2xl font-bold hover:text-gray-500">
                No Post written
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-3 w-1/4">
              {/* <PostCard post={post} /> */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
