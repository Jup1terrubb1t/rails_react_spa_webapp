import { useEffect, useState } from "react";
import api from "../api/axios";
//カテゴリ情報を取得
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("カテゴリ取得失敗:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return { categories, loading };
};
