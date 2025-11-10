import { Checkbox, Box, Text ,Button, Stack,} from "@chakra-ui/react";

// Categoryという名前で関数コンポーネントを宣言
// popsを引数にすることでnameを受け取ることができるように
const Category = (props) => {
  return (
    <Box mb="16px">
      <Button colorScheme="blue" size="lg">
        {props.name}
      </Button>
    </Box>
  )
}
// 他のファイルでコンポーネントを使用するための宣言
export default Category