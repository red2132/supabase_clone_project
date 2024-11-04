"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useRef } from "react";

export default function DropboxDrapDropZone() {
  const fileRef = useRef(null);

  // 캐시 날림
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const file = fileRef.current.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadImageMutation.mutate(formData);
          console.log(result);
        }
      }}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center"
    >
      <input type="file" ref={fileRef} className="" />
      <p>이미지 파일을 여기에 끌어다 주세요</p>
      <Button loading={uploadImageMutation.isPending} type="submit">
        파일 업로드
      </Button>
    </form>
  );
}
