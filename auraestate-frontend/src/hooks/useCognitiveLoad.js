import { useEffect, useState } from "react";

const useCognitiveLoad = () => {
  const [load, setLoad] = useState("low");

  useEffect(() => {
    let interactions = 0;

    const updateLoad = () => {
      if (interactions >= 8) {
        setLoad("high");
      } else if (interactions >= 4) {
        setLoad("medium");
      } else {
        setLoad("low");
      }
    };

    const handleClick = () => {
      interactions += 1;
      updateLoad();
    };

    window.addEventListener("click", handleClick);

    const timer = setInterval(() => {
      interactions = Math.max(0, interactions - 1);
      updateLoad();
    }, 5000);

    return () => {
      window.removeEventListener("click", handleClick);
      clearInterval(timer);
    };
  }, []);

  return load;
};

export default useCognitiveLoad;