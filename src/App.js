import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPlay,faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

function App() {
  const [sessionTime, setSessionTime] = useState(25) //一段时间长度
  const [breakTime, setBreakTime] = useState(5) //单位是分钟
  const [timeLabel, setTimeLabel] = useState("Session"); //显示的文本
  const [timerStatus, setTimerStatus] = useState('stop'); //计时器状态

  const [timeLeft,setTimeLeft] = useState(25*60) //计时器剩余时间，单位秒

  useEffect(()=>{
    const newLeftTime = sessionTime*60
    setTimeLeft(newLeftTime)
  },[sessionTime])  //初始化或者变更sessionTime时，设置剩余时间为session时间转换为妙

  useEffect(()=>{
    if(timerStatus === 'start') {
      // console.log("现在是start")
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);

      return ()=>{
        clearInterval(timer)
      }
    }else{
      // console.log("现在stop")
    }
  },[timerStatus,timeLeft]) //计时器变化改变时执行

  //操控开始暂停、刷新
  function clickStartStop() {
    // console.log("click start/stop")
    setTimerStatus(timerStatus === 'stop' ? 'start' : 'stop');
  }

  function clickReset() {
    // console.log("点击reset")
    setTimerStatus('stop')
    setSessionTime(25)
    setBreakTime(5)
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


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
          <div id='time-label'>{timeLabel}</div>
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
        </div>

        <div id="setting">
          <div className='setting-item'>
            <div id="session-label">Session Length</div>
            <div className="setting-bar">
              <div className='setting-btn' onClick={handleSessionIncrease}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="black" />
              </div>

              <div id='session-length'>{sessionTime}</div>

              <div className='setting-btn' onClick={handleSessionDecrease}>
                <FontAwesomeIcon icon={faMinus} size="1x" color="black" />
              </div>

            </div>
          </div>

          <div className='setting-item'>
            <div id='break-label'>Break Length</div>
            <div className="setting-bar">
              <div className='setting-btn' onClick={handleBreakIncrease}>
                <FontAwesomeIcon icon={faPlus} size="1x" color="black" />
              </div>
              <div id='break-length'>{breakTime}</div>
              <div className='setting-btn' onClick={handleBreakDecrease}>
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
