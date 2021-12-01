import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const Home: NextPage = () => {
  const [cont, setCont] = useState({
    twitter_handle: "",
    donation_amount: "",
  });

  const data = trpc.useQuery(["contributors"]);
  const mutation = trpc.useMutation(["checkout"], {
    onSuccess: (data) => {
      location.assign(data.url!);
    },
    onError: () => {
      alert(
        "Please double check your username, it may have been used already."
      );
    },
  });

  const checkout = () => {
    if (Number(cont.donation_amount) < 0 || cont.donation_amount == "") {
      alert("Your donation cannot be less than 0, please try again.");
    } else if (cont.twitter_handle[0] != "@") {
      alert("Your twitter handle is invalid, please try again.");
    } else {
      mutation.mutate({
        contribution: Number(cont.donation_amount),
        donator: cont.twitter_handle,
      });
    }
  };

  return (
    <div className="h-screen w-sceren bg-green-200">
      <div className="text-center flex flex-col h-screen justify-center">
        <div>
          <h1 className="text-5xl m-5">Tiny Grants</h1>
          <h2 className="text-lg m-5">
            Building a platform to make it insanely easy for kids to fund dope
            projects!
          </h2>
          {/* <input
          type="button"
          value="Join Daily Newsletter"
          className="bg-blue-400 w-48 h-10 text-white rounded"
        /> */}{" "}
          {/* TODO: Add Newsletter */}
        </div>
        <div className="flex flex-row xs:flex-col justify-center items-center">
          <input
            type="Text"
            className="bg-white text-black h-12 rounded mt-1 w-48 p-2"
            placeholder="Twitter Handle"
            value={cont.twitter_handle}
            onChange={(e) =>
              setCont({ ...cont, twitter_handle: e.target.value })
            }
          />
          <div className="bg-white text-black rounded pl-2 w-48 flex items-center mt-1">
            $
            <input
              type="number"
              className="bg-white text-black h-12 rounded"
              min="0"
              value={cont.donation_amount}
              placeholder="20"
              onChange={(e) =>
                setCont({
                  ...cont,
                  donation_amount: e.target.value,
                })
              }
            />
          </div>
          <input
            type="button"
            value="Pledge Now"
            onClick={checkout}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 w-48 h-12 rounded text-white mt-1"
          />
        </div>
        {data.isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <h1 className="my-8 text-xl">
              Total Given: ${data.data?.data.total.donation_amount}
            </h1>
            <div className="flex justify-center">
              {data.data?.data.contributors.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="bg-green-500 text-white w-40 h-14 flex flex-col justify-center rounded"
                  >
                    <h1>{item.twitter_handle}</h1>
                    <h1>${item.donation_amount}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <footer className="text-center sticky bottom-0 text-sm bg-green-200 w-screen">
        <h1>
          Built with ❤️ by{" "}
          <a href="https://twitter.com/_heyglassy" className="underline">
            {" "}
            @_heyglassy
          </a>{" "}
        </h1>
        <h1>
          Built on the{" "}
          <a href="https://init.tips" className="underline">
            init.tips
          </a>{" "}
          stack shout out
          <a href="https://twitter.com/t3dotgg" className="underline">
            {" "}
            @t3dotgg
          </a>
        </h1>
        <h1>Powered by Vercel and Planetscale</h1>
      </footer>
    </div>
  );
};

export default Home;
