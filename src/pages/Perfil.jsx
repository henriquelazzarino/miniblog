import React from "react";
import { useAuthValue } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
//logout
const Perfil = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const {deleteDocument} = useDeleteDocument("posts");

  const deleteDoc = async (id) => {
    deleteDocument(id)
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1 className="mt-8 mb-1 text-4xl">Perfil</h1>
      <p className="text-zinc-400 mb-4">Gerencie os seus posts</p>
      {posts && posts.length > 0 ? (
        <>
          <div className="flex justify-between font-bold w-[60%] p-2.5 border-2 border-solid border-slate-500">
            <span>Título</span>
            <span>Ações</span>
          </div>
          <ul className="w-[60%] mt-3">
            {posts.map((post) => (
              <div key={post.id} className="flex justify-between items-center gap-4 mb-3">
                <p>{post.title}</p>
                <div className="flex gap-2">
                  <Link to={`/posts/${post.id}`} className="btn outline">
                    Ver mais
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn outline">
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDoc(post.id)}
                    className="btn outline danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>Nenhum post encontrado</p>
          <Link to="/create-post" className="btn">
            Criar primeiro post
          </Link>
        </>
      )}
    </div>
  );
};

export default Perfil;
