# mini-project

### Front-end && Back-end
Front: vaillaJS, Bootstrap, HTML/CSS

Back: python, flask, JWT, mongoDB

### 구현기능

1. 로그인
- JWT 적용 / 토큰 만료 시간 설정

2. 회원가입
- 유효성 검사

3. 게시글 작성

4. 게시글 불러오기

5. 댓글작성

---
### [와이어 프레임]
![9조미니프로젝트](https://user-images.githubusercontent.com/105340187/201684045-9c72bff7-c49c-4f3a-bdd1-4e0ccabca88b.png)

### [API 명세서] 
<img width="1308" alt="스크린샷 2022-11-15 13 49 45" src="https://user-images.githubusercontent.com/105340187/201829198-1e55b12a-57a8-4c89-8add-5a5d7e6e0d06.png">

---
### [트러블 슈팅]
- 유효성 검사의 조건을 구축하는데 많은 생각이 필요했고, 예상치 못하게 조건이 충족되지 않았음에도 넘어가는 상황 발생
> 해결: 순서를 생각하고 하나씩 차근차근 시도해가며 해결
- 오타로 인해 발생한 에러로 약간의 시간 소요
> 해결: 찾아서 해결
- 팀원의 로컬 환경에서 코드가 돌아가지 않는 상황 발생
> 해결: intel 맥에서 발생되는 에러로 파악됨. `certifi` 라는 python module을 통해 해결
- 로그인 후 jwt에 의해 token의 유효기간 만료 이후 화면이 변하지 않음
> 페이가 새로고침 될 시 서버에서 주는 로그인 만료 정보를 받아 이를 해결
