import { IoSearchOutline } from "react-icons/io5";


export const SearchBar = () => {
  return (
    <div className="w-[30%] h-10 border border-gray-200 rounded-full flex items-center px-4 bg-[#f9fafb]">
        <IoSearchOutline className="text-gray-400" />
        <input type="text" placeholder="Search..." className="w-[90%] h-full px-2 outline-0 bg-transparent" />
    </div>
  )
}
