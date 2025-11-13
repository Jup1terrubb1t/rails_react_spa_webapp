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
### フロントエンド
- React 18
- Chakra UI
- Axios

### バックエンド
- Ruby on Rails 7
- Devise（管理者認証）
- PostgreSQL

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

### 2. Docker を起動
docker compose up -d

### 3. ブラウザでアクセス
- フロント → http://localhost:8000  
- バックエンド API → http://localhost:3000 

## 管理者ログイン　（テスト用）
- メールアドレス：admin@example.com
- パスワード：p@ssword

- Cookie が ON の状態で確認してください
- 投稿者判定は `visitorToken`（セッションCookie）で行います
- 非表示にした投稿は一般ユーザーから完全に非表示になります
- 管理画面ではすべての投稿を確認できます（非表示含む）
