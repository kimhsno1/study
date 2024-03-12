import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Page3.css';

const Page3: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedCell, setSelectedDate] = useState<string | null>(null);

    const handleDateSelect = (arg: any) => {
        const title = prompt('메모를 입력하세요:');
        if (title) {
            const newEvent = {
                title,
                start: arg.dateStr,
                end: arg.endStr,
                allDay: true,
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo: any) => {
        setSelectedDate(clickInfo.startStr); // 클릭한 셀의 날짜를 저장
    };

    const dayCellClassNames = (arg: any) => {
        const classNames = ['fc-day', 'fc-day-' + arg.date.getDate()];
        if (arg.dateStr === selectedCell) {
            classNames.push('selected'); // 선택된 셀에 클래스 추가
        }
        return classNames.join('');
    };

    return (
        <div className="my-calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick} // 날짜를 클릭할 때마다 선택된 날짜 업데이트
                dayCellContent={(arg) => arg.date.getDate().toString()}
                dayCellClassNames={dayCellClassNames} // 각 셀에 클래스를 동적으로 지정
            />
        </div>
    );
};

export default Page3;
