import { NavLink } from "react-router-dom";

// Icons
import { HomeIcon, UserGroupIcon, ClipboardListIcon } from "@heroicons/react/outline";

function MenuDesktop() {
  return (
    <nav className="block sticky top-[4.5rem]">
      <ul className="space-y-0.5">
        <li className="flex flex-col">
          <div className="px-2 py-2 text-xs font-semibold">MENU</div>
        </li>
        <li className="group flex flex-col">
          <NavLink
            to={``}
            end
            className={({ isActive }) =>
              `${isActive ? "bg-blue-500 text-white" : "text-gray-900"
              } flex items-center font-semibold w-full px-2 py-2 text-sm border rounded group-hover:bg-blue-300 group-hover:text-white`
            }
            children={({ isActive }) => (
              <div className="flex">
                <HomeIcon
                  className={`${isActive ? "stroke-white" : "stroke-gray-700 group-hover:stroke-white"
                    } w-5 h-5 mr-2 fill-tranparent`}
                  aria-hidden="true"
                />
                Dashboard
              </div>
            )}
          />
        </li>
        <li className="group flex flex-col">
          <NavLink
            to={`employee`}
            className={({ isActive }) =>
              `${isActive ? "bg-blue-500 text-white" : "text-gray-900"
              } flex items-center font-semibold w-full px-2 py-2 text-sm border rounded group-hover:bg-blue-300 group-hover:text-white`
            }
            children={({ isActive }) => (
              <div className="flex">
                <UserGroupIcon
                  className={`${isActive ? "stroke-white" : "stroke-gray-700 group-hover:stroke-white"
                    } w-5 h-5 mr-2 fill-tranparent`}
                  aria-hidden="true"
                />
                Employee
              </div>
            )}
          />
        </li>
        <li className="group flex flex-col">
          <NavLink
            to={`task`}
            className={({ isActive }) =>
              `${isActive ? "bg-blue-500 text-white" : "text-gray-900"
              } flex items-center font-semibold w-full px-2 py-2 text-sm border rounded group-hover:bg-blue-300 group-hover:text-white`
            }
            children={({ isActive }) => (
              <div className="flex">
                <ClipboardListIcon
                  className={`${isActive ? "stroke-white" : "stroke-gray-700 group-hover:stroke-white"
                    } w-5 h-5 mr-2 fill-tranparent`}
                  aria-hidden="true"
                />
                Task
              </div>
            )}
          />
        </li>
      </ul>
    </nav>
  );
}

export default MenuDesktop;
