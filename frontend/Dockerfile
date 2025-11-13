FROM node:18

# コンテナ内で React が動く作業ディレクトリ
WORKDIR /app

# ホットリロードが Docker でも確実に動くように設定
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# package.json と package-lock.json をコピー（キャッシュ利用）
COPY package*.json /app/

# npm install
RUN npm install

# プロジェクト全体をコピー
COPY . /app

# 開発サーバー起動
CMD ["npm", "start"]
