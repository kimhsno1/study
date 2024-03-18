import React, { useState, useEffect, useRef } from 'react';
import './Page1.css';

const Page1: React.FC = () => {
    // localStream 상태가 MediaStream으로 초기화되고 있으나 getUserMedia를 사용해 스트림을 얻기 전까지는 undefined일 수 있음.
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    // 웹캠 상태 추가
    const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false);
    // useRef를 사용해 viewRef라는 변수를 생성, DOM요소에 접근해 비디오 요소에 대한 참조를 생성, 초기값으로 null 지정.
    const viewRef = useRef<HTMLVideoElement>(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            setIsWebcamOn(true);
        } catch (error) {
            console.error('웹캠을 사용할 수 없습니다. :', error);
            alert('웹캠을 사용할 수 없습니다.');
        }
    };

    const stopWebcam = async () => {
        try {
            // 트랙 목록을 가져옵니다. 만약 로컬스트림이 null, undefined인 경우 빈 배열을 반환
            const tracks = localStream?.getTracks() ?? [];
            // 이전 스트림의 트랙을 중지합니다.
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            // 비어있는 새 미디어스트림으로 업데이트하여 더 이상 스트림이 재생되지 않게 합니다.
            setLocalStream(new MediaStream());
            setIsWebcamOn(false);
        } catch (error) {
            console.error('웹캠을 종료할 수 없습니다. :', error);
            alert('웹캠을 종료할 수 없습니다.');
        }
    };

    // localStream의 상태가 바뀔 때 마다 비디오 요소의 srcObject를 업데이트
    useEffect(() => {
        if (viewRef.current && localStream) {
            viewRef.current.srcObject = localStream;
        }
    }, [localStream]);

    // 웹캠 시작, 종료
    const toggleWebcam = async () => {
        if (isWebcamOn) {
            stopWebcam();
        } else {
            startWebcam();
        }
    };

    return (
        <div>
            <video ref={viewRef} autoPlay playsInline controls></video>
            <br />
            <button className="page1-button" onClick={toggleWebcam}>
                {isWebcamOn ? '웹캠 종료' : '웹캠 시작'}
            </button>
        </div>
    );
};

export default Page1;
