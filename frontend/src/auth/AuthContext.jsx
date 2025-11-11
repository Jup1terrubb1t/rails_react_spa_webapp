import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

// React 全体で共有する認証状態(Context)の箱を作成
const AuthContext = createContext();

//アプリ全体に login 状態を配る（Context）
//children = <Routes>...</Routes>
export const AuthProvider = ({ children }) => {
  //初期設定: 未ログイン
  const [user, setUser] = useState(null);
  //初期設定: ログインチェック未完了
  const [loading, setLoading] = useState(true);
  // アプリが起動した時に、1度だけ=[]
  useEffect(() => {
    // (非同期) ログインチェック
    const checkLogin = async () => {
      try {
        //APIからユーザー情報取得 (待機)
        const res = await api.get("/api/current_user");
        //ログイン中
        setUser(res.data.user);
      } catch (err) {
        //未ログイン
        setUser(null);
      } finally {
        //ログインチェック完了済
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // (非同期) ログアウト
  const logout = async () => {
    //サインアウト(待機)
    await api.delete("/api/logout", { withCredentials: true });
    //未ログイン
    setUser(null);
  };
  // 認証に関する変数や関数をアプリ全体で使えるようにする
  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

//どのコンポーネントでも簡単に取り出せるようにしたフック
export const useAuth = () => useContext(AuthContext);
