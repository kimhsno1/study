import React, { useState } from 'react';
import './Page2.css';

const Page2: React.FC = () => {
    // 각 기계의 상태 및 기록을 저장하기 위한 상태 변수
    const [machineStates, setMachineStates] = useState<{ [key: string]: { status: boolean; records: string[] } }>(
        // 초기 상태 설정: 기계 번호 및 상태(false: OFF, true: ON), 작업 기록 배열
        Object.fromEntries(
            Array.from({ length: 5 }, (_, index) => [`machine${index + 1}`, { status: false, records: [] }])
        )
    );

    // 모든 기계의 상태를 변경하는 함수
    const toggleAllMachines = () => {
        // 모든 기계가 ON 상태인지 확인
        const allMachinesOn = Object.values(machineStates).every((machine) => machine.status);
        // 모든 기계의 상태 변경
        setMachineStates((prevState) => {
            const newMachineStates = { ...prevState };
            for (const machine in newMachineStates) {
                newMachineStates[machine].status = !allMachinesOn;
            }
            return newMachineStates;
        });
    };

    // 특정 기계의 상태를 변경하는 함수
    const toggleMachineState = (machine: string) => {
        setMachineStates((prevState) => {
            const updatedState = {
                ...prevState,
                [machine]: {
                    ...prevState[machine],
                    status: !prevState[machine].status,
                },
            };
            console.log('변경된 상태:', updatedState); // 콘솔에 변경된 상태를 출력
            return updatedState; // 변경된 상태를 반환
        });
    };

    // 작업 기록 추가 함수
    const addRecord = (machine: string, record: string) => {
        setMachineStates((prevState) => ({
            ...prevState,
            [machine]: {
                ...prevState[machine],
                records: [...prevState[machine].records, record],
            },
        }));
    };

    return (
        <div className="page2-container">
            <h1 className="page2-title">페이지 2</h1>
            <p className="page2-content">이것은 페이지 2입니다.</p>
            <button className="toggle-all-button" onClick={toggleAllMachines}>
                {Object.values(machineStates).every((machine) => machine.status) ? '일괄 종료' : '일괄 시작'}
            </button>
            <ul className="machine-list">
                {Object.keys(machineStates).map((machine) => (
                    <li key={machine} className="machine-item">
                        <span className="machine-number">기계 {machine.slice(-1)}</span>
                        <button
                            className={`toggle-button ${machineStates[machine].status ? 'on' : 'off'}`}
                            onClick={() => toggleMachineState(machine)}
                        >
                            {machineStates[machine].status ? 'ON' : 'OFF'}
                        </button>
                        <button
                            className="record-button"
                            onClick={() => addRecord(machine, `작업 기록 추가: ${new Date().toLocaleString()}`)}
                        >
                            기록 추가
                        </button>
                        <ul>
                            {machineStates[machine].records.map((record, index) => (
                                <li key={index}>{record}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page2;
