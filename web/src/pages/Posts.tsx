/* eslint-disable @typescript-eslint/no-misused-promises */
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { CreatePostModal } from "../components/CreatePostModal";
import { UpdatePostModal } from "../components/UpdatePostModal";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  updatedAt: string;
};

type PostResponse = Post[];

export const Posts = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({} as Post);
  const [filterByAuthor, setFilterByAuthor] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);

  const fetchPosts = async () => {
    const url = "http://localhost:3333/posts";
    const res = await fetch(url, {
      headers: {
        Authorization: user?.accessToken || "",
      },
    });
    const posts = (await res.json()) as PostResponse;
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts().catch(console.error);
  }, []);

  if (!user) return <Navigate to={"/signin"} />;

  const handleDeletePost = async (postId: string) => {
    const url = `http://localhost:3333/post/${postId}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: user?.accessToken || "",
      },
    });
    await fetchPosts();
  };

  const handleUpdatePost = (post: Post) => {
    setPost(post);
    setIsUpdatePostModalOpen(true);
  };

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  const filteredPosts = posts.filter((post) => {
    if (filterByAuthor) {
      return post.authorId === user.id;
    }
    return true;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <CreatePostModal
        open={isCreatePostModalOpen}
        closeModal={() => setIsCreatePostModalOpen(false)}
        accessToken={user.accessToken}
        fetchPosts={fetchPosts}
      />

      {isUpdatePostModalOpen ? (
        <UpdatePostModal
          open={isUpdatePostModalOpen}
          closeModal={() => setIsUpdatePostModalOpen(false)}
          fetchPosts={fetchPosts}
          post={post}
          accessToken={user.accessToken}
        />
      ) : null}

      <div className="bg-white px-6 py-10 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <button
            onClick={handleLogout}
            className="text-sm font-semibold leading-7 text-indigo-600 w-fit bg-indigo-100 mx-auto px-1 rounded-sm hover:bg-indigo-200 transition-colors"
          >
            Sair da conta
          </button>
          <div className="mt-14 divide-y-[1px]">
            <div className="pb-6">
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Posts
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Veja todos os posts do blog!{" "}
              </p>

              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                type="button"
                className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar uma postagem
              </button>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <div className="w-fit">
                <button
                  onClick={() => setFilterByAuthor((prev) => !prev)}
                  className={
                    filterByAuthor
                      ? "bg-indigo-100 border py-[2px] border-indigo-600 px-2 rounded-sm text-indigo-600"
                      : "bg-indigo-50 px-2 border py-[2px] opacity-70 border-white rounded-sm text-indigo-600"
                  }
                >
                  Filtrar por posts criado por mim
                </button>
              </div>
              {sortedPosts && sortedPosts.length
                ? sortedPosts.map((post) => {
                    return (
                      <div
                        key={post.id}
                        className="flex gap-24 p-6 bg-gray-50 rounded-sm shadow-sm text-left"
                      >
                        <div className="flex-1 items-center truncate">
                          <h3 className="text-xl font-semibold leading-6 text-gray-900">
                            {post.title}
                          </h3>
                          <p className="mt-2 truncate text-base leading-6 text-gray-600">
                            {post.content}
                          </p>
                          <p className="mt-2 text-xs leading-6 text-gray-500">
                            Criado em{" "}
                            {new Date(post.createdAt).toLocaleDateString()} -{" "}
                            {new Date(post.createdAt).toLocaleTimeString()}
                          </p>
                          {post.updatedAt ? (
                            <p className="mt-2 text-xs leading-6 text-gray-500">
                              Atualizado em{" "}
                              {new Date(post.updatedAt).toLocaleDateString()} -{" "}
                              {new Date(post.updatedAt).toLocaleTimeString()}
                            </p>
                          ) : null}
                        </div>
                        {post.authorId === user.id ? (
                          <div className="flex flex-col gap-4 my-auto">
                            <button
                              onClick={() => handleUpdatePost(post)}
                              className="text-sm font-semibold w-full leading-7 text-blue-600 bg-blue-100 mx-auto px-1 rounded-sm hover:bg-blue-200 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-sm font-semibold leading-7 text-red-600 w-full bg-red-100 mx-auto px-1 rounded-sm hover:bg-red-200 transition-colors"
                            >
                              Excluir
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                : "Nenhum post encontrado"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
