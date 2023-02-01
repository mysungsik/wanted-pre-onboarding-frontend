# 소개

지원자 최명식입니다.

깃허브링크 : ...

배포링크 : ...

# 사용된 기술

```
react-router
react
fetch API

```

# 폴더 구성

```
root
├─ public
└── src
    ├─ components      * 컴포넌트들이 들어있습니다.
    │ ├─ home
    │ ├─ layout
    │ ├─ signin
    │ ├─ signup
    │ └─ todo
    └── pages           * pages 들이 들어있습니다.

```

# 프로젝트 실행 방법

1. git clone https://github.com/mysungsik/wanted-pre-onboarding-frontend.git
2. cd "프로젝트명" 을 통해, 해당 프로젝트로 이동
3. npm install 로 node_modules 설치
4. npm start 로 dev서버 실행

### 데모영상은 배포 링크로 대체합니다.

<hr/>

# 과제

<hr/>

## &#10004;로그인 및 회원가입

1. 이메일과 비밀번호의 유효성 검사
2. 유효성을 통과하지 못한다면, button 에 disable 속성 부여
3. 로그인이 정상적으로 이루어졌다면, /todo 경로로 이동
4. 응답받은 JWT 는 로컬스토리지에 저장
5. 로컬 스토리지에 토큰이 없이 /todo 로 이동했다면, /signin 경로로 리다이렉트
6. 로컬 스토리지에 토큰이 있는 상태로 /signup 이나 /signin 으로 이동했다면, /todo 페이지로 리다이렉트

```js

  < component / signin / signin-form.js >

  const SigninForm = () => {
      ...
    const [active, setActive] = useState(false);    // 검증되었다면 active State 가 활성화됩니다.

    useEffect(() => {
      signValidation(inputedEmail, inputedPassword);
    }, [inputedEmail, inputedPassword]);

    const signValidation = (email, password) => {         // signValidation 을 작성하였습니다.
      if (email.includes("@") && password.length >= 8) {
        setActive(true);    // 검증되었다면 active State 가 활성화됩니다.
      } else {
        setActive(false);
      }
    };

    const signinHandler = async (event) => {   // fetch API 를 통해, 로그인을 실행합니다.
      event.preventDefault();

      const response = await fetch(
        "https://pre-onboarding-selection-task.shop/auth/signin",
          ...
        }
      );

      if (!response.ok) {     //  정상적으로 로그인 되었다면, 응답받은 JWT 는 로컬스토리지에 저장합니다
        return;               //  로그인이 정상적으로 이루어졌다면, /todo 경로로 이동합니다
      } else {
        const responseData = await response.json();
        window.localStorage.setItem("access_token", responseData.access_token);
        window.location.replace("/todo");   // 페이지의 새로고침(리렌더)을 위해, window 를 사용하여, 페이지를 변경하였습니다.
      }
    };

    return (

          ...
        <form onSubmit={signinHandler} className={styles.signin__form}>
          <div className={styles.signin__inputDiv}>
              ...
          <div className={styles.signin__buttonDiv}>
            <button
              className="default__button"
              data-testid="signin-button"
              disabled={active ? "" : "disabled"}     // active 가 활성화되지 않는다면, disabled 속성을 부여합니다.
            >
              로그인
            </button>
```

```js

  < pages / signin-page.js >

  import SigninForm from "../components/signin/signin-form";
  import { useHistory } from "react-router-dom";

  const SigninPage = () => {
    const history = useHistory();
    const isLogedIn = window.localStorage.getItem("access_token");  // 로컬스토리지에 토큰이 있는 상태로 접속한다면

    if (isLogedIn) {
      history.replace("/todo");   // redirect 합니다.
    }
      ...

```

```js

  < pages / todo-page.js >

  import TodoForm from "../components/todo/todo-form";
  import { useHistory } from "react-router-dom";

  const TodoPage = () => {
    const history = useHistory();
    const isLogedIn = window.localStorage.getItem("access_token");  // 로컬 스토리지에 토큰이 없이 접속한다면

    if (!isLogedIn) {
      history.replace("/signin");   // redirect 합니다.
    }

```

<hr/>
<hr/>

## &#10004; TODO LIST

1. /todo 에 접속하면 투두 리스트 목록을 볼 수 있습니다.
2. 목록에는 TODO 의 내용과 완료여부(체크박스의 체크) 가 표시되게 합니다.
3. TODO 는 list 태그를 이용하여 감쌉니다.
4. 리스트 페이지에 새로운 TODO 를 입력할 수 있는 버튼을 만듭니다.
5. 체크박스를 통해 완료 여부를 수정합니다.
6. TODO 의 체크박스를 통해 완료 여부를 수정합니다.
7. TODO 우측에 "수정" "삭제" 버튼을 만들고 기능을 구현합니다.
8. "수정" 버튼을 누르면 "수정모드" 가 활성화됩니다.
9. "수정모드" 가 활성화된다면 "span"이 "input" 으로 변하고 "제출", "취소"버튼이 만들어집니다.
10. "제출"을 누르면 업데이트가, "취소"를 누르면 "수정모드" 가 종료됩니다.

### 로직

#### todolist 받아오기

```js

  < components / todo / todo-form.js >

  const TodoForm = (props) => {
    const { access_token } = props; // 상위 컴포넌트로부터 access_token 을 받아옵니다.
    const [todoList, setTodoList] = useState([]); // 투두 리스트 목록을 저장하는 state 입니다.

    useEffect(() => {
      getTodosHandler();  // 초기 렌더시 getTodosHandler 를 통해, 투두 리스트를 받아옵니다.
    }, []);

    const getTodosHandler = async () => {
      const response = await fetch(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,  // access_token 을 사용해 서버와 통신합니다.
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setTodoList(responseData);    // 받아온 값을 State 에 저장하게됩니다.
      }
    };

    ...

```

