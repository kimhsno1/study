import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import './Css/Page1.css';

const Page1: React.FC = () => {
    // localStream 상태가 MediaStream으로 초기화되고 있으나 getUserMedia를 사용해 스트림을 얻기 전까지는 undefined일 수 있음.
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    // 웹캠 상태 추가
    const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false);
    // useRef를 사용해 viewRef라는 변수를 생성, DOM요소에 접근해 비디오 요소에 대한 참조를 생성, 초기값으로 null 지정.
    const viewRef = useRef<HTMLVideoElement>(null);
    // 현재 시간을 nowTime에 저장
    const nowTime = new Date().toLocaleTimeString();

    const startWebcam = async () => {
        try {
            // 브라우저의 미디어 디바이스에 접근하는 비동기 작업
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            setIsWebcamOn(true);
            console.log('웹캠 시작', nowTime);

            // post 요청을 통해 백엔드에게 action, time을 넘겨주고 넘겨준 데이터를 다시 받음
            await fetch('http://localhost:4000/page1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: '웹캠 시작', time: nowTime }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('웹캠 시작시 백엔드로부터 받은 액션 : ', data.action);
                    console.log('웹캠 시작시 백엔드로부터 받은 타임 : ', data.time);
                });
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
            console.log('웹캠 종료', nowTime);

            // post 요청을 통해 백엔드에게 action, time을 넘겨주고 넘겨준 데이터를 다시 받음
            await fetch('http://localhost:4000/page1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: '웹캠 종료', time: nowTime }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('웹캠 종료시 백엔드로부터 받은 액션 : ', data.action);
                    console.log('웹캠 종료시 백엔드로부터 받은 타임 : ', data.time);
                });
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
    const toggleWebcam = () => {
        if (isWebcamOn) {
            stopWebcam();
        } else {
            startWebcam();
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <video ref={viewRef} autoPlay playsInline controls style={{ width: '100%', maxWidth: '1000px' }}></video>
            <br />
            <Button
                type="primary"
                icon={
                    isWebcamOn ? (
                        <StopOutlined style={{ fontSize: '50px', verticalAlign: 'middle' }} />
                    ) : (
                        <PlayCircleOutlined style={{ fontSize: '50px', verticalAlign: 'middle' }} />
                    )
                }
                onClick={toggleWebcam}
                size="large"
                className="play-button"
                style={{ fontSize: '25px', width: '70px', height: '70px' }}
            >
                {/* {isWebcamOn ? '웹캠 종료' : '웹캠 시작'} */}
            </Button>
        </div>
    );
};

export default Page1;
