import { type Dispatch, type SetStateAction } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  className?: string;
}

const SearchBar = ({ searchQuery, setSearchQuery, className }: SearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={cn("relative w-1/2 max-w-2xl", className)}>
      <input
        type="text"
        placeholder="Search for a course..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full h-10 px-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        aria-label="Search courses"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBar;
