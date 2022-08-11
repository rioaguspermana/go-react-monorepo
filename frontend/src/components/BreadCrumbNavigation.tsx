import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/outline";

import LoaderContext from "../context/LoaderContext";

interface Bread {
  key: string;
  link: ReactElement;
}

function BreadCrumbNavigation() {
  const { message } = useContext(LoaderContext);
  const location = useLocation();
  const [breads, setBreads] = useState<Bread[]>([]);

  useEffect(() => {
    function generateBread() {
      let arrPath = location.pathname.split("/").filter(function (el) { return el; });
      let breads: Bread[] = [
        {
          key: `home_0`,
          link: (
            <Link to={`/`}>
              <div className="group flex font-bold text-blue-500 hover:text-blue-900">
                <HomeIcon
                  className="w-4 h-4 stroke-blue-500 group-hover:stroke-blue-900 fill-tranparent"
                  aria-hidden="true"
                />
                {arrPath.length === 0 && <span className="ml-2">DASHBOARD</span>}
              </div>
            </Link>
          ),
        },
      ];
      arrPath.forEach((v, i) => {
        /**
         * if number (ID) then current route is detail of resource
         * show "Detail"
         * else show as if but remove "_"
         */
        v = !isNaN(parseInt(v)) ? "Detail" : v.replace(/_/g, " ");
        let currPath = "";
        for (let index = 0; index < i + 1; index++) {
          currPath += `/${arrPath[index]}`;
        }
        let bread: Bread = {
          key: `${v}_${i + 1}`,
          link: (
            <Link to={`${currPath}`} className="uppercase">
              {v}
            </Link>
          ),
        };
        breads.push(bread);
      });
      setBreads(breads);
    }
    generateBread();
  }, [location.pathname]);

  return (
    <div className="flex sticky top-[3.8rem] md:top-[3.8rem] lg:top-[3.75rem] pt-5 pb-2 text-xs font-semibold bg-white z-10">
      {breads.map((v, i) => (
        <div key={v.key}>
          {i > 0 && <span className="px-2">/</span>}
          <span className={i < breads.length - 1 ? "text-blue-500 hover:text-blue-900" : ""}>{v.link}</span>
        </div>
      ))}
      {message !== "" && <div className="hidden md:block ml-auto text-gray-600">{message} . . .</div>}
    </div>
  );
}

export default BreadCrumbNavigation;
