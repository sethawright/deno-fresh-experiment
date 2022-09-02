/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getRandomJoke } from "./api/joke.ts";
import Joke from "../islands/Joke.tsx";

type Joke = {
  message: string;
};

export const handler: Handlers<Joke> = {
  GET(_, ctx) {
    const joke: Joke = getRandomJoke();
    return ctx.render(joke);
  },
};

export default function Home({ data }: PageProps<Joke>) {
  return (
    <div
      class={tw`p-4 mx-auto max-w-screen-md`}
    >
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <Joke joke={data.message} />
      <Counter start={3} />
    </div>
  );
}
