# React Todo App

## 프로젝트 목적
react query를 공부하고 더 나은 코드를 작성하기 위해 프리 온보딩 챌린지(종료)의 커리큘럼을 스스로 따라하며 공부하기

## 프로젝트 과정
1. 투두앱을 생성하고 3주간 리팩토링하며 UX를 고려한 추가 기능을 구현
2. 매주 팀원들끼리 코드 리뷰하는 시간 가지기
3. 고민 해결 과정과 새로 배운 내용들을 블로그에 정리
---
### 1차 리팩토링
- [Pull Request](https://github.com/kwonhygge/react-todo-app/pull/1)
- [블로그 1/2](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%A3%BC%EC%B0%A8)
- [블로그 2/2](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%A3%BC%EC%B0%A8-22-1%EC%B0%A8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)

### 2차 리팩토링
- [Pull Request](https://github.com/kwonhygge/react-todo-app/pull/2)
- [블로그 1/2](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%9E%84%EC%8B%9C%EC%A0%80%EC%9E%A5)
- [블로그 2/2](https://velog.io/@kwonhygge/react-todo-app-2%EC%B0%A8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-22)

## 프로젝트 설치 및 실행
```
npm install
```

```
// 클라이언트
cd client
npm start

// 서버
cd server
npm start
```

## 기능

### Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [X] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [X] 이메일 조건 : 최소 `@`, `.` 포함
  - [X] 비밀번호 조건 : 8자 이상 입력
  - [X] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [X] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [X] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [X] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [X] 목록 / 상세 영역으로 나누어 구현해주세요
  - [X] Todo 목록을 볼 수 있습니다.
  - [X] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [X] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [X] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [X] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [X] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [X] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다



## 폴더 구조
```
├── App.tsx
├── atoms
│   ├── index.ts
│   └── snackbar.ts
├── components
│   ├── index.ts
│   └── todo
│       ├── Create.tsx
│       ├── Delete.tsx
│       ├── Detail.tsx
│       ├── Edit.tsx
│       ├── Form.tsx
│       ├── List.tsx
│       └── index.ts
├── constants
│   ├── common.ts
│   ├── endpoint.ts
│   ├── index.ts
│   ├── name.ts
│   └── url.ts
├── hooks
│   └── apis
│       ├── auth
│       │   ├── index.ts
│       │   ├── useLogin.ts
│       │   └── useSignUp.ts
│       ├── index.ts
│       └── todo
│           ├── index.ts
│           ├── useCreateTodoItem.ts
│           ├── useDeleteTodoItem.ts
│           ├── useEditTodoItem.ts
│           ├── useGetTodoList.ts
│           └── useGetTodoListItem.ts
├── index.tsx
├── interfaces
│   ├── common.ts
│   └── index.ts
├── libs
│   ├── index.ts
│   └── instance.ts
├── pages
│   ├── Error.tsx
│   ├── Root.tsx
│   ├── TodoIndex.tsx
│   ├── auth
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   └── index.ts
│   └── index.ts
├── react-app-env.d.ts
├── reportWebVitals.ts
├── routes
│   ├── index.ts
│   ├── loaders
│   │   ├── auth
│   │   │   └── logout.ts
│   │   ├── main.ts
│   │   └── todo
│   │       └── list.ts
│   └── router.tsx
├── styles
│   └── GlobalStyle.js
└── utils
    └── regex.ts
```
---
|폴더|설명|
|---|---|
|atoms|recoil의 atoms를 모아놓은 폴더|
|components|공통 컴포넌트와 서비스 구분에 따라 컴포넌트를 분리해놓은 폴더|
|constants|상수들을 모아놓은 폴더|
|hooks|일반 커스텀 훅과 react-query의 api 커스텀 훅들을 모아놓은 폴더|
|interfaces|컴포넌트의 props나 데이터의 타입 등 interface들을 모아놓은 폴더|
|libs|axios instance와 같이 함수는 아니지만 재사용이 가능한 코드들을 모아놓은 폴더|
|pages|라우팅되는 페이지들을 모아놓은 폴더|
|routes|router를 구현하고 loader를 분리하여 모아놓은 폴더|
|styles|글로벌 스타일이나 theme 등을 저장해놓는 폴더|
|utils|특정 서비스에 종속되지 않은 유틸 함수나 정규 표헌식을 저장해놓는 폴더|

## 사용 라이브러리
`React` `react-query` `recoil` `react-hook-form` `emotion js` `mui`

### react-query
- Server State를 관리하는 라이브러리로 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트 하는 작업을 도와줌
- 장점
  1. 캐싱
  - API 쿼리를 캐싱하여 서버의 부담을 줄여주고 전역 상태 라이브러리를 사용하지 않고도 props drilling을 방지할 수 있음
  - single source of truth 원칙을 지키며 데이터를 fresh하게 관리할 수 있음
  2. 데이터 전처리나 후처리를 위한 커스텀 쿼리 작성하여 재사용 가능
  3. `useGetTodoList`와 같이 훅 형태로 쿼리를 작성하여 직관적인 사용 가능

### recoil
- 페이스북에서 만든 상태관리 라이브러리
- 장점
  1. 기존의 redux, mobx처럼 복잡한 상태구조를 가지고 있지 않으며 사용법 또한 매우 간단한 편
  2. 현 프로젝트에서는 페이지 이동시에도 snackbar가 안정적으로 띄워질 수 있도록 전역으로 상태를 관리하기 위해 사용

### react-hook-form
- 복잡한 form을 쉽고 간결하게 구현하도록 도와주는 라이브러리
- 장점
  1. 비제어 컴포넌트로 여러개의 input 값 변화에 따른 불필요한 리렌더링 방지
  2. `isValid`나 `errors` 같은 값을 제공하여 유효성 검사에 따른 처리를 쉽게 구현 가능
  3. `useFormContext` 같은 훅을 제공하여 컴포넌트를 잘게 쪼개더라도 props drilling을 방지할 수 있음
  3. 코드의 일관성 확보

### emotion js
- CSS-in-JS의 종류 중 하나로 JavaScript 안에서 스타일을 작성할 수 있게 해줌
- 장점
  1. Css in Js의 장점
  - CSS의 컴포넌트화로 스타일시트의 파일을 유지보수 할 필요가 없다
  - CSS-in-JS는 JavaSript 환경을 최대한 활용 할 수 있다
  - JavaScript와 CSS 사이의 상수와 함수를 쉽게 공유 할 수 있다
  2. [css prop](https://emotion.sh/docs/css-prop)을 통해 기존 인라인으로 사용할 수 없었던 media query, pseudo selector, nested selector 등을 사용할 수 있음
  3. [Styled Component](https://styled-components.com/docs/advanced#streaming-rendering)와 달리 SSR에서 별도의 설정 없이 동작 가능 ([참고](https://emotion.sh/docs/ssr#gatsby-focus-wrapper))

### mui
- 구글의 디자인 철학인 Material Design을 구현한 자바스크립트 라이브러리
- 장점
1. 디자인과 확장성이 보장된 컴포넌트를 쉽게 불러다 사용할 수 있어 개발시간을 단축할 수 있음
