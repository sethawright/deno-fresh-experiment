/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";

export default function Joke(props: any) {
  const [joke, setJoke] = useState(props.joke);

  const updateJoke = async () => {
    const response: Response = await fetch("/api/joke", {
      headers: { "Content-Type": "text/plain" },
    });
    const joke = await response.text();
    setJoke(joke);
  };

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    updateJoke();
    const interval = setInterval(updateJoke, 3000);
    setTimer(interval);

    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(0);
      }
    };
  }, []);
  return <p class={tw`my-6`}>{joke}</p>;
}
