import React, { useState, useEffect, useRef } from 'react';
import './Page1.css';

const Page1: React.FC = () => {
    const [localStream, setLocalStream] = useState<MediaStream>();
    const viewRef = useRef<HTMLVideoElement>(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            console.log('시작 스트림 : ', stream);
        } catch (error) {
            console.error('웹캠을 사용할 수 없습니다. :', error);
        }
    };

    const stopWebcam = async () => {
        try {
            const tracks = localStream?.getTracks() ?? [];
            tracks.forEach((track) => track.stop()); // 이전 스트림의 트랙을 중지합니다.
            setLocalStream(new MediaStream()); // 비어있는 스트림을 설정하여 비디오 요소가 더 이상 스트림을 재생하지 않도록 합니다.
        } catch (error) {
            console.error('웹캠을 종료할 수 없습니다. :', error);
        }
    };

    // 버튼 1이 눌리면 자동으로 웹캠 실행
    // useEffect(() => {
    //     startWebcam();
    // }, []);

    // 웹캠 시작 버튼을 눌렀을때 실행
    useEffect(() => {
        if (viewRef.current && localStream) {
            viewRef.current.srcObject = localStream;
        }
    }, [localStream]);

    return (
        <div>
            <video ref={viewRef} autoPlay playsInline controls></video>
            <br />
            <button className="page1-button" onClick={startWebcam}>
                웹캠 시작
            </button>
            <button className="page1-button" onClick={stopWebcam}>
                웹캠 종료
            </button>
        </div>
    );
};

export default Page1;
