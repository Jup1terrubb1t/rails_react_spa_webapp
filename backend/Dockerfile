# コンテナのベースとなるイメージをインストールする
FROM ruby:3.1.2

# 必要なパッケージをインストールする
RUN apt-get update -qq && apt-get install -y vim postgresql-client

#  Nodeインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs

# コンテナで作業するディレクトリを指定する（ディレクトリがなければ作成する）
WORKDIR /myapp

# ローカルのGemfileとGemfile.lock（左）をコンテナのディレクトリ（右）にコピーする
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# gemをインストールル
RUN bundle install

# ローカルのカレントディレクトリをコンテナのappディレクトリに保存する
COPY . /myapp

# entrypoint.shをコンテナにコピーする
COPY entrypoint.sh /usr/bin/

# entrypoint.shを実行する
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]