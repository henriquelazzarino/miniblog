import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import PostDetail from "../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts");

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (query) {
      return nav(`/search?q=${query}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-8">Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className="max-w-[100%] w-[60%] flex justify-center my-4">
        <input
          type="text"
          placeholder="Ou busque por tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mr-2.5 w-[40%] border-b border-gray-400 py-1 px-2 bg-transparent rounder-md"
        />
        <button type="submit" className="btn dark">
          Buscar
        </button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.length == 0 ? (
          <div className="text-center mt-10">
            <p className="mb-6">Não foram encontrados nenhum post</p>
            <Link to="/create-post" className="btn py-2.5 px-6">
              Criar primeiro post
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <PostDetail key={post.uid} post={post} />
          ))
        )
      }
      </div>
    </div>
  );
};

export default Home;
