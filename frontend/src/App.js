import { Button, Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Category from './components/Category';//カテゴリ一覧
import AdminLoginPage from "./pages/AdminLoginPage.jsx";//管理者ログイン
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";//管理者ダッシュボード
import AdminCategoriesPage from "./pages/AdminCategoriesPage.jsx";//管理者カテゴリ管理
import { AuthProvider } from "./auth/AuthContext"; //認証Context
import PrivateRoute from "./auth/PrivateRoute"; //ログイン必須のルート
import { useCategories } from "./hooks/useCategories";//カテゴリ一覧取得


// どのURLの時にどの画面を表示させるか(Reactアプリで最初に呼ばれるところ)
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>}/>
        <Route path="/admin/categories" element={<PrivateRoute><AdminCategoriesPage /></PrivateRoute>}/>
      </Routes>
    </AuthProvider>
  );
};

const  HomePage = () => {
  // 画面遷移専用の関数
  const navigate = useNavigate()
  // カテゴリ取得
  const { categories, loading } = useCategories();
  if (loading) {
    return <Center><Text>カテゴリ読み込み中...</Text></Center>;
  }

  return (
    <Box mt="64px">
      <Box textAlign="right" pr="40px">
        <Button fontSize="12px" fontWeight="bold" onClick={() => navigate("/admin/login")}>
            管理者ログイン
        </Button>
      </Box>
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold"> 掲示板</Text>
          </Box>
          <CheckboxGroup>
            {categories.map((cat) => (
              <Category key={cat.id} id={cat.id} name={cat.name} />
            ))}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
export default App;