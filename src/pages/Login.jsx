import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { error: authError, loading, login } = useAuth();

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const label = "flex flex-col mb-4";
  const span = "mb-1.5 font-bold text-left";
  const input = "border-b border-gray-400 py-1 px-2 bg-transparent";

  return (
    <div className="text-center mt-8">
      <h1>Entrar</h1>
    <p className="text-zinc-400 m-3">
      Faça o login para poder utilizar o sistema
    </p>
    <form onSubmit={handleLogin} className="max-w-[40%] my-0 mx-auto">
      <label className={label}>
        <span className={span}>E-mail: </span>
        <input
          type="email"
          name="email"
          required
          placeholder="E-mail"
          value={user.email}
          onChange={handleInputChange}
          className={input}
        />
      </label>
      <label className={label}>
        <span className={span}>Senha: </span>
        <input
          type="password"
          name="password"
          required
          placeholder="Senha"
          value={user.password}
          onChange={handleInputChange}
          className={input}
        />
      </label>
      {!loading ? (
        <button className="btn" type="submit">
          Login
        </button>
      ) : (
        <button className="btn" type="submit" disabled>
          Logando...
        </button>
      )}
      {error && (
        <p className="mt-4 text-red-500 bg-red-200 border border-solid border-red-500 rounded-md p-1.5">
          {error}
        </p>
      )}
    </form>
    </div>
  )
}

export default Login