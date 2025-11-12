class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :name  # 投稿者名(任意)
      t.string :email # 投稿者メールアドレス(任意)
      t.string :title # 件名(任意)
      t.text :body    # 本文(必須)
      t.references :category, null: false, foreign_key: true
      t.boolean :hidden, default: false, null: false  # 非表示フラグ
      t.string :session_token # 投稿者判定用

      t.timestamps
    end
  end
end
