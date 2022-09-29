# Sharedream 프런트엔드

꿈 기록일지를 공유 할 수 있는 웹앱.
공유된 일지에 뉴스피드, 댓글, 좋아요 사용
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

S3 웹 호스팅 버켓 구성 resourcename
Cloudfront 구성 distributionid
codepipeline 구성 후 codecommit repository로 배포

npm install
npm run build
git push
