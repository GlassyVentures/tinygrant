import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const prisma = new PrismaClient();

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
  .mutation("checkout", {
    input: z.object({
      contribution: z.number(),
      donator: z.string(),
    }),
    async resolve({ input }) {
      const url = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/`
        : "http://localhost:3000/";

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Donation to Tiny Grant",
              },
              unit_amount: input.contribution * 100, // Stripe doesn't have decimal points.
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${url}/confirm?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cancel`,
      });

      await prisma.donator.create({
        data: {
          twitter_handle: input.donator,
          donation_amount: input.contribution,
          session_id: session.id,
        },
      });

      return { url: session.url };
    },
  })
  .mutation("confirm", {
    input: z.object({
      session_id: z.string(),
    }),
    async resolve({ input }) {
      await prisma.donator.update({
        where: {
          session_id: input.session_id,
        },
        data: {
          confirmed_payment: true,
        },
      });
    },
  })
  .query("contributors", {
    async resolve() {
      const contributors = await prisma.donator.findMany({
        where: {
          confirmed_payment: true,
        },
        select: {
          twitter_handle: true,
          donation_amount: true,
        },
      });
      const total = await prisma.donator.aggregate({
        where: {
          confirmed_payment: true,
        },
        _sum: {
          donation_amount: true,
        },
      });
      return {
        data: {
          contributors: contributors,
          total: total._sum,
        },
      };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
