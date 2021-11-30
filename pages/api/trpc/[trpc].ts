import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import Stripe from "stripe";
import { url } from "inspector";

let stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("checkout", {
    input: z.object({
      contribution: z.number(),
    }),
    async resolve({ input }) {
      const url = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : "http://localhost:3000/api/trpc";

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Donation to Tiny Grant",
              },
              unit_amount: input.contribution,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `https://${url}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://${url}/?canceled=true`,
      });
      return { url: session.url };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
