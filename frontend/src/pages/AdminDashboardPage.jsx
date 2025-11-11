import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AdminDashboardPage = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <Box p="40px">
      <Heading mb="24px">管理者ダッシュボード</Heading>
      <VStack spacing={4} align="start">
        <Button colorScheme="blue" onClick={() => navigate("/admin/categories")}>
          カテゴリ管理へ
        </Button>
        <Button colorScheme="green" onClick={() => navigate("/admin/posts")}>
          投稿一覧（管理者）へ
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          ログアウト
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminDashboardPage;