/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { Photo } from "./components";
import { imagesStore } from "./store";
import { useDebounce } from "./useDebounce.hook";

function App() {
  const photos = imagesStore((state) => state.photos);
  const setQuery = imagesStore((state) => state.setQuery);
  const fetchData = imagesStore((state) => state.fetchData);
  const fetchMore = imagesStore((state) => state.fetchMore);

  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounce<string>(searchString, 300);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        fetchMore();
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

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
          <div className="submit-btn">
            <FaSearch />
          </div>
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
