import { useEffect, useState } from "react";
import api from "../api/axios";
//カテゴリ情報を取得
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  //読み込み中
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      //カテゴリ一覧データ取得
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("カテゴリ取得失敗:", err);
    } finally {
      //読み込み中を終了
      setLoading(false);
    }
  };
  //カテゴリ取得（非同期処理）を初回レンダリング後に実行
  useEffect(() => {
    fetchCategories();
  }, []);
  //カテゴリ数取得
  const [categories_with_counts, setStats] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/categories_with_counts");
        setStats(res.data);
      } catch (error) {
        console.error("カテゴリ統計取得失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  //カテゴリ一覧データ、読み込み情報、カテゴリ一覧を再取得するための関数を返す
  return { categories, loading, categories_with_counts, refetch: fetchCategories };
};
