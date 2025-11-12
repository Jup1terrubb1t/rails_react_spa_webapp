import { useSearchParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import {Box,Heading,Spinner,Center,Button,} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import PostList from "../components/PostList"; 

const PostsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //TOPページからcategory_id を取得
  const categoryId = searchParams.get("category_id");
  //カテゴリ一覧を取得
  const { categories, loading: catLoading } = useCategories();
  //categoryId(URLパラメータ)
  const category = useMemo(
    () => categories.find((c) => c.id === Number(categoryId)),
    [categories, categoryId]
  );
  // 投稿一覧を取得
  const { posts } = usePosts(categoryId, false);
  // カテゴリIDが無い場合はトップにリダイレクト（URL直打ち防止）
  // 直打できてしまうので修正必要
  useEffect(() => {
    if (!categoryId) {
      navigate("/");
    }
  }, [categoryId, navigate]);
  // カテゴリが無い or ロード中の間はローディング
  if (!categoryId || catLoading) {
    return (
      <Center mt="40px"><Spinner /></Center>
    );
  }

  return (
    <Box p="40px">
      <Heading mb="24px">{category ? `${category.name} ` : "投稿一覧"}</Heading>
      <Button colorScheme="teal" mb="16px" onClick={() => navigate(`/posts/new?category_id=${categoryId}`)}>新規投稿</Button>
      <PostList posts={posts} admin={false} />
    </Box>
  );
};
export default PostsPage;
