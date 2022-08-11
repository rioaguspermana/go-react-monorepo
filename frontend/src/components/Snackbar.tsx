import { useEffect, useState } from "react";

import { ReactComponent as X } from "../assets/x.svg";

import logRender from "../helper/logRender";

function Snackbar(props: { type: "" | "error" | "info" | "success"; message: string; duration?: number }) {
  const [duration, setDuration] = useState<number>(props?.duration || 3000);
  const [animation, setAnimation] = useState<string>("-translate-y-6 opacity-0 hidden");
  const [hide, setHide] = useState<boolean>(true);

  useEffect(() => {
    logRender({ type: "component", name: "snackbar" });
  }, []);

  useEffect(() => {
    if (duration === 0) {
      setTimeout(() => {
        setHide(true);
      }, 500);
    } else {
      setHide(false);
    }
  }, [duration]);

  useEffect(() => {
    setDuration(props?.duration || 3000);
  }, [props]);

  useEffect(() => {
    if (props.type !== "" && duration > 0) {
      setAnimation("-translate-y-6 opacity-0");
      setTimeout(() => {
        setAnimation("duration-200 translate-y-0 opacity-1");
      }, 100);
      setTimeout(() => {
        setAnimation("duration-500 -translate-y-6 opacity-0");
        setDuration(0);
      }, duration + 100);
    }
  }, [duration, props.type]);

  const closeSnackbar = () => {
    setAnimation("duration-500 -translate-y-6 opacity-0 hidden");
    setDuration(0);
  };

  const classType = (): string => {
    if (props.type === "error") {
      return "bg-red-100 border border-red-300 text-red-500";
    } else if (props.type === "info") {
      return "bg-blue-100 border border-blue-300 text-blue-500";
    } else if (props.type === "success") {
      return "bg-green-100 border border-green-300 text-green-500";
    } else {
      return "";
    }
  };

  return (
    <div className={"z-50 fixed top-0 lg:top-2 w-screen " + (hide ? "hidden" : "")}>
      <div className="max-w-8xl mx-auto flex justify-center lg:justify-end lg:pr-8">
        <div
          className={classType() + " w-full lg:w-fit px-3 py-2 lg:rounded transition-all transform " + animation}
          role="alert"
        >
          <strong className="font-bold pr-2 capitalize">{props.type} : </strong>
          <span className="block sm:inline pr-10">{props.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-2 py-3" onClick={closeSnackbar}>
            <X className="fill-current h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Snackbar;
