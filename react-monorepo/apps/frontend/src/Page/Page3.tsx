import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Css/Page3.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Page3: React.FC = () => {
    // 상태 변수들 정의
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', marginLeft: '100px' }}>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default Page3;
