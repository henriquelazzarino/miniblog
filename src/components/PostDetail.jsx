import React from "react";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className="mb-10 ">
      <img src={post.image} alt={post.title} className="w-96 mx-auto"/>
      <h2 className="mb-0.25 mt-1 font-bold text-3xl">{post.title}</h2>
      <p className=" mb-2 italic text-stone-700 text-sm">{post.createdBy}</p>
      <div className="mb-5 flex">
        {post.tags.map((tag) => (
          <p key={tag} className="m-1">
            <span className="font-bold">#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn outline">
        Ver mais
      </Link>
    </div>
  );
};

export default PostDetail;
