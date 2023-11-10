import React from 'react'
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const {document: post, loading} = useFetchDocument('posts', id);
  console.log(post)
  return (
    <div className='mt-5'>
      {loading && <p>Carregando...</p>}
      {post && (
        <div className='flex flex-col items-center'>
          <h1 className='mb-2'>{post.title}</h1>
          <img src={post.image} alt={post.title} className='max-w-lg rounded-md'/>
          <p className='text-justify'>{post.body}</p>
          <div className='flex gap-1.5'>
          {post.tags.map(tag => (
            <p key={tag} className='mt-2 text-slate-400'>
              <span className='font-bold'>#</span>
              {tag}
            </p>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Post