import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [debounceQuery, setDebounceQuery] = useState("");
  const [throttleQuery, setThrottleQuery] = useState("");
  const [searchString, setSearchString] = useState("");
  const time = useRef(new Date());

  const debounceHandleChange = (event) => {
    setDebounceQuery(event.target.value);
  };
  const throttleHandleChange = (event) => {
    setThrottleQuery(event.target.value);
  };

  useEffect(() => {
    const debouneTimer = setTimeout(() => {
      console.log("debounce 검색 쿼리:", debounceQuery);
    }, 1000);

    return () => clearTimeout(debouneTimer);
  }, [debounceQuery]);

  useEffect(() => {
    const newTime = new Date();
    const delay = 1000 - (newTime - time.current);
    const throttleTimer = setTimeout(() => {
      console.log("throttle 검색 쿼리:", throttleQuery);
      time.current = new Date();
    }, delay);

    return () => clearTimeout(throttleTimer);
  }, [throttleQuery]);
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
          onChange={debounceHandleChange}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={throttleHandleChange}
        />
      </div>
      <p>{searchString}</p>
    </div>
  );
}

export default App;
