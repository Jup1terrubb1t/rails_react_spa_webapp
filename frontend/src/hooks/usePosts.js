import { useState, useEffect } from "react";
import api from "../api/axios";
// 投稿一覧を取得する共通フック
// admin = true の場合、管理者API (/api/posts/admin_index)
// admin = false の場合、一般API (/api/posts)
export const usePosts = (categoryId, admin = false) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
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

  useEffect(() => {
    fetchPosts();
  }, [categoryId]);

  return { posts, loading, refetch: fetchPosts };
};