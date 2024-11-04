"use client";

import { useQuery } from "@tanstack/react-query";
import DropboxImage from "./dropbox-image";
import { searchFile } from "actions/storageActions";
import { Spinner } from "@material-tailwind/react";

export default function DropboxImageList({ searchInput }) {
  const searchInputQuery = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFile(searchInput),
  });
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
      {searchInputQuery.isLoading && <Spinner />}
      {searchInputQuery.data &&
        searchInputQuery.data.map((image) => (
          <DropboxImage key={image.id} image={image} />
        ))}
    </section>
  );
}
