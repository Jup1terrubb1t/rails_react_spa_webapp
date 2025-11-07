import { useState } from "react";//入力値保持
import { useNavigate } from "react-router-dom";//ページ遷移
import axios from "axios";//RailsにログインAPIを送る
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";//UI

//------------------------------------
// 管理者ログインページのコンポーネント作成
// React→Railse(Devise)のログイン処理
//------------------------------------
const AdminLoginPage = () => {
  //画面遷移関数取得
  const navigate = useNavigate();
  //ユーザーの入力値保持するstate
  const [email, setEmail] = useState("");//メールアドレス
  const [password, setPassword] = useState("");//パスワード
  const [errorMsg, setErrorMsg] = useState("");//エラーメッセージ

  //ログイン時
  const handleLogin = async () => {
    setErrorMsg("");//メッセージ初期化
    try {
      //DeviseにAPIを送る
      const res = await axios.post(
        //DeviseのログインURL
        "http://localhost:3000/users/sign_in",
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          // Cookieをフロントに保存(ログイン状態維持)
          withCredentials: true, 
        }
      );
      //Railsがstatus=200(成功)であれば
      if (res.status === 200) {
        //ログイン画面に遷移
        navigate("/admin/dashboard"); 
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <Box p="40px">
      <Heading mb="24px" fontSize="24px">管理者ログイン</Heading>
      <Input placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} mb="16px"/>
      <Input placeholder="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb="24px"/>
      {errorMsg && (<Text color="red.500" mb="16px">{errorMsg}</Text>)}
      <Button colorScheme="blue" width="100%" onClick={handleLogin}>ログイン</Button>
    </Box>
  );
};

export default AdminLoginPage;
