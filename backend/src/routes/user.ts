import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@walisantunu/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if (!success) {
    return c.json({ msg: "Invalid input." }, 411);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token, ok: true }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ msg: "Cannot create user." }, 411);
  }
});

userRouter.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);

  if (!success) {
    return c.json({ msg: "Invalid input!", ok: false }, 411);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({ msg: "User does not exists!", ok: false }, 403);
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "Successfully logged in", token, ok: true }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ msg: "Cannot login!", ok: false }, 403);
  }
});
