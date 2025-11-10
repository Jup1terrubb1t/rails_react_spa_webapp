import { Button, Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Category from './components/Category';//カテゴリ一覧
import AdminLoginPage from "./pages/AdminLoginPage";//管理者ログイン
import AdminDashboardPage from "./pages/AdminDashboardPage";//管理者ダッシュボード

// どのURLの時にどの画面を表示させるか(Reactアプリで最初に呼ばれるところ)
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
};

const  HomePage = () => {
  // 画面遷移専用の関数
  const navigate = useNavigate()
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
            <Category name="買い物" />
            <Category name="ランニング" />
            <Category name="プログラミングの勉強" />
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
export default App;