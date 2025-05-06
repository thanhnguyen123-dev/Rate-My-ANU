"use client";

import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

export type SortOption = "courseCode" | "name";
export type SortDirection = "asc" | "desc";

interface SortDropdownProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
}

const sortLabels: Record<SortOption, string> = {
  courseCode: "Course Code",
  name: "Course Name",
};

const SortDropdown = ({ 
  sortBy, 
  sortDirection, 
  onSortChange, 
  onDirectionChange 
}: SortDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 h-10 text-sm border rounded-full hover:bg-gray-100">
        <ArrowUpDown className="w-4 h-4" />
        Sort
        <span className="text-gray-500">
          ({sortLabels[sortBy]} - {sortDirection === "asc" ? "A→Z" : "Z→A"})
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          {Object.entries(sortLabels).map(([value, label]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Direction</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortDirection} onValueChange={(value) => onDirectionChange(value as SortDirection)}>
          <DropdownMenuRadioItem value="asc">Ascending (A→Z)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Descending (Z→A)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
