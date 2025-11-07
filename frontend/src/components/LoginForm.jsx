import React, { useState } from 'react';
import api from '../api/axios'; // 共通設定済みaxiosを利用

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //ログインボタンがクリックされた時
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // DeviseのログインAPIを呼び出し
      const res = await api.post('/users/sign_in', {
        user: { email, password },
      });

      if (res.status === 200) {
        setMessage('✅ ログインに成功しました！');
        console.log('ログイン成功:', res.data);
      } else {
        setMessage('⚠️ ログインに失敗しました。');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('❌ メールアドレスまたはパスワードが正しくありません。');
      } else {
        setMessage('⚠️ 通信エラーが発生しました。');
      }
      console.error('ログイン失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  //実際にブラウザに表示するフォームHTML
  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#aaa' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          {loading ? '通信中...' : 'ログイン'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>
      )}
    </div>
  );
}
