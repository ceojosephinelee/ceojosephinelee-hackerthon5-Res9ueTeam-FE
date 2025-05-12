function MainPage() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1 style={{ marginBottom: '30px' }}>💸 지출 기록 서비스 'PayLog'</h1>
        <img
          src="/Img.png" // ⬅️ public 폴더 기준 경로
          alt="메인 이미지"
          style={{
            width: '70%',
            maxWidth: '600px',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    );
  }
  
  export default MainPage;
  