# Sharedream 프런트엔드

꿈 기록일지를 공유 할 수 있는 웹앱.<br>
공유된 일지에 뉴스피드, 댓글, 좋아요 사용.<br>
프로필에 아이디, 이메일 수정.

ReactJS, Bootstrap

requirements

-   Google ClientID
-   백엔드 [구성](https://github.com/swc617/dream-journal-backend)

buildspec.yml 파일을 만든 뒤 다음 입력
api endpoint는 백엔드 프로젝트에서 사용

```yml
version: 0.2
env:
    variables:
        REACT_APP_GOOGLE_CLIENT_ID: <clientid>
        REACT_APP_GOOGLE_CLIENT_SECRET: <clientsecret>
        REACT_APP_API_ENDPOINT: <apiendpoint>
phases:
    pre_build:
        commands:
            - aws s3 sync ./build s3://<resourcename>
    build:
        commands:
            - aws cloudfront create-invalidation --distribution-id <distributionid> --paths "/*"
```

* S3 웹 호스팅 버켓 구성 resourcename
* Cloudfront 구성 distributionid
* codepipeline 구성 후 codecommit repository로 배포

```console
npm install
npm run build
git push
```

## 라우트
![login](https://user-images.githubusercontent.com/40656716/193016620-54de8835-e817-40e8-8498-4e22bd73bd60.png)
![root](https://user-images.githubusercontent.com/40656716/193016885-3de64f9d-1f13-4364-b0d4-81863423f924.png)
![journals](https://user-images.githubusercontent.com/40656716/193016930-45bcd5a7-491d-4917-95f0-5d714b34b847.png)
![journal](https://user-images.githubusercontent.com/40656716/193016951-ecb8f3e1-495e-46dc-9afa-0ad6da8e5654.png)
![journal-form](https://user-images.githubusercontent.com/40656716/193016974-27ed5396-e5dd-4654-bd2a-267250c1e194.png)
![newsfeed](https://user-images.githubusercontent.com/40656716/193017069-0565afb4-4590-451e-bf92-9dfa99b6256e.png)
![post](https://user-images.githubusercontent.com/40656716/193017104-1d4a1e3b-7e14-477e-a0d7-3aa5a8f45f27.png)
![post-likes-comment](https://user-images.githubusercontent.com/40656716/193017131-24f38fa4-ce01-49b9-9a9b-c4a6f0df88a2.png)
![profile](https://user-images.githubusercontent.com/40656716/193017150-77c13bca-cab1-475f-aec9-2aafb1ea8b39.png)
![profile-form](https://user-images.githubusercontent.com/40656716/193017176-91877146-3439-47fb-ac61-0af8c2ab96f2.png)


