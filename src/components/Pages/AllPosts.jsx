import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../index";
function AllPosts() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="felx flex-wrap">
          {post.map((post) => (
            // we are not returning any thing , therefore we are using ()
            <div key={post.$id} className="p-2 w-1">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
// featured image
