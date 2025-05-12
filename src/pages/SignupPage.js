import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

function SignupPage() {
  const [form, setForm] = useState({ nickname: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return alert("비밀번호는 6자리 이상이어야 합니다.");

    axios.post('http://43.200.41.32:8080/api/auth/signup', form)
      .then(res => {
        console.log(res);
        alert('회원가입 성공');
        navigate('/login');
      })
      .catch(() => alert('회원가입 실패'));

  };

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input className="signup-form" name="nickname" placeholder="닉네임" onChange={handleChange} required />
      <input className="signup-form" name="email" placeholder="이메일" onChange={handleChange} required />
      <input className="signup-form" name="password" placeholder="비밀번호" type="password" onChange={handleChange} required />
      <button type="submit">가입</button>
    </form>
  );
}

export default SignupPage;

