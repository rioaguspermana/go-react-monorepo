
// Icons
import { HeartIcon } from "@heroicons/react/outline";

function Credit() {
    return (
        <div className="w-screen fixed bottom-0 bg-slate-100 border-t border-dashed border-slate-500 py-4 flex justify-center">
            <div className="flex text-gray-500">
                Crafted with
                <HeartIcon className="w-4 text-red-500 mx-1" />
                By: <a className="text-blue-700 ml-1" href="mailto:rioaguspermana@gmail.com">Rio Agus Permana</a>
            </div>
        </div>
    );
}

export default Credit;
