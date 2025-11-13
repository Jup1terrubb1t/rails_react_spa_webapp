import {Box,Button,HStack,VStack,Text,Badge} from "@chakra-ui/react";
const PostList = ({ posts, onUnhide, onHide, admin = false, visitorToken }) => {
  if (!posts.length) {
    return <Text>投稿がありません。</Text>;
  }

  return (
    <VStack align="stretch" spacing={3}>
      {posts.map((post) => (
        <Box key={post.id} border="1px solid #ccc" borderRadius="8px" p="12px" bg={post.hidden ? "gray.50" : "white"}>
          <HStack justify="space-between">
            <Text fontWeight="bold">{post.title}</Text>
            {post.hidden && <Badge colorScheme="red">非表示</Badge>}
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {post.name || "匿名"}（{post.email || "メールなし"}）
          </Text>
          <Text mt="4px">{post.body}</Text>
          {/* 管理者専用；再表示ボタン */}
          {admin && post.hidden && (
            <Button size="sm" mt="8px" colorScheme="blue" onClick={() => onUnhide(post.id)}>再表示</Button>
          )}
          {/* 自分の投稿専用：非表示ボタン */}
            {!admin && post.session_token === visitorToken && !post.hidden && (
            <Button size="sm" mt="8px" colorScheme="red" onClick={() => onHide?.(post.id)}>非表示</Button>
          )}
        </Box>
      ))}
    </VStack>
  );
};
export default PostList;
