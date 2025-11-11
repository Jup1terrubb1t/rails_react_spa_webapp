import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Category = ({ id, name }) => {
  const navigate = useNavigate();
  const handleClick = () => {navigate(`/categories/${id}`);};
  return (
    <Box mb="16px">
      <Button colorScheme="blue" size="lg" onClick={handleClick}>
        {name}
      </Button>
    </Box>
  );
};
// 他のファイルでコンポーネントを使用するための宣言
export default Category;