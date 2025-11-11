import { Center, Text } from "@chakra-ui/react";
import { useCategories } from "../hooks/useCategories";
import { useCategoryActions } from "../hooks/useCategoryActions";
import AdminCategoriesUI from "../components/AdminCategoriesUI";
//------------------------------------
// 管理者カテゴリ管理ページ
// カテゴリを追加・削除・編集する
//------------------------------------
const AdminCategoriesPage = () => {
  const { categories, loading, refetch } = useCategories();
  const actions = useCategoryActions(refetch);
  //読み込み中
  if (loading) {
    return (
      <Center><Text>読み込み中...</Text></Center>
    );
  }
  //AdminCategoriesUI + useCategoryActions
  return (
    <AdminCategoriesUI
      categories={categories}
      {...actions}  //全て渡す
    />
  );
};

export default AdminCategoriesPage;
