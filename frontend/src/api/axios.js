import axios from 'axios';

// === Axios の共通設定 ===
const api = axios.create({
  baseURL: 'http://localhost:3000', // RailsサーバーのURL
  withCredentials: true,            // Cookieセッションを送受信する
  headers: { //ヘッダ
    'Content-Type': 'application/json', //送るデータはJSON形式
    Accept: 'application/json',//サーバーからもjson形式で返してほしい
  },
});
//インターセプター　レスポンスが返ってきたとき
api.interceptors.response.use(
  (response) => response,//通信が成功したら何もせずそのまま返す
  (error) => {
    if (error.response?.status === 401) {
      console.warn('認証エラー：ログインが必要です');
    }
    return Promise.reject(error);//エラーを呼び出し元に返す
  }
);
export default api;
