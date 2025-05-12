import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return alert("비밀번호는 6자리 이상이어야 합니다.");

    axios.post('http://43.200.41.32:8080/api/auth/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
        window.location.reload(); 
      })
      .catch(() => alert('로그인 실패'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input name="email" placeholder="이메일" onChange={handleChange} required />
      <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} required />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginPage;
