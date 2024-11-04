"use client";

export default function DropboxDrapDropZone() {
  return (
    <section className="w-full py-20 border-4 border-dotted border-indigo-700 flex-col items-center justify-center">
      <input type="file" className="" />
      <p>파일을 여기에 끌어다 주세요</p>
    </section>
  );
}
