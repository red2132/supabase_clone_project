# supabase 기반 clone project

사용언어: typescript  
프레임워크: next.js 14, react.18, react-query, tailwind

## 1. todo list

![image](https://github.com/user-attachments/assets/ba6925d0-a071-443b-8862-7de18b00a20c)  
supabase에 만들어둔 데이터베이스를 기반으로 간단한 crud 구현

- 서버액션으로 crud 구현
- react-query를 이용해 api 호출 및 로딩 중과 같은 상태 관리 구현

## 2. Dropbox clone

![dropbox-clone-project-Chrome-2024-11-04-19-22-15](https://github.com/user-attachments/assets/ad4d57b0-050f-425d-84a6-1b7ced3f1ad1)  
이미지 드래그 앤 드랍 업로드 구현

- supabase bucket을 이용해 파일 업로드 및 삭제 구현
- supabase bucket 생성 및 CRUD Policy 설정
- Promise.All을 이용한 멀티 업로드 구현
- react-dropzone 라이브러리를 이용한 drag-drop UI 및 기능 구현

## 3. Neflix clone

![netflix clone project - Chrome 2024-11-06 16-37-06](https://github.com/user-attachments/assets/0b4d8f61-f0aa-4950-a0b2-3ab6cfe6ce62)  
게시물 무한 스크롤 구현

- react-query의 useInfiniteQuery를 이용한 무한 스크롤 이벤트 구현
- react-intersection-observer의 useInView를 이용해 끝까지 내릴 경우 무한 스크롤을 일으키는 트리거 설정
