import {Box,Heading,Button,Input,HStack,VStack,Text} from "@chakra-ui/react";

const AdminCategoriesUI = ({
  categories,
  // 新規
  newName,
  setNewName,
  createCategory,
  // 編集
  editId,
  editName,
  setEditName,
  setEditId,
  startEdit,
  updateCategory,
  // 削除
  deleteCategory,
}) => {

  return (
    <Box p="40px">
      <Heading mb="24px">カテゴリ管理</Heading>
      {/* 新規 */}
      <HStack mb="24px">
        <Input placeholder="新規カテゴリ名" value={newName} onChange={(e) => setNewName(e.target.value)}/>
        <Button colorScheme="blue" onClick={createCategory}>追加</Button>
      </HStack>
      {/* 一覧表示 */}
      <VStack align="stretch" spacing={3}>
        {categories.map((cat) => (
          <Box key={cat.id} p="12px" border="1px solid #ccc" borderRadius="8px">
            {/* 編集中の場合 入力フォーム表示 */}
            {editId === cat.id ? (
              <HStack justify="space-between">
                <Input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                <Button colorScheme="green" size="sm" onClick={updateCategory}>保存</Button>
                <Button size="sm" onClick={() => {setEditId(null);setEditName("");}}>キャンセル</Button>
              </HStack>
            ) : (
              <HStack justify="space-between">
                <Text>{cat.name}</Text>
                <HStack>
                  <Button size="sm" colorScheme="yellow" onClick={() => startEdit(cat)}>編集</Button>
                  <Button size="sm" colorScheme="red" onClick={() => deleteCategory(cat.id)}>削除</Button>
                </HStack>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminCategoriesUI;
