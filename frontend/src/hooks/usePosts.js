import { useState, useEffect } from "react";
import api from "../api/axios";
// 投稿を取得
// 投稿を非表示
export const usePosts = (categoryId, admin = false) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //投稿一覧を取得
  const fetchPosts = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      //adminがtrue の場合、管理者APIへ (/api/posts/admin_index)
      //adminがfalse の場合、一般APIへ (/api/posts)
      const endpoint = admin
        ? `/api/posts/admin_index?category_id=${categoryId}`
        : `/api/posts?category_id=${categoryId}`;
      const res = await api.get(endpoint);
      setPosts(res.data);
    } catch (err) {
      console.error("投稿一覧取得失敗:", err);
    } finally {
      setLoading(false);
    }
  };
  // 投稿を非表示(投稿者専用）
  const hidePost = async (id) => {
    if (!window.confirm("この投稿を非表示にしますか？")) return;
    try {
      await api.patch(`/api/posts/${id}/hide`);
      alert("投稿を非表示にしました。");
      //再取得
      fetchPosts();
    } catch (err) {
      console.error("投稿非表示失敗:", err);
      alert("非表示に失敗しました。");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryId]);

  return { posts, loading, refetch: fetchPosts , hidePost};
};