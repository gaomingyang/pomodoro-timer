import { useState,useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPlay,faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

function App() {
  //默认时间
  const SESSION_TIME = 1
  const BREAK_TIME = 1
  const SECONDS_PER_MINUTE = 10

  const [sessionTime, setSessionTime] = useState(SESSION_TIME) //一段时间长度
  const [breakTime, setBreakTime] = useState(BREAK_TIME) //单位是分钟
  const [timerLabel, setTimerLabel] = useState("Session"); //显示的文本
  const [timerStatus, setTimerStatus] = useState('stop'); //整个计时器状态 倒计时在运行还是不运行
  const [sessionStatus, setSessionStatus] = useState('stop'); //session计时器状态，当前是否在运行session倒计时
  const [breakStatus, setBreakStatus] = useState('stop'); //break时间倒计时状态
  const [timeLeft,setTimeLeft] = useState(sessionTime*SECONDS_PER_MINUTE) //计时器剩余时间，单位秒
  const audioRef = useRef(null)

  useEffect(()=>{
    setTimeLeft(sessionTime*SECONDS_PER_MINUTE);
  },[sessionTime])  //初始化或者变更sessionTime时，设置剩余时间为session时间转换为妙

  useEffect(()=>{
    if(sessionStatus === 'start') {
      console.log("到了session倒计时启动",Date.now())
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);
          //播放音乐
          audioRef.current.play() //正常，先注释
          setSessionStatus("stop") //停止了session倒计时运行状态
          //切换到break倒计时
          setTimerLabel('Break')
          setBreakStatus("start")
          setTimeLeft(breakTime*SECONDS_PER_MINUTE) //设置剩余时间为breaktime的时间换成秒
        }
      }, 1000);

      return ()=>{
        clearInterval(timer)
      }
    }

    if (breakStatus === "start") {
      console.log("到了break倒计时启动",Date.now())
      
      const breakTimer = setInterval(()=>{
        if (timeLeft > 0) {
          setTimeLeft(timeLeft -1);
        }else{
          //break结束了
          clearInterval(breakTimer);
          audioRef.current.play() //播放音乐
          setBreakStatus("stop")

          //切换到session倒计时
          setTimerLabel("Session")
          setSessionStatus("start")
          setTimeLeft(sessionTime*SECONDS_PER_MINUTE) //设置剩余时间为session时间秒
        }
      },1000)

      return ()=>{
        clearInterval(breakTimer)
      }
    }

  },[sessionStatus,breakStatus,timeLeft]) //计时器变化改变时执行

  //操控开始暂停、刷新
  function clickStartStop() {
    console.log("click start/pause")

    setTimerStatus(timerStatus === 'stop' ? 'start' : 'stop');

    if(timerLabel ==="Session") {
      setSessionStatus(sessionStatus==="stop"? 'start': 'stop');
    }
    if(timerLabel ==="Break") {
      setBreakStatus(breakStatus==="stop"? 'start': 'stop');
    }
  }

  function clickReset() {
    // console.log("点击reset")
    setTimerStatus('stop')
    setSessionStatus("stop")
    setBreakStatus("stop")
    setSessionTime(SESSION_TIME)
    setBreakTime(BREAK_TIME)
    setTimeLeft(SESSION_TIME*SECONDS_PER_MINUTE)
  }

  //更新剩余时间
  function updateTimeLeft() {
    console.log("执行更新了")
    console.log(Date.now())
    console.log("剩余时间:",timeLeft)
    if(timeLeft > 0) {
      let newTimeLeft = timeLeft-1
      console.log("设置新时间：",newTimeLeft)
      setTimeLeft(newTimeLeft)
    }
  }

  const  minutes = Math.floor(timeLeft / 60);
  const  seconds = timeLeft % 60;
  
  //设置时间的一些方法
  function handleSessionIncrease() {
    if (sessionTime >= 60) {
      return
    }
    setSessionTime(sessionTime + 1)
  }
  function handleSessionDecrease() {
    if (sessionTime <= 1) {
      return
    }
    setSessionTime(sessionTime - 1)
  }

  function handleBreakIncrease() {
    if (breakTime >= 60) {
      return
    }
    setBreakTime(breakTime + 1)
  }
  function handleBreakDecrease() {
    if (breakTime <= 1) {
      return
    }
    setBreakTime(breakTime - 1)
  }

  return (
    <div className="App">
      <div id="clock-container">
        <h2 id='title'>Pomodoro Timer</h2>

        <div id="clock">
          <div id='timer-label'>{timerLabel}</div>
          <div id='time-left'>
            {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
          </div>
        </div>

        <div id='controller'>
          <div id='start_stop' className='control-btn' onClick={clickStartStop}>
            {timerStatus === "stop" ? <FontAwesomeIcon icon={faPlay} size='2x'/> : <FontAwesomeIcon icon={faPause} size='2x'/> }
          </div>
          <div id='reset' className='control-btn' onClick={clickReset} alt="reset">
            <FontAwesomeIcon icon={faRotateLeft} size='2x' alt='reset'/>
          </div>
          <audio id='beep' src='https://github.com/gaomingyang/pomodoro-timer/raw/main/public/audios/sound_1.mp3' ref={audioRef}></audio>
        </div>

        <div id="setting">
          <div className='setting-item'>
            <div id="session-label">Session Length</div>
            <div className="setting-bar">
              <div className='setting-btn' id='session-increment' onClick={handleSessionIncrease}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="black" />
              </div>

              <div id='session-length'>{sessionTime}</div>

              <div className='setting-btn' id='session-decrement' onClick={handleSessionDecrease}>
                <FontAwesomeIcon icon={faMinus} size="1x" color="black" />
              </div>

            </div>
          </div>
          <div className='setting-item'>
            <div id='break-label'>Break Length</div>
            <div className="setting-bar">
              <div className='setting-btn' id='break-increment' onClick={handleBreakIncrease}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="black" />
              </div>
              <div id='break-length'>{breakTime}</div>
              <div className='setting-btn' id='break-decrement' onClick={handleBreakDecrease}>
                <FontAwesomeIcon icon={faMinus} size="1x" color="black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer">
          Designed and Coded by <br /> <a href='https://github.com/gaomingyang/pomodoro-timer'>Mingyang</a>
      </div>
    </div>
  );
}

export default App;
