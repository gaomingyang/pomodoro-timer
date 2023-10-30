import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPlay,faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

function App() {
  const [sessionTime, setSessionTime] = useState(25) //一段时间长度
  const [breakTime, setBreakTime] = useState(5) //单位是分钟
  const [timeLabel, setTimeLabel] = useState("Session"); //显示的文本
  const [timerStatus, setTimerStatus] = useState('stop');

  const minutes = sessionTime;
  const seconds = 0;

  //操控开始暂停、刷新
  function clickStartStop() {
    console.log("click start/stop")
    if (timerStatus == 'stop') {
      console.log("开始启动");

    }
  }


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
            <FontAwesomeIcon icon={faPlay} size='2x'/>
            <FontAwesomeIcon icon={faPause} size='2x'/>
          </div>
          <div id='reset' className='control-btn'>
            <FontAwesomeIcon icon={faRotateLeft} size='2x'/>
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
