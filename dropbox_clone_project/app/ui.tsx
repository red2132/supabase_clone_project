"use client";

import DropboxDrapDropZone from "components/dropbox-drapdrop-zone";
import DropboxImageList from "components/dropbox-image-list";
import Logo from "components/logo";
import SearchComponent from "components/search-component";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <main className="w-full p-2 flex flex-col gap-4">
      <Logo />
      <SearchComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <DropboxDrapDropZone />
      <DropboxImageList searchInput={searchInput} />
    </main>
  );
}
