import React, { useState } from 'react'

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    image: '',
    body: '',
    tags: ''
  })
  const [formError, setFormError] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({
      ...post,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  const label = "flex flex-col mb-4";
  const span = "mb-1.5 font-bold text-left";
  const input = "border-b border-gray-400 py-1 px-2 bg-transparent";

  return (
    <div className="text-center mt-8">
      <h1>Criar post</h1>
      <p className="text-zinc-400 m-3">Escreva sobre o que quiser e compartilhe memórias!</p>
      <form onSubmit={handleSubmit} className="max-w-[40%] my-0 mx-auto">
        <label className={label}>
          <span className={span}>Título:</span>
          <input
            type="text"
            name="title"
            value={post.title}
            required
            onChange={handleChange}
            placeholder='Título do post'
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>URL da imagem:</span>
          <input
            type="text"
            name="image"
            value={post.image}
            required
            onChange={handleChange}
            placeholder='URL da imagem'
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Conteúdo:</span>
          <textarea
            name="body"
            value={post.body}
            required
            onChange={handleChange}
            placeholder='Conteúdo do post'
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Tags:</span>
          <input
            type="text"
            name="tags"
            value={post.tags}
            required
            onChange={handleChange}
            placeholder='Tags do post, separadas por vírgula'
            className={input}
          />
        </label>
        {!loading ? (
          <button className="btn" type="submit">
            Criar post
          </button>
        ) : (
          <button className="btn" type="submit" disabled>
            Criando...
          </button>
        )}
      </form>
    </div>
  )
}

export default CreatePost