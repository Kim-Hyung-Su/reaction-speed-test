// 시작 -> 대기 -> 클릭

const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

// Math.floor((Math.random() * (최대값 - 최소값)) + 최소값)
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const SCREEN_STATE = {
    START: 'start',
    WAIT: 'wait',
    CLICK: 'click',
};

let startTime;
let endTime;
const records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
    if (event.target.classList.contains(SCREEN_STATE.START)) {  // 파랑
        $screen.classList.remove(SCREEN_STATE.START);
        $screen.classList.add(SCREEN_STATE.WAIT);
        $screen.textContent = '준비';

        timeoutId = setTimeout(function() {
            startTime = new Date();
            
            $screen.classList.remove(SCREEN_STATE.WAIT);
            $screen.classList.add(SCREEN_STATE.CLICK);
            $screen.textContent = '클릭!';
        }, getRandomDelay(2000, 3000));    // 2~3초 사이. 2000~3000 사이 수

    } else if (event.target.classList.contains(SCREEN_STATE.WAIT))  {   // 빨강
        clearTimeout(timeoutId);

        $screen.classList.remove(SCREEN_STATE.WAIT);
        $screen.classList.add(SCREEN_STATE.START);
        $screen.textContent = '실패! 너무 빨리 눌렀습니다.';

    } else if (event.target.classList.contains(SCREEN_STATE.CLICK)) {   // 파랑
        endTime = new Date();
        const recordTime = endTime - startTime;
        records.push(recordTime);
        
        let sum = 0;
        for (let i=0; i<records.length; i++) {
            sum += records[i];
        }
        const average = sum / records.length;
        $result.textContent = `현재 ${recordTime}ms, 평균: ${average}ms`;   // ms/1000 = 초

        const topN = 5;
        // p: previous: 이전값.
        // c: current: 현재값.
        const topRecords = records.sort((p, c) => p - c).slice(0, topN);
        for (let i=0; i<topRecords.length; i++) {
            $result.append(
                document.createElement('br'), `${i+1}위: ${topRecords[i]}ms`,
            );
        }

        startTime = null;
        endTime = null;

        $screen.classList.remove(SCREEN_STATE.CLICK);
        $screen.classList.add(SCREEN_STATE.START);
        $screen.textContent = '클릭해서 시작하세요.';
    }
})

