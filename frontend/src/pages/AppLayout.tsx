import TopNavigation from "../components/TopNavigation";
import MenuDesktop from "../components/MenuDesktop";
import Credit from "../components/Credit";
import AppRoute from "./AppRoute";

function AppLayout() {
  return (
    <div className="w-full">
      <TopNavigation />
      <div className="flex max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <section className="hidden md:block w-1/6 m-1 p-2">
          <MenuDesktop />
        </section>
        <section className="flex w-full md:w-5/6">
          <AppRoute />
        </section>
      </div>
      <Credit />
    </div>
  );
}

export default AppLayout;
