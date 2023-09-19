/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { Photo } from "./components";
import { getImages } from "./service";
import { imagesStore } from "./store";

function App() {
  //@ store não é um bom case para isso, a não ser que fosse modelado de forma diferente
  //@ talvez com o modelo de actions, ou mesmo desenhado para absorver as lógicas de tratamento envolvendo um crud, similar a aplicação de clothing store
  //@ no formato atual com page e e query não parece funcionar muito bem
  //@ talvez esse modelo de store seja melhor com ações não paginadas
  //! mas é possível testar aderir um swr e fazer funcionar um modelo híbrido com store.
  //! porém vale lembrar que o próprio swr faz o sistema de cache, que possibilita tratar o uso de informações que ele tem em cache
  //! talvez de pra fazer uma view-model com swr + custom hook
  const photos = imagesStore((state) => state.photos);
  const setPhotos = imagesStore((state) => state.setPhotos);
  const query = imagesStore((state) => state.query);
  const setQuery = imagesStore((state) => state.setQuery);
  const page = imagesStore((state) => state.page);
  const setPage = imagesStore((state) => state.setPage);
  const fetchMore = imagesStore((state) => state.fetchMore);
  //@ se criar forma de store da pra fazer todos estados estarem na store
  const [loading, setLoading] = useState(false); //loading

  //@ isola função em um fetch a parte
  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getImages({ page, query });
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //@ talvez compense fazer um sistemas de store
  useEffect(() => {
    fetchImages();
  }, [page, query]);

  //@ será que tem como fazer um sistema de pagination com store ou sem usar useEffect
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        fetchMore();
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos?.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
