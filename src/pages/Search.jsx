import React from "react";
import useQuery from "../hooks/useQuery";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { Link } from "react-router-dom";
import PostDetail from "../components/PostDetail";

const Search = () => {
  const query = useQuery().get("q");

  const { documents: posts } = useFetchDocuments("posts", query);
  return (
    <>
      <h2 className="my-3 text-2xl">
        Resultados para: <span className="font-bold">{query}</span>
      </h2>
      <div className="flex flex-col items-center justify-center">
        {posts && posts.length == 0 ? (
          <div className="text-center mt-10">
            <p className="mb-6">Não foram encontrados nenhum post</p>
            <Link to="/" className="btn dark">
              Voltar à página inicial
            </Link>
          </div>
        ) : (
          posts.map((post) => <PostDetail key={post.uid} post={post} />)
        )}
      </div>
    </>
  );
};

export default Search;