<hr/>

#### todolist 생성하기

```js

 < components / todo / todo-form.js >

  const TodoForm = (props) => {
    const { access_token } = props;
        ...
    const createTodosHandler = async (todo) => {
      await fetch("https://pre-onboarding-selection-task.shop/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,   // props 로 넘겨받은 access_token 을 사용합니다.
        },
        body: JSON.stringify({
          todo: todo,
        }),
      });

      setNewTodo("");       // 생성하면, newTodo 의 값을 지웁니다.
      getTodosHandler();    // create 를 하고나면, 다시 api 를 사용하여, 데이터값을 받아옵니다.
    };
          ...
    return (
      <div className={styles.todo}>
        <h1> 할일 </h1>
        <div className={styles.todo__inputDiv}>
          <input
            data-testid="new-todo-input"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            className="todo__button"
            data-testid="new-todo-add-button"
            onClick={() => createTodosHandler(newTodo)}
          >
            추가
          </button>

```

<hr/>

#### todolist 업데이트하기 및 삭제

- <strong> checkbox 업데이트의 경우</strong>

```

1. 해당 checkbox 가 check되어있는지, event.targe.check 를 인수로 사용하여, 함수를 실행합니다.
2. 함수안에서 각 값을 가지고 fetch(UPDATE) 를 실행합니다.

```

- <strong> todo 값의 변화의 경우</strong>

```

1.  <strong>수정</strong> 버튼을 누를시, <strong>EditMode State</strong> 에 누른 버튼이 존재하는 List 의 id 를 저장합니다.
2.  만약 <strong>EditMode</strong> 의 값이 <strong>현재 자기 자신이 속한 List의 id 와 같다면</strong> <strong>수정모드</strong> 가 활성화됩니다.
3.  <strong>수정모드</strong> 가 활성화되면 List 에서는 span 이 Input 으로 변경됩니다.
4.  EditInput 의 값을 State 안에 저장하고, <strong>제출</strong> 버튼을 누른다면 updateHandler 를 사용하여 수정된 값을 fetch(UPDATE) 합니다.
5.  <strong>제출</strong> 이나 <strong>취소</strong> 를 누를경우, EditInput State 의 값을 비우고, EditMode 안의 값을 null 로 만들어, EditMode 를 종료합니다.

```

```js

  < components / todo / todo-form.js >

  const TodoForm = (props) => {
    const { access_token } = props;
      ...
    const [editTodo, setEditTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editMode, setEditMode] = useState();

        ...
    const updateTodosHandler = async (id, todo, isCompleted) => {   // update api 를 사용하여 값을 업데이트합니다.
      await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          todo,
          isCompleted,
        }),
      });

      getTodosHandler();    // 업데이트 된 후엔, 서버에서 다시 값을 받아옵니다.
    };

    const deleteTodosHandler = async (id) => {    // delete api 를 사용하여 값을 삭제합니다.
      await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      getTodosHandler();    // 삭제 후엔, 서버에서 다시 값을 받아옵니다.
    };

    const allTodoList = todoList.map((item) => (      // State 의 값을 사용해, <li> 를 만듭니다.
      <li key={item.id} className={styles.todo__list}>
        <label>
          <input
            type="checkbox"
            defaultChecked={item.isCompleted ? "checked" : ""}  // defaultChecked 를 통해, 받아온 값의 "완료여부" 를 체크합니다.
            onChange={(e) =>
              updateTodosHandler(item.id, item.todo, e.target.checked)  // TODO 의 체크박스를 통해 완료 여부를 서버에 업데이틀합니다.
            }
          />
          {editMode === item.id ? (
            <input
              className={styles.todo__editInput}              // "수정모드" 가 활성화된다면 span 이 아니라 input 으로 변경됩니다.
              data-testid="modify-input"
              onChange={(e) => setEditTodo(e.target.value)}   // "수정모드" 에서의 state 값을 따로 저장합니다.
            />
          ) : (
            <span>{item.todo}</span>
          )}
        </label>

        {editMode === item.id ? (   // "수정모드" 가 활성화된다면 "제출", "취소" 버튼으로 변경됩니다.
          <div>
            <button
              className="todo__button__ok"
              data-testid="submit-button"
              onClick={() => {
                updateTodosHandler(item.id, editTodo, item.isCompleted);  // "수정모드" 에서의 값을 적고나서 업데이트합니다.
                setEditMode(null);
              }}
            >
              제출
            </button>
            <button
              className="todo__button__cancel"  // "취소" 를 누르면, EditMode 를 종료하고, EditTodo 에 썻던 값을 지웁니다.
              data-testid="cancel-button"
              onClick={() => {
                setEditMode(null);
                setEditTodo("");
              }}
            >
              취소
            </button>
          </div>
        ) : (
          <div>
            <button
              className="todo__button__ok"    // "수정모드" 가 아니라면 "수정", "삭제" 버튼으로 변경됩니다.
              data-testid="modify-button"
              onClick={() => setEditMode(item.id)}  // "수정" 버튼을 누르면 "수정모드" 가 활성화됩니다.
            >
              수정
            </button>
            <button
              className="todo__button__cancel"
              data-testid="delete-button"
              onClick={() => deleteTodosHandler(item.id)}
            >
              삭제
            </button>
          </div>
        )}
        <hr className="default__line" />
      </li>
    ))

    return (
      <div className={styles.todo}>
        <h1> 할일 </h1>
            ...
        <ul className={styles.todo__lists}>{allTodoList}</ul>
      </div>
  );

```
