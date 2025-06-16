"use client";

import CourseGrid from "@/components/course/courses-grid";
import SearchBar from "@/components/ui/search-bar";
import FilterDropdown, { type FilterState } from "@/components/dashboard/filter-dropdown";
import SortDropdown, { type SortOption, type SortDirection } from "@/components/dashboard/sort-dropdown";
import { Stack } from "@mui/material";
import { useState } from "react";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    semester1: false,
    semester2: false,
    summer: false,
    winter: false,
    spring: false,
    autumn: false,
  });
  const [sortBy, setSortBy] = useState<SortOption>("courseCode");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleFilterChange = (key: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Stack direction="column" spacing={2}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={2}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="w-full"
        />
        <Stack 
          direction="row" 
          spacing={2} 
          className="w-full sm:w-auto"
        >
          <SortDropdown
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onDirectionChange={setSortDirection}
            className="w-full"
          />
          <FilterDropdown
            filters={filters}
            onFilterChange={handleFilterChange}
            activeFiltersCount={activeFiltersCount}
            className="w-full"
          />
        </Stack>
      </Stack>
      <CourseGrid 
        searchQuery={searchQuery}
        filters={filters}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </Stack>
  )
}

export default CoursesPage;