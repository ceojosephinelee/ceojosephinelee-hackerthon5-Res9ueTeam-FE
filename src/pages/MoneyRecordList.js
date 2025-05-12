import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // 모달 컴포넌트
import MoneyRecordModal from '../components/MoneyRecordModal';

function MoneyRecordList() {
  const [moneyrecord, setMoneyrecord] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category_name: '',
    category_type: '',
    payment_types:''
  });

  const [selectedMoneyRecord, setSelectedMoneryRecord] = useState(null);
  const [edited, setEdited] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moneyrecord") || "[]");
    setMoneyrecord(stored);
    setFiltered(stored);
  }, []);

  const getCategoryOptions = (category_type) => {
    return category_type === "저축"
      ? ["월급", "보너스"]
      : ["식비", "쇼핑", "교통비", "기타"];
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_type") {
      const newCategory = getCategoryOptions(value)[0] || '';
      setFilter({ ...filter, category_type: value, category_name: newCategory });
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const handleSearch = () => {
    let result = moneyrecord;
    if (filter.startDate) {
      result = result.filter(e => e.record_date >= filter.startDate);
    }
    if (filter.endDate) {
      result = result.filter(e => e.record_date <= filter.endDate);
    }
    if (filter.category_name) result = result.filter(e => e.category_name === filter.category_name);
    if (filter.category_type) result = result.filter(e => e.category_type === filter.category_type);
    if (filter.payment_types) result = result.filter(e => e.payment_types === filter.payment_types);
    setFiltered(result);
  };

  const openModal = (exp) => {
    setSelectedMoneryRecord(exp);
    setEdited({ ...exp });
  };

  const closeModal = () => {
    setSelectedMoneryRecord(null);
  };

  const handleEditChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updated = moneyrecord.map(exp => exp.id === edited.id ? edited : exp);
    localStorage.setItem("moneyrecord", JSON.stringify(updated));
    setMoneyrecord(updated);
    setFiltered(updated);
    alert("수정 완료");
    closeModal();
  };

  const handleDelete = () => {
    const updated = moneyrecord.filter(exp => exp.id !== edited.id);
    localStorage.setItem("moneyrecord", JSON.stringify(updated));
    setMoneyrecord(updated);
    setFiltered(updated);
    alert("삭제 완료");
    closeModal();
  };

  return (
    <div>
      <h2>지출 내역</h2>

      {/* 검색 필터 */}
      <div style={{ marginBottom: '15px' }}>
        <label>시작 날짜:
          <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} />
        </label>{' '}
        <label>종료 날짜:
          <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} />
        </label>{' '}
        <label>타입:
          <select name="category_type" value={filter.category_type} onChange={handleFilterChange}>
            <option value="">전체</option>
            <option value="소비">소비</option>
            <option value="저축">저축</option>
          </select>
        </label>{' '}
        <label>카테고리:
          <select name="category_name" value={filter.category_name} onChange={handleFilterChange}>
            <option value="">전체</option>
            {getCategoryOptions(filter.category_type).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>{' '}
        
        <label>결제수단:
          <select name="payment_types" value={filter.payment_types} onChange={handleFilterChange}>
            <option value="">전체</option>
            <option value="카드">카드</option>
            <option value="현금">현금</option>
       
          </select>
        </label>{' '}
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 카드형 리스트 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {/* ➕ 추가 버튼 */}
        <div
          onClick={() => navigate('/moneyrecord')}
          style={{
            border: '2px dashed #999',
            padding: '15px',
            width: '200px',
            height: '150px',
            borderRadius: '10px',
            backgroundColor: '#fafafa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ➕
        </div>

        {/* 지출 카드 */}
        {filtered.map(exp => (
          <div key={exp.id}
            onClick={() => openModal(exp)}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              width: '200px',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer'
            }}>
            <strong>[{exp.category_type}] {exp.category_name}</strong>
            <p>💸 {exp.amount}원</p>
            <p>🕒 {new Date(exp.record_date).toLocaleDateString()}</p>
            <p>💳 {exp.payment_types}</p>
          </div>
        ))}
      </div>

      {/* 수정/삭제 모달 */}
      {selectedMoneyRecord && (
        <MoneyRecordModal
          moneyrecord={edited}
          onChange={handleEditChange}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default MoneyRecordList;
