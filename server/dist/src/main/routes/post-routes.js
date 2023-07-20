"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_route_adapter_1 = require("../adapters/fastify-route-adapter");
const fastify_middleware_adapter_1 = require("../adapters/fastify-middleware-adapter");
const create_post_controller_factory_1 = require("../factories/controllers/post/create-post/create-post-controller-factory");
const find_posts_controller_factory_1 = require("../factories/controllers/post/find-posts/find-posts-controller-factory");
const find_post_by_id_controller_factory_1 = require("../factories/controllers/post/find-post-by-id/find-post-by-id-controller-factory");
const find_post_by_author_controller_factory_1 = require("../factories/controllers/post/find-posts-by-author/find-post-by-author-controller-factory");
const update_post_controller_factory_1 = require("../factories/controllers/post/update-post/update-post-controller-factory");
const delete_post_controller_factory_1 = require("../factories/controllers/post/delete-post/delete-post-controller-factory");
const auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
exports.default = (router) => {
    const authMiddleware = (0, auth_middleware_factory_1.makeAuthMiddleware)();
    router.post("/post", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, create_post_controller_factory_1.makeCreatePostController)()));
    router.get("/posts", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, find_posts_controller_factory_1.makeFindPostsController)()));
    router.get("/post/:postId", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, find_post_by_id_controller_factory_1.makeFindPostByIdController)()));
    router.get("/posts/:authorId", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, find_post_by_author_controller_factory_1.makeFindPostsByAuthorController)()));
    router.patch("/post/:postId", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, update_post_controller_factory_1.makeUpdatePostController)()));
    router.delete("/post/:postId", {
        preHandler: (0, fastify_middleware_adapter_1.adaptMiddleware)(authMiddleware),
    }, (0, fastify_route_adapter_1.adaptRoute)((0, delete_post_controller_factory_1.makeDeletePostController)()));
};
