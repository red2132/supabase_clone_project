"use client";

import Link from "next/link";
import { Movie } from "types_db";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="col-span-1 relative">
      <img src={movie.image_url} className="w-full" alt={movie.title} />
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
          <div className="text-xl font-bold text-white">{movie.title}</div>
        </div>
      </Link>
    </div>
  );
}
