# fileupload-react-fastapi

ReactとFastAPIでファイルアップロード機能を実装してみた。  

## 環境情報
- Windows 11
- [WSL を使用して Windows に Linux をインストールする方法](https://learn.microsoft.com/ja-jp/windows/wsl/install)
    - Ubuntu 22.04
    - [Docker|Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Rye](https://rye.astral.sh/)
    - Python 3.12
    - FastAPI
- [Bun](https://bun.sh/docs/installation)
    - Vite + React（TypeScript）
- [Task](https://taskfile.dev/)

## セットアップ

### Backend

```bash
$ rye pin 3.12
$ rye fetch
$ rye install
```

### Frontend

```bash
$ cd frontend
$ bun install
```

## Usage

1. BackendのAPIを起動する
    ```bash
    $ task run:backend
    ```

1. 別ターミナルにてFrontendの開発サーバーを起動する
    ```bash
    $ task run:frontend
    ```

1. ブラウザで http://localhost:5173 にアクセスする
    ![](./screenshot.png)

## 参考情報

- Backend
    - [FastAPI | リクエストフォームとファイル](https://fastapi.tiangolo.com/ja/tutorial/request-forms-and-files/)
    - [FastAPI | 並行処理と async / await](https://fastapi.tiangolo.com/ja/async/)

- Frontend
    - [Gradient backgroud color](https://www.eggradients.com/)
        - [選んだグラデーション](https://www.eggradients.com/gradient/fake-news#google_vignette)
    - [Ant Design](https://ant.design/)