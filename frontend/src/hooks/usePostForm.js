import { useState } from "react";
import api from "../api/axios";

export const usePostForm = (categoryId, onSuccess) => {
  //ステート初期化
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
  });
  //読み込み中
  const [loading, setLoading] = useState(false);
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // 投稿が押された時
  const handleSubmit = async () => {
    //本文が未入力の場合
    if (!form.body.trim()) {
      alert("本文は必須です。");
      return;
    }
    //
    try {
      setLoading(true);
      //フォームの内容をPOSTモデルに登録する
      await api.post("/api/posts", {
        post: { ...form, category_id: Number(categoryId) },
      });
      //成功時
      alert("投稿しました！");
      //初期化
      setForm({ name: "", email: "", title: "", body: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("投稿失敗:", err);
      alert("投稿に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit };
};
