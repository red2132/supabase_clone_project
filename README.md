# 웹사이트 클론 프로젝트

사용언어: typescript 
사용 DB: supabase
프레임워크: next.js 14, react.18, react-query, tailwind

## 프로젝트 목표
supabase를 기반으로 해서 dropbox의 드래그 앤 드롭 파일 업로드, netflix의 무한 스크롤, instagram의 로그인 및 실시간 채팅 구현

## 1. todo list(연습)

![image](https://github.com/user-attachments/assets/ba6925d0-a071-443b-8862-7de18b00a20c)  
supabase에 만들어둔 데이터베이스를 기반으로 간단한 crud 구현

- 서버액션으로 crud 구현
- react-query를 이용해 api 호출 및 로딩 중과 같은 상태 관리 구현
- supabase 연동 연습

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
[배포 사이트](https://netflix-clone-project-phi.vercel.app/)  

- react-query의 useInfiniteQuery를 이용한 무한 스크롤 이벤트 구현
- react-intersection-observer의 useInView를 이용해 끝까지 내릴 경우 무한 스크롤을 일으키는 트리거 설정

 ## 4. instagram clone
 ![instagram-clone-project](https://github.com/user-attachments/assets/66be07d3-cfcb-45e3-8b6a-04370bee2fc1)  
 카카오 로그인 및 실시간 채팅 구현  
 [배포 사이트](https://instagram-clone-project-one.vercel.app/)  
- 카카오 디벨로퍼로 애플리케이션을 만들어 supabase와 연결
- supabase의 realtime 기능을 이용한 실시간 채팅 구현
 

## 프로젝트 후기
이번 프로젝트를 통해 supabase로 간단하게 db를 연결할 수 있다는 점을 알았다. 그리고, react query를 이용해 무한 스크롤을 구현하면서 다음번엔 javascript로 구현해 봐야겠다는 생각이 들었다. 마지막으로 도메인이 없어서 이메일 인증을 구현을 못하고 마무리했는데 다음번엔 이 부분도 구현해 보고 싶다.
