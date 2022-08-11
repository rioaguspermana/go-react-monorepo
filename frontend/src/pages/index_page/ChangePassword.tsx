import { useEffect } from "react";

// Component
import BreadCrumbNavigation from "../../components/BreadCrumbNavigation";

// Helper
import logRender from "../../helper/logRender";

function ChangPassword() {

  useEffect(() => {
    logRender({ type: "page", name: "/Me" });
  }, []);

  return (
    <div className="w-full flex flex-col space-y-0.5">
      <BreadCrumbNavigation />
      <div className="w-full flex flex-col space-y-0.5">
        <div className="pt-4">
          <div className="text-center mx-9">
            <h1 className="font-semibold text-2xl mb-4">Change Password</h1>
            <div className="font-light text-lg">Dummy Page</div>
            <p className="font-light text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangPassword;
