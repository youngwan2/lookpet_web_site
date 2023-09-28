## 사이트명(프로젝트명) - 작성중
- Look pet

<p align="center">
<img src="https://github.com/youngwan2/lookpet_web_site/assets/107159871/5a8a29e0-fcdd-4ba9-83a0-3c836f2ff920)" alt="main_image" width="550" height="500" style="text-align:center">
</p>

## 사용된 라이브러리 및 프레임워크
### 프론트엔드
- Vue3.js
- Vue Router
- Axios
- VueQuill : 게시판 에디터
- OpenAI : gpt3.5

### 백엔드
- node.js(express)

### 데이터베이스
- MongoDB(mongoose)


## 아키텍처
- 준비중..

## 배포
- 계획중..

## 주요 기능
### 고양이/강아지 품종 분류 기능
- teachablemachine 을 활용한 고양이/ 강아지 품종 예측이 가능한 AI 서비스
- 강아지와 고양이 각각 50개 이상의 클래스로 분류하여 유저가 반려동물 이미지를 올리면 해당 동물의 품종을 분류 후 매칭된 정보를 제공하는 서비스
### 커뮤니티(게시판) CRUD 기능 및 댓글 기능
- 회원가입한 사용자가 강아지/고양이/자유 항목 중 하나를 선택하여 커뮤니티 게시글을 남길 수 있는 서비스
- 댓글 기능이 추가되어 사용자 간 소통이 가능하도록 기능 구현.
### 로그인/회원가입 기능
- bcrypt 를 사용한 해시 암호화 알고리즘을 적용해 회원가입한 유저의 데이터를 암호화하여 저장
- 로그인 시 쿠키를 발급하여 로그인 된 유저의 정보를 세션 형태로 저장토록 기능 구현
### 고양이/강아지 품종별 정보 조회 기능
- 고양이와 강아지 카테고리에 따라 다양한 품종 정보를 조회할 수 있도록 서비스를 제공
- 각 목록을 클릭하면, 세부 페이지로 이동하여 자세한 품정 정보 조회 가능토록 구현

## 제작자(기여자)
- youngwan2(https://github.com/youngwan2) :: 프론트엔드/백엔드
- naritaeng(https://github.com/naritaeng) :: 프론트엔드/백엔드
- ljy12888(https://github.com/ljy12888) :: 프론트엔드

## 라이센스
- MIT

## 사이트 참조 컬러
- #9d9990ff
- #ede9e0ff
- 
