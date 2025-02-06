import { useEffect, useState } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    // console.log('use effect ran');
    // console.log(blogs);
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Unable to fetch data from server here !!");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setisPending(false);
          setError(null);
        })
        .catch((err) => {
          // console.log(err);
          if (err.name === "AbortError") {
            console.log('fetch Aborted');
          } else {
            setisPending(false);
            setError(err.message);
          }
        });
    }, 1000);
    return () => abortCont.abort;
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
