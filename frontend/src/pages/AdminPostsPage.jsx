import { useState } from "react";
import { Box, Heading, Select, Center, Text ,Table,Tr,Tbody,Td,Th,Thead} from "@chakra-ui/react";
import { useCategories } from "../hooks/useCategories";
import { usePosts } from "../hooks/usePosts";
import api from "../api/axios";
import PostList from "../components/PostList";

const AdminPostsPage = () => {
  const { categories, categories_with_counts, loading: catLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { posts, loading, refetch } = usePosts(selectedCategory, true);

  const handleUnhide = async (id) => {
    try {
      await api.patch(`/api/posts/${id}/unhide`);
      refetch();
    } catch (error) {
      console.error("再表示失敗:", error);
    }
  };
  
  if (catLoading) return <Center><Text>カテゴリ読み込み中...</Text></Center>;

  return (
    <Box p="40px">
      <Heading mb="24px">投稿一覧（管理者）</Heading>
      {/* カテゴリ選択 */}
      <Select placeholder="カテゴリを選択"
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
        mb="24px" width="300px">
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </Select>
      {/* カテゴリが選択された時だけ投稿数を表示 */}
      {selectedCategory && (
          <Box mt="40px">
          {/* <Heading mb="14px">投稿数</Heading> */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>総投稿数</Th>
                <Th>表示中</Th>
                <Th>非表示</Th>
              </Tr>
            </Thead>
            <Tbody>
            {categories_with_counts
              // 選択中カテゴリだけフィルタ
              .filter(c => !selectedCategory || c.id === Number(selectedCategory))
              .map(c => (
                <Tr key={c.id}>
                  <Td>{c.total_posts}</Td>
                  <Td>{c.visible_posts}</Td>
                  <Td>{c.hidden_posts}</Td>
                </Tr>
              ))}
          </Tbody>
          </Table>
        </Box>
      )}
      {/* 投稿一覧 */}
      {loading ? (
        <Center><Text>投稿読み込み中...</Text></Center>
      ) : (
        <PostList posts={posts} onUnhide={handleUnhide} admin />
      )}
    </Box>
  );
};

export default AdminPostsPage;