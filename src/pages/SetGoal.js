import { useState } from 'react';

function SetGoal() {
  const [form, setForm] = useState({
    user_id: 1,
    expense_goal: '',
    save_goal: '',
    resolution: '',
    goal_date: ''
  });

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // ✅ 로컬스토리지에 저장
    localStorage.setItem("expense_goal", form.expense_goal);
    localStorage.setItem("save_goal", form.save_goal);
    localStorage.setItem("resolution", form.resolution);
  
    alert("목표가 저장되었습니다!");
  };
  

  return (
    <div>
      <h2>이번 달 목표 설정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>지출 목표 금액</label><br />
          <input
            name="expense_goal"
            placeholder="예: 500000"
            value={form.expense_goal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>저축 목표 금액</label><br />
          <input
            name="save_goal"
            placeholder="예: 200000"
            value={form.save_goal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이번 달의 다짐</label><br />
          <textarea
            name="resolution"
            placeholder="예: 커피 줄이기! 외식 1회만!"
            value={form.resolution}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <br />
        <button type="submit">목표 저장</button>
      </form>
    </div>
  );
}

export default SetGoal;
