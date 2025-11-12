import { Box, Button } from "@chakra-ui/react";

const Category = ({ id, name ,onClick}) => {
  return (
    <Box mb="16px">
      <Button colorScheme="blue" size="lg" onClick={onClick}>
        {name}
      </Button>
    </Box>
  );
};
export default Category;