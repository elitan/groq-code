import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { type NextResponse, type NextRequest } from "next/server";
import { type NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";

type CreateNextContextOptions = NodeHTTPCreateContextFnOptions<
  NextRequest,
  NextResponse
>;

type CreateContextOptions = {
  req: NextRequest | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    req: opts.req,
  };
};

export const createContext = async (
  opts: CreateNextContextOptions & { headers: Headers },
) => {
  return await createContextInner({
    req: opts.req,
  });
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
