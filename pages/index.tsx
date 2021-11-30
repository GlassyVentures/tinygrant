import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import "tailwindcss/tailwind.css";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "world" }]);
  const url = trpc.useQuery(["checkout", { contribution: 100 }]);

  return (
    <div>
      <h1>Tiny Grants</h1>
      <h1>{url.data?.url}</h1>
      <h2>
        Building a platform to make it insanely easy for kids to fund dope
        projects!
      </h2>
      <div>
        <input type="email" value="Email" />
        <input
          type="button"
          value="Join Daily Newsletter"
          //   onClick={() => {
          //     console.log(url.data?.url);
          //   }}
        />
      </div>
      <div>
        <input type="Text" value="Twitter Username" />
        <input type="number" value="Amount" />
        <input type="button" value="Pledge Now" />
      </div>
      <div>
        <h1>Total Pledged: {}</h1>
      </div>
    </div>
  );
};

export default Home;
