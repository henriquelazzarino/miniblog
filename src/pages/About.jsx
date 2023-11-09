import React from "react";

const About = () => {
  return (
    <div className="text-center flex flex-col items-center mt-7">
      <h1 className="text-3xl mb-1 font-normal">
        Sobre o Mini<span className="font-extrabold">BLOG</span>
      </h1>
      <p className="w-[80%] text-slate-600 mb-4">
        Desenvolvido com ReactJS/Vite com Tailwind no
        Frontend, usando o Firebase no Backend/Banco de Dados.
      </p>
      <p>
        Meu Github:{" "}
        <a href="https://github.com/henriquelazzarino" className="p-1">Henrique A Lazzarino</a>
      </p>
    </div>
  );
};

export default About;
