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
  //カテゴリ一覧データ、読み込み情報、カテゴリ一覧を再取得するための関数を返す
  return { categories, loading, refetch: fetchCategories };
};
