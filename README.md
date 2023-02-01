# 소개

지원자 최명식입니다.

깃허브링크 : ...

배포링크 : ...

# 사용된 기술

```
react-router
react
fetch API

# 폴더 구성
```

```
root
├─ public
└── src
    ├─ components
    │ ├─ home
    │ ├─ signin
    │ ├─ signup
    │ └─ todo
    └── pages

```

# 프로젝트 실행 방법

1. git clone
2. cd 프로젝트명 을 통해, 해당 프로젝트로 이동
3. npm install
4. npm start

### 데모영상은 배포 링크로 대체합니다.

# 로직

#### todolist 받아오기

<hr>
#### todolist 생성하기
...
<hr>
#### todolist 삭제하기
..
<hr>
#### todolist 업데이트하기

- <strong>checkbox 의 경우</strong>

1.  해당 checkbox 가 check되어있는지, event.targe.check 를 사용하여 함수를 실행합니다.
    함수안에서 각 값을 가지고 fetch 를 실행합니다.

- <strong>값의 변화의 경우</strong>

1.  "수정" 버튼을 누를시, EditMode State 에 누른 버튼이 존재하는 List 의 id 를 저장합니다.
2.  만약 EditMode 의 값이 현재 자기 자신이 속한 List의 id 와 같다면 해당 List 에서는 span 이 Input 으로 변경됩니다.
3.  Edit된 Input 의 값을 State 안에 저장하고, "제출" 버튼을 누른다면 updateHandler 를 사용하여 fetch 합니다.
4.  "제출" 이나 "취소" 를 누를경우, Edit 된 Input State 의 값을 비우고, EditMode 안의 값을 null 로 만들어, EditMode 를 종료합니다.
