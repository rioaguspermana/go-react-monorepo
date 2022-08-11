import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Popover, Transition } from '@headlessui/react'

// Icons
import {
  ClipboardListIcon,
  IdentificationIcon,
  KeyIcon,
  LogoutIcon,
  UserCircleIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";

// Context
import AuthContext from "../context/AuthContext";
import LoaderContext from "../context/LoaderContext";

// Asset
import project from "../../package.json";
import logo from "../assets/logo.svg";

function TopNavigation() {
  const { signout } = useContext(AuthContext);
  const { message } = useContext(LoaderContext);
  return (
    <nav className="sticky top-0 z-20 w-full backdrop-blur flex-none transition-colors duration-500 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-gray-300 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <Link to={`/`} className="ml-1 pl-2 mr-3 flex w-auto">
              <span className="sr-only">kamara.id asist home page</span>
              <img className="w-8 bg-transparent" src={logo} alt="logo" />
              <div className="flex flex-col ml-2 -space-y-1">
                <h4 className="m-0 font-semibold">Task App</h4>
                <span className="text-xs font-light">Golang mini project</span>
              </div>
            </Link>
            <div className="relative">
              <button
                className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5"
                id="headlessui-menu-button-1"
                type="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                v{project.version}
              </button>
            </div>
            {/* MENU DESKTOP */}
            <div className="relative hidden lg:flex items-center ml-auto">
              {/*
              <nav className="leading-6">
                <ul className="flex space-x-8">
                  <li>
                    <Link to={`assessor`} className="flex font-medium text-slate-600 hover:text-sky-700">
                      <UsersIcon className="w-5 mr-1" />
                      Assessor
                    </Link>
                  </li>
                </ul>
              </nav>
              */}
              <Menu as="div" className="block items-center ml-6">
                <Menu.Button className="ml-6 flex items-center font-medium text-slate-700">
                  <span className="capitalize mr-2">Hi Manager</span>
                  <UserCircleIcon className="w-5" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`me`}
                            className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <IdentificationIcon
                              className={`${active ? "stroke-white" : "stroke-blue-500"} w-5 h-5 mr-2 fill-tranparent`}
                              aria-hidden="true"
                            />
                            User Info
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`change_password`}
                            className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <KeyIcon
                              className={`${active ? "stroke-white" : "stroke-blue-500"} w-5 h-5 mr-2 fill-tranparent`}
                              aria-hidden="true"
                            />
                            Change Password
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signout()}
                            className={`${active ? "bg-red-500 text-white" : "text-red-600"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <LogoutIcon
                              className={`${active ? "stroke-white" : "stroke-red-500"} w-5 h-5 mr-2 fill-tranparent`}
                              aria-hidden="true"
                            />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {/* MENU MOBILE */}
            <Popover className="ml-auto -my-1 lg:hidden">
              <Popover.Button className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                <span className="sr-only">Open main menu</span>
                <svg width="24" height="24" fill="none" aria-hidden="true">
                  <path
                    d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          alt="kamara logo"
                          className="h-12 w-auto sm:h-32"
                          src={logo}
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      <Menu as="div" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        <Menu.Button className="flex items-center text-slate-600 hover:text-sky-700">
                          <UserCircleIcon className="w-5 mr-1" />
                          <span className="capitalize font-medium">Hi Manager</span>
                        </Menu.Button>
                      </Menu>
                      <hr />
                      <Link to={`employee`} className={`flex px-3 py-2 font-medium text-slate-600`}>
                        <UserGroupIcon className={`w-5 mr-1`} />
                        Employee
                      </Link>
                      <Link to={`task`} className={`flex px-3 py-2 font-medium text-slate-600`}>
                        <ClipboardListIcon className={`w-5 mr-1`} />
                        Task
                      </Link>
                      <hr />
                      <Link to={`me`} className={`flex px-3 py-2 font-medium text-slate-600`}>
                        <IdentificationIcon className={`stroke-blue-500 w-5 mr-1`} />
                        User Info
                      </Link>
                      <Link to={`change_password`} className={`flex px-3 py-2 font-medium text-slate-600`}>
                        <KeyIcon className={`stroke-blue-500 w-5 mr-1`} />
                        Change Password
                      </Link>
                      <hr />
                      <button onClick={() => signout()} className={`flex px-3 py-2 font-medium text-red-600`}>
                        <LogoutIcon className={`stroke-red-500 w-5 mr-1`} />
                        Logout
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
      {message !== "" && (
        <div className="w-screen h-0.5 bg-gradient-to-r bg-slate-200 from-cyan-300 to-blue-700 bg-20% bg-repeat-y bg-posloader animate-loader"></div>
      )}
    </nav>
  );
}

export default TopNavigation;
