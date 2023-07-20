import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/fastify-route-adapter";
import { adaptMiddleware } from "../adapters/fastify-middleware-adapter";
import { makeCreatePostController } from "../factories/controllers/post/create-post/create-post-controller-factory";
import { makeFindPostsController } from "../factories/controllers/post/find-posts/find-posts-controller-factory";
import { makeFindPostByIdController } from "../factories/controllers/post/find-post-by-id/find-post-by-id-controller-factory";
import { makeFindPostsByAuthorController } from "../factories/controllers/post/find-posts-by-author/find-post-by-author-controller-factory";
import { makeUpdatePostController } from "../factories/controllers/post/update-post/update-post-controller-factory";
import { makeDeletePostController } from "../factories/controllers/post/delete-post/delete-post-controller-factory";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export default (router: FastifyInstance) => {
  const authMiddleware = makeAuthMiddleware();

  router.post(
    "/post",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeCreatePostController())
  );

  router.get(
    "/posts",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeFindPostsController())
  );

  router.get(
    "/post/:postId",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeFindPostByIdController())
  );

  router.get(
    "/posts/:authorId",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeFindPostsByAuthorController())
  );

  router.patch(
    "/post/:postId",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeUpdatePostController())
  );

  router.delete(
    "/post/:postId",
    {
      preHandler: adaptMiddleware(authMiddleware),
    },
    adaptRoute(makeDeletePostController())
  );
};
