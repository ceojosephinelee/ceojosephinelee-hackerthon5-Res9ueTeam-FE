import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MoneyRecord() {
  const [form, setForm] = useState({
    category_type: '소비',
    category_name: '식비',
    amount: '',
    record_date: '',
    payment_types: '카드',
  });
  

  const navigate = useNavigate();

  const getCategoryOptions = (category_type) => {
    return category_type === '저축'
      ? ['월급', '보너스']
      : ['식비', '쇼핑', '교통비', '기타'];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category_type') {
      const newCategory = getCategoryOptions(value)[0];
      setForm({ ...form, category_type: value, category_name: newCategory });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.record_date) {
      alert('금액과 날짜는 필수입니다.');
      return;
    }

    const newMoneyRecord = { ...form, id: Date.now() };
    const stored = JSON.parse(localStorage.getItem('moneyrecord') || '[]');
    localStorage.setItem('moneyrecord', JSON.stringify([...stored, newMoneyRecord]));

    alert('지출이 저장되었습니다!');
    navigate('/moneyrecord-list');
  };

  return (
    <div>
      <h2>지출 입력</h2>
      <form onSubmit={handleSubmit}>
        <label>타입:
          <select name="category_type" value={form.category_type} onChange={handleChange}>
            <option value="소비">소비</option>
            <option value="저축">저축</option>
          </select>
        </label><br />

        <label>카테고리:
          <select name="category_name" value={form.category_name} onChange={handleChange}>
            {getCategoryOptions(form.category_type).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label><br />

        <label>금액:
          <input name="amount" type="number" value={form.amount} onChange={handleChange} />
        </label><br />

        <label>날짜:
          <input name="record_date" type="date" value={form.record_date} onChange={handleChange} />
        </label><br />

        <label>결제수단:
          <select name="payment_types" value={form.payment_types} onChange={handleChange}>
            <option value="카드">카드</option>
            <option value="현금">현금</option>
          </select>
        </label><br /><br />

        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default MoneyRecord;
