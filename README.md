# Rails + ReactのSPA構成のwebアプリ

- 課題
【掲示板アプリ】
・登場人物：投稿者、管理者

・掲示板機能
- 「カテゴリ」があり、上記ユーザーは「カテゴリ」ごとにテキストを投稿できる
- 投稿するときは「名前／メールアドレス／件名／本文」が入力可能
- 本文以外は任意項目
- 一度投稿されたテキストは編集／削除不可
- 投稿者だけ非表示にできる
- 非表示になった投稿は全員から見えない
- 投稿者の判定はセッションCookieを使用する

・管理機能
- 管理者のみアクセス可能
- 認証機能にはDEVISEを使用する
- 「カテゴリ」ごとに投稿数を確認できる
- 「カテゴリ」の追加／削除／編集は管理機能で実施する
- 非表示になった投稿も含め、「カテゴリ」ごとにすべての投稿を確認できる
- 非表示の投稿を再表示することが出来る

## 使用技術

### Backend（Rails）
- Ruby: **3.1.2p20**
- Rails: **7.0.10**
- Devise: **4.9.4**
- PostgreSQL（gem pg）: **1.6.2**
- Puma: **7.1.0**
- Bundler: **2.3.7**

### Frontend（React）
- React: **18.2.0**
- Chakra UI: **2.8.2**
- Axios: **1.13.2**
- Node.js（Docker）: **18**

### インフラ
- Docker Compose（Rails・React・PostgreSQL）
- ルート構成：
  - React → http://localhost:8000
  - Rails API → http://localhost:3000

## ディレクトリ構成
- /frontend → React
- /backend → Rails API
- docker-compose.yml → 開発環境構築用

## 起動方法(ローカル実行)
### 1. リポジトリをクローン
- git clone https://github.com/Jup1terrubb1t/rails_react_spa_webapp.git
- cd　rails_react_spa_webapp

### 2. Docker イメージのビルド
- docker compose build

### 3. Docker を起動
- docker compose up -d

### 4. DB の初期化（初回のみ）
- docker compose exec backend rails db:create db:migrate db:seed

### アクセス URL
- フロント → http://localhost:8000  
- バックエンド API → http://localhost:3000 

### Docker停止
- docker compose down

## 管理者ログイン　（seed の内容）
- メールアドレス：admin@example.com
- パスワード：p@ssword

## テスト仕様書
[docs/test_spec.md](./docs/test_spec.md)