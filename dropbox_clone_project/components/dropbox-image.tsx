import { IconButton } from "@material-tailwind/react";
import getImageUrl from "utils/supabase/storage";

export default function DropboxImage({ image }) {
  return (
    <div className="relative w-full flex flex-col p-4 gap-2 border border-gray-100 rounded-2xl shadow-md">
      <div>
        <img
          src={getImageUrl(image.name)}
          alt="dropbox Image"
          className="!w-full !aspect-square rounded-2xl"
        />
      </div>
      <div className="">{image.name}</div>
      <div className="absolute top-4 right-4">
        <IconButton color="red" onClick={() => {}}>
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
