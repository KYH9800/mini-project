# mini-project

### Front-end && Back-end

#### Front:
- vaillaJS
- Bootstrap
- HTML/CSS

#### Back:
- python
- flask
- JWT
- mongoDB

---

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

### 프로젝트 이미지
#### 1. 메인 화면
![image](https://user-images.githubusercontent.com/61128538/202897320-2264de4c-b0b0-41a8-ad8b-bbf809de7524.png)

#### 2. 회원가입 화면
![image](https://user-images.githubusercontent.com/61128538/202897358-70ceb053-3683-4ccc-bab6-7666b5ec81f3.png)
![image](https://user-images.githubusercontent.com/61128538/202897384-f8e152e8-7fd0-4dfd-a717-6d28ff33c4d4.png)

#### 3. 로그인
![image](https://user-images.githubusercontent.com/61128538/202897456-6cacfa02-c46f-48e2-a791-cd3900eca391.png)

#### 4. 게시글 작성
![image](https://user-images.githubusercontent.com/61128538/202897479-973b2765-b02f-4d4f-903e-4f04dbedc207.png)
![image](https://user-images.githubusercontent.com/61128538/202897492-97cee8e3-fd5c-4175-bfdd-86cf81ea9155.png)

#### 5. 댓글 작성
![image](https://user-images.githubusercontent.com/61128538/202897522-3e25e4ab-d2c1-40c2-91d5-4b4e9b781b7d.png)
![image](https://user-images.githubusercontent.com/61128538/202897528-a2885f1f-7828-458e-964b-fd9cda8bf763.png)

#### 6. 게시글 삭제(본인의 글만 삭제 가능)
![image](https://user-images.githubusercontent.com/61128538/202897557-c59ca4c5-6a3c-4ffd-ac0d-469752c03513.png)
![image](https://user-images.githubusercontent.com/61128538/202897571-c57241d1-0f78-464e-9bb0-d351ceb3db47.png)
![image](https://user-images.githubusercontent.com/61128538/202897585-974c9516-0a15-442f-976c-4022f2ec5711.png)

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
