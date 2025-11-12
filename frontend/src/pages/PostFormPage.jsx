// src/pages/PostFormPage.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePostForm } from "../hooks/usePostForm";
import PostForm from "../components/PostForm";

const PostFormPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const navigate = useNavigate();

  const { form, loading, handleChange, handleSubmit } = usePostForm(categoryId, () =>
    navigate(`/posts?category_id=${categoryId}`)
  );

  return (
    <PostForm
      form={form}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/posts?category_id=${categoryId}`)}
    />
  );
};

export default PostFormPage;