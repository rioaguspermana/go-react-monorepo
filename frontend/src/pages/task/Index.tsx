import { Outlet } from "react-router-dom";

import BreadCrumbNavigation from "../../components/BreadCrumbNavigation";

function Index() {
  return (
    <div className="w-full flex flex-col space-y-0.5">
      <BreadCrumbNavigation />
      <Outlet />
    </div>
  );
}

export default Index;
