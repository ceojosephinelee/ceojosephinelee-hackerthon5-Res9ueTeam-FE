import '../css/MoneyRecordModal.css';
import React from 'react';

function MoneyRecordModal({ moneyrecord, onChange, onClose, onUpdate, onDelete }) {
    const getCategoryOptions = (category_type) => {
      return category_type === "저축"
        ? ["월급", "보너스"]
        : ["식비", "쇼핑", "교통비", "기타"];
    };
    return (
      <div style={{
        position: 'fixed',
        top: '5%',
        left: '30%',
        width: '400px',
        background: 'white',
        padding: '20px',
        border: '1px solid gray',
        borderRadius: '10px',
        zIndex: 1000
      }}>
        <h3>지출 수정</h3>
        <label>타입:
          <select name="category_type" value={moneyrecord.category_type} onChange={onChange}>
            <option value="소비">소비</option>
            <option value="저축">저축</option>
          </select>
        </label>
        <label>카테고리:
           <select name="category_name" value={moneyrecord.category_name} onChange={onChange}>
             {getCategoryOptions(moneyrecord.category_type).map((opt) => (
               <option key={opt} value={opt}>{opt}</option>
             ))}
           </select>
         </label>
        <label>금액:
          <input name="amount" value={moneyrecord.amount} onChange={onChange} />
        </label><br />
        <label>날짜:
          <input name="record_date" type="date" value={moneyrecord.record_date} onChange={onChange} />
        </label><br />
        <label>결제수단:
          <select name="payment_types" value={moneyrecord.payment_types} onChange={onChange}>
            <option value="카드">카드</option>
            <option value="현금">현금</option>
          </select>
        </label><br /><br />
        <button onClick={onUpdate}>수정</button>{' '}
        <button onClick={onDelete}>삭제</button>{' '}
        <button onClick={onClose}>닫기</button>
      </div>
    );
  }
  
  export default MoneyRecordModal;
  