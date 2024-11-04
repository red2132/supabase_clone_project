"use-client";

import { Input } from "@material-tailwind/react";

export default function SearchComponent({ searchInput, setSearchInput }) {
  return (
    <Input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      label="search Image"
      icon={<i className="fa-solid fa-magnifying-glass" />}
    />
  );
}
