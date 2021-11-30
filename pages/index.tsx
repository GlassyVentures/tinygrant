import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const [cont, setCont] = useState({
    twitter_handle: "",
    donation_amount: "",
  });

  const data = trpc.useQuery(["contributors"]);
  console.log(data.data?.data);
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
    <div>
      <h1>Tiny Grants</h1>
      <h2>
        Building a platform to make it insanely easy for kids to fund dope
        projects!
      </h2>
      <div>
        <input type="button" value="Join Daily Newsletter" />
      </div>
      <div>
        <input
          type="Text"
          placeholder="@_heyglassy"
          value={cont.twitter_handle}
          onChange={(e) => setCont({ ...cont, twitter_handle: e.target.value })}
        />
        $
        <input
          type="number"
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
        <input type="button" value="Pledge Now" onClick={checkout} />
      </div>
      <div>
        <h1>Total Pledged: {}</h1>
        <div>
          {data.data?.data.map((item, key) => {
            return (
              <div key={key}>
                <h1>{item.twitter_handle}</h1>
                <h1>${item.donation_amount}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
