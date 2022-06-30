## 폴더구조

| 폴더명        | 설명                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| .vscode       | config 파일 관리                                                                |
| backoffice    | back office가 필요할 경우 프로젝트 폴더                                         |
| configuration | 배포시 버전관련 파일(version.txt)이 담긴 폴더                                   |
| deploy        | 배포시 필요한 도커파일, nginx config 파일 등을 관리하는 폴더                    |
| server        | nodejs web server 프로젝트 폴더                                                 |
| environments  | env파일들을 관리                                                                |
| client        | 서비스 클라이언트 폴더                                                          |
| public        | index.html 관련 파일 관리                                                       |
| .storybook    | storybook config 파일 관리                                                      |
| components    | 컴포넌트파일들을 관리하고 하위에 컴포넌트명 폴더를 생성, 폴더명은 파스칼 케이스 |
| config        | 서비스에 필요한 설정파일들 관리                                                 |
| common        | global로 사용할 function, 변수들 관리                                           |
| router        | router관련 파일들 관리                                                          |
| store         | 상태관리 라이브러리 관리                                                        |
| stories       | storybook 파일들을 관리                                                         |
| assets        | video, image, font 등 파일들 관리                                               |
| apis          | api 통신 관련 파일 모음                                                         |
| hooks         | custom hook들 모음                                                              |
| styles        | global로 사용할 style 관련 파일들 관리                                          |
| @types        | custom types 파일들                                                             |
| utils         | 유틸리티 관련 파일들 관리 ex) api, common,locales, router, styles               |
| pages         | 페이지에 보여질 파일들 관리 하위 뷰 이름 폴더를 생성, 폴더명은 파스칼 케이스    |

```bash
pnpm i react react-dom @types/react @types/react-dom
```

```bash
pnpm i -D typescript ts-loader @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier
```

```bash
pnpm i -D html-webpack-plugin terser-webpack-plugin clean-webpack-plugin webpack webpack-cli webpack-manifest-plugin webpack-bundle-analyzer compression-webpack-plugin babel-loader css-loader webpack-dev-server source-map-loader
```
