/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Post } from "../pages/Posts";

type UpdatePostModal = {
  open: boolean;
  closeModal: () => void;
  accessToken: string;
  fetchPosts: () => Promise<void>;
  post: Post;
};

export const UpdatePostModal = ({
  open,
  closeModal,
  accessToken,
  fetchPosts,
  post,
}: UpdatePostModal) => {
  const [title, setTitle] = useState(() => post.title);
  const [content, setContent] = useState(() => post.content);
  const cancelButtonRef = useRef(null);

  console.log(title, content);
  console.log(post.title, post.content);

  const handleCloseModal = () => {
    setTitle("");
    setContent("");
    closeModal();
  };

  const handleUpdatePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const url = `http://localhost:3333/post/${post.id}`;
    try {
      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ title, content }),
      });
      await fetchPosts();
      handleCloseModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    Editar postagem
                  </Dialog.Title>
                </div>

                <form
                  onSubmit={handleUpdatePost}
                  className="space-y-6 mt-6"
                  action="#"
                  method="POST"
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Título
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="title"
                        autoComplete="title"
                        value={title}
                        defaultValue={post.title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contéudo
                      </label>
                    </div>
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      value={content}
                      defaultValue={post.content}
                      onChange={(e) => setContent(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
