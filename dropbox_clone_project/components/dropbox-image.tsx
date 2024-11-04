import { IconButton } from "@material-tailwind/react";

export default function DropboxImage() {
  return (
    <div className="relative w-full flex flex-col p-4 gap-2 border border-gray-100 rounded-2xl shadow-md">
      <div>
        <img
          src="/images/cutedog.jpeg"
          alt="dropbox Image"
          className="!w-full !aspect-square rounded-2xl"
        />
      </div>
      <div className="">cutedog.jpeg</div>
      <div className="absolute top-4 right-4">
        <IconButton color="red" onClick={() => {}}>
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
