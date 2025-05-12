import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Header.css';

function Header() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const [expenseGoal, setExpenseGoal] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      const goal = localStorage.getItem("expense_goal") || 0;
      setExpenseGoal(Number(goal));

      const records = JSON.parse(localStorage.getItem("moneyrecord") || "[]");
      const sum = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      setTotalSpent(sum);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃되었습니다.');
    navigate('/login');
  };

  return (
    <header style={{ background: '#eee', padding: '10px' }}>
      <h2
          onClick={() => navigate('/')}
          style={{
            display: 'inline-block',
            marginRight: '20px',
            cursor: 'pointer',
            color: '#00C896' // 💚 민트 포인트!
          }}
        >
          💸 PayLog
      </h2>
      

      {isLoggedIn ? (
        <>
          

          <button onClick={handleLogout}>로그아웃</button>

          {/* 🎯 지출 목표 + 💰 총 지출 표시 */}
          <div style={{ marginTop: '10px' }}>
            🎯 목표 금액: {expenseGoal.toLocaleString()}원 &nbsp;&nbsp;
            💰 총 지출 금액: {totalSpent.toLocaleString()}원
          </div>
        </>
      ) : (
        <>
          <div className="tab-bar">
            <Link to="/dashboard">대시보드</Link>
            <Link to="/goals">목표 설정</Link>
            <Link to="/moneyrecord">비용 입력</Link>
            <Link to="/moneyrecord-list">비용 리스트</Link>
          </div>
          <div className="auth-buttons">
            <Link to="/signup" className="btn">회원가입</Link>
            <Link to="/login" className="btn">로그인</Link>
          </div>
        </>
        
      )}
    </header>
  );
}

export default Header;
