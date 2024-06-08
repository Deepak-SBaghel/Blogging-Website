import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  // id is writen as $id in appwrite
  return (
    // with link the whole card is clickable
    // to takes the url of the card
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-conf1 rounded-xl p-4 border-solid  border-2 border-conf4 hover:border-dashed">
        <div className="w-full justify-center mb-4">
          {/* here the id of the image is featured image */}
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl "
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

// state and userdata is in redux
// where as , other data is in appwrite
