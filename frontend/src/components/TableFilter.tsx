import { useState } from "react";
import { useAsyncDebounce } from "react-table";

function TableFilter(props: { search: (filterValue: any) => void }) {
  const [value, setValue] = useState("");
  const onChange = useAsyncDebounce((value) => {
    props.search(value || undefined);
  }, 200);

  return (
    <div className="w-full flex relative after:content-['🔎'] after:absolute after:left-3 after:top-[2px] after:pointer-events-none">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="w-full border-2 rounded-2xl pl-10 pr-4 outline-none text-stone-800 focus:border-blue-300"
      />
    </div>
  );
}

export default TableFilter;
