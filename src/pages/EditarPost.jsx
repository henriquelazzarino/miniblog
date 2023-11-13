import React, { useEffect, useState } from "react";
import { useAuthValue } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const EditarPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  console.log(post);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
    });

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    console.log(post);

    updateDocument(id, data);

    // redirect to home page
    navigate("/profile");
  };


  const label = "flex flex-col mb-4";
  const span = "mb-1.5 font-bold text-left";
  const input = "border-b border-gray-400 py-1 px-2 bg-transparent";

  return (
    <div className="text-center mt-8">
      <h1>Editar post</h1>
      <p className="text-zinc-400 m-3">
        Escreva sobre o que quiser e compartilhe memórias!
      </p>
      <form onSubmit={handleSubmit} className="max-w-[40%] my-0 mx-auto">
        <label className={label}>
          <span className={span}>Título:</span>
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Título do post"
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>URL da imagem:</span>
          <input
            type="text"
            name="image"
            value={image}
            required
            onChange={(e)=>setImage(e.target.value)}
            placeholder="URL da imagem"
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Conteúdo:</span>
          <textarea
            name="body"
            value={body}
            required
            onChange={(e)=>setBody(e.target.value)}
            placeholder="Conteúdo do post"
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Tags:</span>
          <input
            type="text"
            name="tags"
            value={tags}
            required
            onChange={(e)=>setTags(e.target.value)}
            placeholder="Tags do post, separadas por vírgula"
            className={input}
          />
        </label>
        <button className="btn" type="submit">
          Editar post
        </button>
        {formError && (
          <p className="mt-4 text-red-500 bg-red-200 border border-solid border-red-500 rounded-md p-1.5">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditarPost;
