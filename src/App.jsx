import { useState, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Debounce 검색 핸들러
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        console.log("디바운스 검색 쿼리:", query);
        setSearchString(query);
      }, 300),
    []
  );

  const handleChangeDebounced = useCallback(
    (event) => {
      setQuery(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  const throttle = (func, delay) => {
    let lastTime = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastTime >= delay) {
        func(...args);
        lastTime = now;
      }
    };
  };

  // Throttle 검색 핸들러
  const throttledSearch = useMemo(
    () =>
      throttle((query) => {
        console.log("스로틀 검색 쿼리:", query);
        setSearchString(query);
      }, 300),
    []
  );

  const handleChangeThrottled = useCallback(
    (event) => {
      setQuery(event.target.value);
      throttledSearch(event.target.value);
    },
    [throttledSearch]
  );

  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={handleChangeDebounced}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleChangeThrottled}
        />
      </div>
      <p>{searchString}</p>
    </div>
  );
}

export default App;
