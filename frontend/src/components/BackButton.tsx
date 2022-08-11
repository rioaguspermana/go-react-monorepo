import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/outline";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="block w-auto px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded font-semibold text-sm"
    >
      <div className="flex">
        <ArrowLeftIcon className="w-5 h-5 mr-2 stroke-white fill-tranparent" aria-hidden="true" />
        Back
      </div>
    </button>
  );
}

export default BackButton;
