# 2022_SKT_ICT_SNS_API <전인엽>

<p align="center">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Mysql-4479A1?style=flat&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Passport-34E27A?style=flat&logo=passport&logoColor=white"/>
<img src="https://img.shields.io/badge/Facebook-1877F2?style=flat&logo=facebook&logoColor=white"/>
</p>


## 1. 구현사항
---
* 페이스북, 인스타, 트위터 등 소셜 로그인 기능(OAuth2)
    * 페이스북 소셜 로그인 기능 구현
* 사용자 인증을 위한 토큰 발행
    * JWT토큰 발행 후 API 호출시 토큰 확인
* 피드정보 강제 풀링 요청 API
    * DB에 저장된 마지막 풀링 시간 이후로 새로운 데이터가 있는경우 받아와서 저장
    * 피드에 기록된 message, image_url, created_time을 저장
* 사용자의 최신 피드를 보여주는 API
    * DB에 저장되어있는 피드정보를 받아오는 API
    * 최근 시간순으로 보여주는 API 

## 2. API 호출 과정
---
* POST: /auth/signup
    * 회원가입 진행  
* POST: /auth/signin
    * 로그인 진행
    * jwt 토큰 발행  
* GET: /auth/facebook
    * facebook 로그인
    * facebook access token 발행  
* POST: /savetoke `header = {Authorization: access_token}`
    * jwt토큰에서 사용자 이름 확인
    * 헤더에서 가져온 access_token을 해당 사용자의 facebook_access_token에 저장 
* POST: /feed/pull `header = {Authorization: access_token}`
    * jwt토큰에서 사용자 이름 확인
    * 해당 사용자의 access_token을 사용하여 피드 가져오기 (message, image_url, created_time)  
* GET: /feed `header = {Authorization: access_token}`
    * jwt토큰에서 사용자 이름 확인
    * DB에서 해당 사용자의 피드 가져오기
* GET: /feed/:id `header = {Authorization: access_token}`
    * 피드 데이터중 id로 피드 항목 조회
@Post("/savetoken")

