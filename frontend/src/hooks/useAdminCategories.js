import { useState, useEffect } from "react";
import api from "../api/axios";

export const useAdminCategories = () => {
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminCategories = async () => {
    try {
      const res = await api.get("/api/categories_with_counts");
      setCategoriesWithCount(res.data);
    } catch (err) {
      console.error("管理カテゴリ取得失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminCategories();
  }, []);

  return { categoriesWithCount, loading, refetch: fetchAdminCategories };
};
