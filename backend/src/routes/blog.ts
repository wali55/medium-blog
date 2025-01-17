import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@walisantunu/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);

  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    return c.json({ msg: "You are not logged in" }, 403);
  }
  } catch (error) {
    console.log(error);
    return c.json({ msg: "You are not logged in" }, 403);
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");

  const {success} = createBlogInput.safeParse(body);

  if (!success) {
    return c.json({ msg: "Invalid input" }, 411);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId
      },
    });

    return c.json({ id: blog.id }, 201);
  } catch (error) {
    return c.json({ msg: "Could not create blog" }, 400);
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = updateBlogInput.safeParse(body);

  if (!success) {
    return c.json({ msg: "Invalid input" }, 411);
  }

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ msg: "Could not update blog" }, 400);
  }
});

// todo add pagination: give first 10 blogs
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const blogs = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true
            }
          }
        }
      });
  
      return c.json({ blogs }, 200);
    } catch (error) {
      console.log(error);
      return c.json({ msg: "Could not get blogs" }, 400);
    }
  });

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          }
        }
      }
    });

    return c.json({ blog }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ msg: "Could not get blog" }, 400);
  }
});


