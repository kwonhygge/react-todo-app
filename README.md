# React Todo App

## 📌 프로젝트 목적
react query를 공부하고 여러 차례 리팩토링하여 더 좋은 퀄리티의 코드 작성하기

## 🗒 프로젝트 상세
- 과정
  - `1주차` [앱 생성 및 1차 리팩토링](https://github.com/kwonhygge/react-todo-app/pull/1)
  - `2주차` [2차 리팩토링](https://github.com/kwonhygge/react-todo-app/pull/2)
  - `3주차` 3차 리팩토링
  
- 매주 팀원들끼리 코드 리뷰 + 고민 해결 과정과 새로 배운 내용들을 블로그에 정리

---

## 🔢 목차
- [1) 프로젝트 설치 및 실행](#id-section2)
- [2) 미리보기](#id-section3)
- [3) 요구 사항](#id-section4)
- [4) 폴더 구조](#id-section5)
- [5) 사용 라이브러리](#id-section6)
- [6) 트러블슈팅 경험](#id-section7)
  - [1. 사용자에게 적절한 컴포넌트로 안내 제공하기](#id-section10)
  - [2. axios instance로 반복되는 코드 줄이기](#id-section11)
- [7) 아쉬웠던 점](#id-section8)
- [8) 느낀점](#id-section9)


<div id='id-section2'/>

## 🎒 프로젝트 설치 및 실행
```sh
$ yarn install
$ yarn start
```

<div id='id-section3'/>

## 👀 미리보기

<div id='id-section4'/>

## 🔎 요구사항

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

<div id='id-section5'/>

## 🧩 폴더 구조
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

<div id='id-section6'/>

## 🛠 사용 라이브러리
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
  
<div id='id-section7'/>

## 🤓트러블 슈팅 경험
> 이곳에는 대표적인 트러블 슈팅 경험만 작성하였습니다. 이외에도 제가 배운 것들은 블로그([1번](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%A3%BC%EC%B0%A8), [2번](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%A3%BC%EC%B0%A8-22-1%EC%B0%A8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81), [3번](https://velog.io/@kwonhygge/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%9E%84%EC%8B%9C%EC%A0%80%EC%9E%A5), [4번](https://velog.io/@kwonhygge/react-todo-app-2%EC%B0%A8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-22))에 작성되어 있으니 참고해주시면 감사하겠습니다.

<div id='id-section10'/>

### 1. 사용자에게 적절한 컴포넌트로 안내 제공하기
로그인이나 회원가입 등의 요청이 성공했을 때 적절히 안내해주는 컴포넌트를 추가해야겠다고 생각했다. 하지만 Dialog, Toast, Snackbar 등 다양한 컴포넌트 중 어떤 것을 사용해야 할 지 몰라 찾아보게 되었다.

#### Dialog, Toast, Snackbar의 차이
[Android Developers 공식 채널의 영상](https://www.youtube.com/watch?reload=9&v=puhfMX8jb9c)에서 세가지의 차이를 알 수 있었다.

1. **Dialog**<br/>
Dialog는 중요한 정보를 전달하거나 유저의 결정이 필요한 상황에 사용한다. 창 안에 유저가 클릭할 수 있는 두가지 정도의 액션을 넣어서 제공할 수 있다. 하지만 유저들이 멈춰서 dialog를 처리해야하므로 방해받는다 느낄 수 있다. 그러므로 신중하게 사용해야 한다.

2. **Toast**<br/>
Toast는 동작에 대한 간단한 피드백을 보여주는 팝업이다. 사용자를 방해할 일은 없지만 삭제 요청을 빠르게 취소하고 싶거나 액션이 필요한 상황에는 적합하지 않다.

3. **Snackbar**<br/>
Snackbar는 위의 두가지를 적절히 섞어 놓은 느낌 같다. 피드백을 보여주면서도 유저에게 액션을 제공할 수 있다. 영상에서는 애매한 상황에서 snackbar를 사용하는 게 적절하다고 말한다.

고민한 끝에 Snackbar를 사용하기로 결정했다. 추후 투두 아이템을 삭제한 후 바로 취소하는 기능도 넣을 예정이기 때문에 사용자에게 액션을 제공할 수 있는 snackbar가 필요할 것이라 판단했다.

<div id='id-section11'/>

### 2. axios instance 생성
기존 코드
```js
const { data: todoListData, refetch } = useQuery<
    unknown,
    unknown,
    TodoListItem[]
  >({
    queryKey: ["todoList"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/todos", {
        headers: {
          Authorization: token,
        },
      });

      return response?.data?.data;
    },
  });
```
기존에 axios로 요청을 할때마다 http://localhost:8080 이라는 같은 url을 반복해서 써줘야하는 것이 가독성도 좋지 않고 비효율적이라 느껴졌다. 또 headers에 token을 넣어주었는데 요청마다 계속 반복되어서 찝찝한 기분이 들었다.

반복되는 코드는 분명 해결할 방법이 있을거라 생각했고 구글링해보니 axios로 instance를 만드는 방법이 있었고 위의 문제들을 해결할 수 있었다. 

아래 코드처럼 instance의 interceptor를 사용해서 then이나 catch로 처리되기 전에 요청이나 응답을 가로챌 수 있다. instance를 생성하면서 baseUrl을 지정해줄 수 있었고 요청을 하기전에 headers에 token을 넣어줄 수 있었다. 
<br/>추가로 얻은 수확도 있었는데 응답을 가로챌 때 response.data.data로 destructuring을 한 결과를 내보내줄 수 있게 되었다. 이전에는 위의 코드(`response?.data?.data`)처럼 매번 지저분하게 return 해줬어야 했는데 말이다.

```js
...
const token = localStorage.getItem(TOKEN);

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
});

// 요청 가로채기
instance.interceptors.request.use(
  function (config) {
  	// headrs가 undefined일 수 있다는 type error를 해결하기 위해 넣은 코드
    config.headers = config.headers ?? {};

    if (!!token) {
      config.headers["Authorization"] = token;
    }

    config.headers["Content-Type"] = "application/json; charset=utf-8";

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 가로채기
instance.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
```

이제 아래처럼 훨씬 간결한 코드를 작성할 수 있게 되었다.

```js
const { data: todoListData, refetch } = useQuery<
    unknown,
    unknown,
    TodoListItem[]
  >({
    queryKey: ["todoList"],
    queryFn: async () => {
      return instance.get("todos");
    },
  });
```

<div id='id-section8'/>
  
## 🧠 아쉬웠던 점
마지막에 회사 일이 바빠지고 위염이 심해지면서 3차 리팩토링을 하지 못했다. 올해가 가기 전에 꼭 다시 리팩토링을 하고 말거다.<br />
팀원들에게서 받는 코드 리뷰로 정말 많은 것을 배웠는데 마지막 Pull Request는 썰렁할 것 같아서 아쉬운 마음이 든다. <br />
하지만 끝까지 마무리 짓는 것에 의의를 두고 포기하지 않을 생각이다.

<div id='id-section9'/>
  
## 💪 느낀점
1. **공식문서의 중요성**<br/>
  에러처리를 할 차례였는데 react-query를 처음 다루다보니 막막했다. 팀원분을 통해 공식문서를 자세히 읽어보는 게 얼마나 중요한지 배웠기 때문에 가장 먼저 읽어보기로 했다.<br/>
  공식문서와 문서에 소개된 [tkdodo의 블로그](https://tkdodo.eu/blog/practical-react-query)를 찬찬히 읽어봤더니 쉽고 간결하게 구현하는 방법이 나와 있었다. <br/>
  구현하는 데 급급했더라면 오히려 오래 걸릴수도 있던 일이었는데 기초에 충실함으로서 더 안정감 있는 코드를 작성할 수 있었다.
  
2. **완벽주의 버리기**<br/>
  첫주에 완벽하게 작업하려고 너무 많은 것을 생각하다보니 오히려 구현사항을 놓치게 되었다. 2주차 때는 구현사항에만 집중한채로 코드를 작성했고 그렇게 기본 바탕이 생기니 리팩토링하는 게 더 쉬웠다. <br/>처음부터 완벽한 코드는 없으니 주어진 목표를 이루는 데 집중하고 추후 리팩토링하는 게 중요하다는 것을 배웠다. 
  
3. **다양한 코드 접하기**<br/>
  같은 구현사항을 다양한 사람이 만들다보니 더욱 더 내 코드와 비교분석해보기 좋았다. 프로젝트 구조를 잡는 법, 사용된 라이브러리 등 모든 것이 달라서 시야를 넓힐 수 있었다. 더 나은 사용자 경험을 위해 각자 고민한 지점도 달라서 내가 놓쳤던 부분들도 머릿속에 더 깊이 새길 수 있었다.
