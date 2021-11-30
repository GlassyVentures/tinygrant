import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

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
    <div className="text-center flex flex-col h-screen justify-evenly">
      <div>
        <h1 className="text-5xl m-5">Tiny Grants</h1>
        <h2 className="text-lg m-5">
          Building a platform to make it insanely easy for kids to fund dope
          projects!
        </h2>
        <input
          type="button"
          value="Join Daily Newsletter"
          className="bg-blue-400 w-48 h-10 text-white rounded"
        />
      </div>
      <div className="flex flex-row justify-center items-center mx-2">
        <input
          type="Text"
          className="bg-gray-300 text-white h-12 p-2 rounded"
          placeholder="Twitter Handle"
          value={cont.twitter_handle}
          onChange={(e) => setCont({ ...cont, twitter_handle: e.target.value })}
        />
        <div className="bg-gray-300 text-white mx-2 rounded pl-2">
          $
          <input
            type="number"
            className="bg-gray-300 text-white ml-2 h-12 rounded"
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
          className="bg-gradient-to-r from-green-400 to-blue-500 w-60 h-12 rounded text-white"
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
                  className="bg-gray-300 mx-2 w-48 h-16 flex flex-col justify-center"
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
  );
};

export default Home;
