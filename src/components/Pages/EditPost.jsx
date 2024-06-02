import React, { useEffect, useState } from "react";
import appwrteService from "../../appwrite/config";
import { Container, PostForm } from "../index";
import { useNavigate, useParams } from "react-router-dom";
function EditPost({ post }) {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // geting value from the url
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwrteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/all-posts");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
