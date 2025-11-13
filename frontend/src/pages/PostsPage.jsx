import { useSearchParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import { Box, Heading, Spinner, Center, Button } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import PostList from "../components/PostList";
import api from "../api/axios";

const PostsPage = () => {
  const navigate = useNavigate();
  //カテゴリ一覧を取得
  const { categories, loading: catLoading } = useCategories();
  //URLに付けられた category_id パラメータを取得
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  //categoryId(URLパラメータ)
  const category = useMemo(
    () => categories.find((c) => c.id === Number(categoryId)),
    [categories, categoryId]
  );
  // 投稿一覧と非表示関数取得
  const { posts, hidePost } = usePosts(categoryId, false);
  // 現在のセッションを取得
  const [visitorToken, setVisitorToken] = useState(null); 
  useEffect(() => {
    api
      .get("/api/current_visitor")
      .then((res) => setVisitorToken(res.data.token))
      .catch(() => setVisitorToken(null));
  }, []);



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
      <PostList posts={posts} admin={false} onHide={hidePost} visitorToken={visitorToken} />
      <Button variant="outline" onClick={() => navigate("/")}>←戻る</Button>
    </Box>
  );
};
export default PostsPage;
