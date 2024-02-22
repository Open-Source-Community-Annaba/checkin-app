import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import logo from "../assets/logo-with-title.svg";
import { CheckIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  UserPlusIcon,
  TrashIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export default function App() {
  const [value, updateValue] = useState("");
  const [name, updateName] = useState(null);
  const [nameEntered, updateNameEntered] = useState(false);
  const [list, updateList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [openUser, setOpenUser] = useState({});
  const [createData, setCreateData] = useState({
    name: "",
    occupation: "",
    affiliation: "",
  });

  useEffect(() => {
    getList();
    const checkname = localStorage.getItem("name");
    if (checkname) {
      updateName(checkname);
      updateNameEntered(true);
    }
  }, []);

  useEffect(() => {
    const newFiltered = list
      .sort((a, b) => a.priority - b.priority)
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFiltered(newFiltered);
  }, [list, value]);

  const getList = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/list`, {})
      .then((response) => {
        const sortedList = response.data.sort((a, b) => a.zone - b.zone);
        updateList(sortedList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckboxChange = (id) => {
    const updatedStudents = [...list];
    fetchit(id);

    updateList(updatedStudents);
  };

  const fetchit = (id) => {
    const waitList = [...list];
    for (var i = 0; i < waitList.length; i++) {
      if (waitList[i].id == id) {
        waitList[i].waiting = true;
        break;
      }
    }

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/update/${id}?name=${name}`, {
        by: name,
      })
      .then((response) => {
        const newList = response.data;

        for (var i = 0; i < newList.length; i++) {
          newList[i].waiting = false;
        }

        updateList(newList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createUser = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/add`, createData)
      .then((response) => {
        const newList = response.data;

        for (var i = 0; i < newList.length; i++) {
          newList[i].waiting = false;
        }

        updateList(newList);
        closeCreateModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteFromList = async (id) => {
    try {
      const response = await axios
        .delete(`${import.meta.env.VITE_SERVER_URL}/delete/${id}?name=${name}`)
        .then((response) => {
          const newList = response.data;

          for (var i = 0; i < newList.length; i++) {
            newList[i].waiting = false;
          }

          updateList(newList);
          closeModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleName = () => {
    if (name) {
      localStorage.setItem("name", name);
      updateNameEntered(true);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }
  function closeCreateModal() {
    setIsCreateOpen(false);
    setCreateData({
      name: "",
      occupation: "",
      affiliation: "",
    });
  }

  return (
    <>
      <div className="h-[100vh] w-full font-mono relative text-white">
        <nav className="h-16 w-full bg-purple-500 px-5 flex">
          <div className="h-full w-1/4 flex items-center justify-start">
            <img className="" src={logo} alt="" />
          </div>
          <div className="w-3/4 h-full flex font-bold uppercase text-3xl justify-end items-center">
            Check In
          </div>
        </nav>
        {nameEntered ? (
          <div className="absolute top-16 bottom-0 overflow-scroll w-full bg-slate-700">
            <div className="flex justify-start items-center text-2xl font-bold h-24 p-5">
              welcome {name}
            </div>
            <div className="flex justify-start items-center h-24 p-5">
              <label
                className="w-1/4 h-12 flex justify-start items-center font-3xl font-bold uppercase"
                htmlFor="name"
              >
                search:
              </label>
              <input
                className="px-5 w-3/4 h-10 bg-transparent focus:outline-0 border-2 border-white rounded-full"
                type="text"
                id="name"
                placeholder="type here..."
                onChange={(e) => {
                  updateValue(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col items-start gap-5 mx-5">
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Attention
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              You're about to delete {openUser.name} from the
                              list
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                              onClick={() => deleteFromList(openUser.id)}
                            >
                              delete
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <Transition appear show={isCreateOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={closeCreateModal}
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
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Add to list
                          </Dialog.Title>
                          <div className="mt-2 flex flex-col gap-5 text-sm">
                            <div className="flex w-full ">
                              <label className="w-1/3 text-start flex justify-start items-center">
                                name <span className="text-red-600">*</span>
                              </label>
                              <input
                                onChange={(e) => {
                                  setCreateData((prev) => ({
                                    ...prev, // Spread the previous state
                                    name: e.target.value, // Update the specific key with the new value
                                  }));
                                }}
                                className="w-2/3 focus:outline-none border-2 border-black rounded-lg p-2"
                                placeholder="khalil"
                                type="text"
                              />
                            </div>
                            <div className="flex w-full">
                              <label className="w-1/3 text-start flex justify-start items-center">
                                occupation
                              </label>
                              <input
                                onChange={(e) => {
                                  setCreateData((prev) => ({
                                    ...prev, // Spread the previous state
                                    occupation: e.target.value, // Update the specific key with the new value
                                  }));
                                }}
                                className="w-2/3 focus:outline-none border-2 border-black rounded-lg p-2"
                                placeholder="student"
                                type="text"
                              />
                            </div>
                            <div className="flex w-full">
                              <label className="w-1/3 text-start flex justify-start items-center">
                                affiliation
                              </label>
                              <input
                                onChange={(e) => {
                                  setCreateData((prev) => ({
                                    ...prev, // Spread the previous state
                                    affiliation: e.target.value, // Update the specific key with the new value
                                  }));
                                }}
                                className="w-2/3 focus:outline-none border-2 border-black rounded-lg p-2"
                                placeholder="UBMA"
                                type="text"
                              />
                            </div>
                            <div className="flex w-full">
                              <label className="w-1/3 text-start flex justify-start items-center">
                                priority
                              </label>
                              <input
                                onChange={(e) => {
                                  setCreateData((prev) => ({
                                    ...prev, // Spread the previous state
                                    priority: e.target.value, // Update the specific key with the new value
                                  }));
                                }}
                                className="w-2/3 focus:outline-none border-2 border-black rounded-lg p-2"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between">
                            <button
                              type="button"
                              className={`inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-900 ${
                                createData.name == ""
                                  ? "bg-slate-500"
                                  : "bg-green-400 hover:bg-green-200  focus-visible:ring-2 focus-visible:ring-green-700"
                              } focus-visible:ring-offset-2 focus:outline-none`}
                              onClick={() => {
                                if (createData.name != "") createUser();
                              }}
                            >
                              add
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                              onClick={() => closeCreateModal()}
                            >
                              cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="w-36 h-12 bg-green-400 flex justify-center items-center gap-2 font-xl rounded-md text-black"
              >
                <UserPlusIcon className="h-6" />
                add new
              </button>

              {filtered.map((student, index) => (
                <div className="w-full flex gap-2 font-xl rounded-md text-black">
                  <div
                    id="check"
                    onClick={() => handleCheckboxChange(student.id)}
                    className={`w-16 h-16 flex items-center justify-center px-5 ${
                      student.checked ? "bg-green-400" : "bg-yellow-400"
                    } rounded-md cursor-pointer`}
                  >
                    {student.waiting ? (
                      <ArrowPathIcon className="animate-spin" />
                    ) : student.checked ? (
                      <CheckIcon />
                    ) : (
                      <XMarkIcon />
                    )}
                  </div>
                  <div className="flex-grow h-16 relative bg-orange-200 rounded-md flex flex-col justify-start items-start overflow-hidden p-2 text-lg">
                    {student.name}
                    <span className="text-sm text-slate-900">
                      {student.occupation} - {student.affiliation}
                    </span>
                    <span className="text-sm absolute m-2 top-0 right-0 text-red-600">
                      <BookmarkIcon className="w-7 text-black"></BookmarkIcon>
                    </span>
                    <span className="text-xs absolute mx-5 my-3 top-0 right-0 text-red-600">
                    {student.priority}
                    </span>
                    
                  </div>
                  <div
                    onClick={() => {
                      setOpenUser(student);
                      setIsOpen(true);
                    }}
                    className={`w-16 h-16 cursor-pointer bg-red-500 rounded-md flex justify-center items-center text-2xl`}
                  >
                    <TrashIcon className="h-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute top-16 bottom-0 flex flex-col gap-5 justify-center items-center w-full bg-slate-700">
            <label
              className="flex justify-start items-center text-2xl font-bold uppercase"
              htmlFor="name"
            >
              enter your name:
            </label>
            <input
              className="px-5 w-3/4 h-14 bg-transparent focus:outline-0 border-2 border-white rounded-md"
              type="text"
              id="name"
              placeholder="type here..."
              onChange={(e) => {
                updateName(e.target.value);
              }}
            />
            <button
              onClick={() => handleName()}
              className="h-12 w-1/2 flex items-center justify-center bg-green-500 rounded-lg text-xl font-bold"
            >
              submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
