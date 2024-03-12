import React, { useState, useRef } from 'react';
import './Page1.css';

const Page1: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // 웹캠 권한 요청 및 비디오 스트림 표시
    const startWebcam = async () => {
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
                console.log('비디오 스트림 : ', newStream);
                setStream(newStream);
                setWebcamActive(true);
            }
        } catch (err) {
            setError('웹캠을 사용할 수 없습니다.');
            console.error('웹캠을 사용할 수 없습니다:', err);
        }
    };

    // 웹캠 종료 함수
    const stopWebcam = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop()); // 모든 트랙을 중지
            setStream(null); // 스트림 상태 초기화
            setWebcamActive(false); // 웹캠 상태 업데이트
        }
    };

    return (
        <div className="page1-container">
            <h1 className="page1-title">페이지 1</h1>
            <p className="page1-content">이것은 페이지 1입니다.</p>
            <button className="page1-button" onClick={startWebcam}>
                웹캠 시작
            </button>
            <button className="page1-button" onClick={stopWebcam}>
                웹캠 종료
            </button>
            {error && <div className="page1-error">{error}</div>}
            {webcamActive && <video className="page1-video" ref={videoRef} autoPlay />}
        </div>
    );
};

export default Page1;
