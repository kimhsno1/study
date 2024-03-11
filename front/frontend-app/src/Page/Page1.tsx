import React, { useState, useRef } from 'react';
import './Page1.css';

const Page1: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [webcamActive, setWebcamActive] = useState(false);

    // 웹캠 권한 요청 및 비디오 스트림 표시
    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                console.log(stream);
                setWebcamActive(true);
            }
        } catch (err) {
            setError('웹캠을 사용할 수 없습니다.');
            console.error('웹캠을 사용할 수 없습니다:', err);
        }
    };

    return (
        <div className="page1-container">
            <h1 className="page1-title">페이지 1</h1>
            <p className="page1-content">이것은 페이지 1입니다.</p>
            <button className="page1-button" onClick={startWebcam}>
                웹캠 켜기
            </button>
            {error && <div className="page1-error">{error}</div>}
            {webcamActive && <video className="page1-video" ref={videoRef} autoPlay />}
        </div>
    );
};

export default Page1;
