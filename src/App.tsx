/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { Photo } from "./components";
import { imagesStore } from "./store";
import { useDebounce } from "./useDebounce.hook";

function App() {
  const photos = imagesStore((state) => state.photos);

  const setQuery = imagesStore((state) => state.setQuery);
  const resetFetch = imagesStore((state) => state.resetFetch);
  const fetchData = imagesStore((state) => state.fetchData);
  const fetchMore = imagesStore((state) => state.fetchMore);
  const [loading, setLoading] = useState(false); //loading

  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounce<string>(searchString, 300);

  const fetchImages = async () => {
    setLoading(true);
    try {
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue]);

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
    resetFetch();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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
