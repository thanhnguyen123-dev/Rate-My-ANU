"use client";

import CourseGrid from "@/components/dashboard/courses-grid";
import SearchBar from "@/components/ui/search-bar";
import FilterDropdown, { type FilterState } from "@/components/dashboard/filter-dropdown";
import { Stack } from "@mui/material";
import { useState } from "react";
import { api } from "@/trpc/react";

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

  const handleFilterChange = (key: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <FilterDropdown 
          filters={filters}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
        />
      </Stack>
      <CourseGrid 
        searchQuery={searchQuery}
        filters={filters}
      />
    </Stack>
  )
}

export default CoursesPage;