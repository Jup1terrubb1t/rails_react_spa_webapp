import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
// 認証ガード設定
// children は <AdminDashboardPage />
const PrivateRoute = ({ children }) => {
  //認証のグローバル変数取得
  const { user, loading } = useAuth();
  //現在地を取得
  const location = useLocation();
  //loading中はサーバ確認の結果待ち表示
  if (loading) return <div>認証チェック中...</div>;
  //user が存在する（ログイン済）なら children（本来のページ）を表示
  //user が null（未ログイン）なら、ログインページへリダイレクト
  //replace: 履歴を置き換えて戻るボタンで戻れなくする
  //state: 今アクセスしようとしていたページの場所情報を保存→ ログイン成功後に元のページへ戻す
  return user 
  ? children 
  :  <Navigate to="/admin/login" replace state={{ from: location }} />;
  // :  <Navigate to="/admin/login"  />;
};
export default PrivateRoute;