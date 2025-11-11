import { useState } from "react";
import api from "../api/axios";
// カテゴリ DELETE INSERT UPDATE のhooks
export const useCategoryActions = (refetch) => {
  // 新規追加用state
  const [newName, setNewName] = useState("");
  // 編集用state
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  // カテゴリ新規追加
  const createCategory = async () => {
    if (!newName.trim()) return;
    try {
      await api.post("/api/categories", { category: { name: newName } });
      setNewName("");
      //更新後一覧を再取得
      refetch(); //
    } catch (error) {
      console.error("カテゴリ作成失敗:", error);
    }
  };
  //カテゴリ削除
  const deleteCategory = async (id) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await api.delete(`/api/categories/${id}`);
      //更新後一覧を再取得
      refetch(); 
    } catch (error) {
      console.error("削除失敗:", error);
    }
  };

  //カテゴリ編集
 // 編集開始（値をセットする）
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };
  // 更新処理
  const updateCategory = async () => {
    if (!editName.trim()) return;
    try {
      await api.put(`/api/categories/${editId}`, {
        category: { name: editName }
      });
      // 編集完了
      setEditId(null);
      setEditName("");
      refetch();
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };
  
  return {
    // 新規
    newName,
    setNewName,
    createCategory,
    // 編集
    editId,
    editName,
    setEditName,
    startEdit,
    updateCategory,
    // 削除
    deleteCategory,
  };
};