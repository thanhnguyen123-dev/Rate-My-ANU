"use client";

import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

export interface FilterState {
  semester1: boolean;
  semester2: boolean;
  summer: boolean;
  winter: boolean;
  spring: boolean;
  autumn: boolean;
}

interface FilterDropdownProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState) => void;
  activeFiltersCount: number;
}

const sessionLabels: Record<keyof FilterState, string> = {
  semester1: "Semester 1",
  semester2: "Semester 2",
  summer: "Summer Session",
  winter: "Winter Session",
  spring: "Spring Session",
  autumn: "Autumn Session",
};

const FilterDropdown = ({ filters, onFilterChange, activeFiltersCount }: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-100">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-500 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Session Offered</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(filters) as Array<keyof FilterState>).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={filters[key]}
            onCheckedChange={() => onFilterChange(key)}
          >
            {sessionLabels[key]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
