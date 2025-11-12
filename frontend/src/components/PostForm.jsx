// src/components/PostForm.jsx
import {
  Box,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const PostForm = ({ form, loading, onChange, onSubmit, onCancel }) => {
  return (
    <Box p="40px">
      <Heading mb="24px">投稿フォーム</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>名前（任意）</FormLabel>
          <Input name="name" value={form.name} onChange={onChange} />
        </FormControl>

        <FormControl>
          <FormLabel>メールアドレス（任意）</FormLabel>
          <Input name="email" value={form.email} onChange={onChange} />
        </FormControl>

        <FormControl>
          <FormLabel>件名（任意）</FormLabel>
          <Input name="title" value={form.title} onChange={onChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>本文</FormLabel>
          <Textarea
            name="body"
            value={form.body}
            onChange={onChange}
            placeholder="本文を入力してください"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={onSubmit}
          isLoading={loading}
          loadingText="送信中..."
        >
          投稿する
        </Button>

        <Button variant="ghost" onClick={onCancel}>
          ← 投稿一覧に戻る
        </Button>
      </VStack>
    </Box>
  );
};

export default PostForm;
