/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { Photo } from "./components";
import { getImages } from "./service";

function App() {
  //@ se criar forma de store da pra fazer todos estados estarem na store
  const [loading, setLoading] = useState(false); //loading
  const [photos, setPhotos] = useState<any[]>([]); //photos
  const [page, setPage] = useState(1); //page
  const [query, setQuery] = useState(""); ///query

  //@ isola função em um fetch a parte
  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getImages({ page, query });

      setPhotos((oldPhoto) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhoto, ...data.results];
        } else {
          return [...oldPhoto, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //@ talvez compense fazer um sistemas de store
  useEffect(() => {
    fetchImages();
  }, [page]);

  //@ será que tem como fazer um sistema de pagination com store ou sem usar useEffect
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
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
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
