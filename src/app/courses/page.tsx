"use client";

import CourseGrid from "@/components/dashboard/courses-grid";
import SearchBar from "@/components/ui/search-bar";
import { Stack } from "@mui/material";
import { useState } from "react";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Stack direction="column" spacing={2}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CourseGrid 
        searchQuery={searchQuery}
      />
    </Stack>
  )
}

export default CoursesPage;