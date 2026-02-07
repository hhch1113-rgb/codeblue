const questions = [
    // ① 감정 표현 (O / C)
    {
        id: 1,
        question: "연인이 서운하게 했을 때 나는",
        options: { A: "바로 말하는 편이다", B: "혼자 정리한 뒤 넘어간다" },
        axis: '감정 표현',
        value: { A: 'O', B: 'C' }
    },
    {
        id: 2,
        question: "좋아하는 감정은",
        options: { A: "말이나 행동으로 표현해야 한다고 생각한다", B: "굳이 말하지 않아도 느껴질 수 있다고 생각한다" },
        axis: '감정 표현',
        value: { A: 'O', B: 'C' }
    },
    {
        id: 3,
        question: "다툰 뒤 나는",
        options: { A: "바로 풀고 싶다", B: "시간을 두고 싶다" },
        axis: '감정 표현',
        value: { A: 'O', B: 'C' }
    },
    {
        id: 4,
        question: "연애 중 내 감정 상태를",
        options: { A: "상대가 잘 알고 있는 편이다", B: "잘 모를 것 같다고 느낀다" },
        axis: '감정 표현',
        value: { A: 'O', B: 'C' }
    },
    {
        id: 5,
        question: "연인에게 애정 표현을",
        options: { A: "자주 하는 편이다", B: "마음속으로만 하는 경우가 많다" },
        axis: '감정 표현',
        value: { A: 'O', B: 'C' }
    },
    // ② 안정 vs 설렘 (S / T)
    {
        id: 6,
        question: "연애에서 가장 중요한 건",
        options: { A: "믿을 수 있는 안정감", B: "계속 설레는 감정" },
        axis: '안정감 추구',
        value: { A: 'S', B: 'T' }
    },
    {
        id: 7,
        question: "데이트가 반복될 때",
        options: { A: "익숙해도 편하면 좋다", B: "지루해지면 힘들다" },
        axis: '안정감 추구',
        value: { A: 'S', B: 'T' }
    },
    {
        id: 8,
        question: "연애 초반보다 중반 이후가",
        options: { A: "더 편하고 좋다", B: "아쉬운 경우가 많다" },
        axis: '안정감 추구',
        value: { A: 'S', B: 'T' }
    },
    {
        id: 9,
        question: "연인의 예측 가능한 행동은",
        options: { A: "신뢰감을 준다", B: "재미가 줄어든다" },
        axis: '안정감 추구',
        value: { A: 'S', B: 'T' }
    },
    {
        id: 10,
        question: "연애는",
        options: { A: "일상의 일부가 되는 게 좋다", B: "특별한 이벤트여야 한다" },
        axis: '안정감 추구',
        value: { A: 'S', B: 'T' }
    },
    // ③ 계획 vs 즉흥 (P / F)
    {
        id: 11,
        question: "데이트 약속은",
        options: { A: "미리 정해두는 게 좋다", B: "그날 기분 따라 정하는 게 좋다" },
        axis: '관계 운영 방식',
        value: { A: 'P', B: 'F' }
    },
    {
        id: 12,
        question: "여행을 간다면",
        options: { A: "일정이 있어야 편하다", B: "즉흥이 더 재밌다" },
        axis: '관계 운영 방식',
        value: { A: 'P', B: 'F' }
    },
    {
        id: 13,
        question: "연인이 갑자기 약속을 바꾸면",
        options: { A: "당황하거나 불편하다", B: "크게 신경 쓰지 않는다" },
        axis: '관계 운영 방식',
        value: { A: 'P', B: 'F' }
    },
    {
        id: 14,
        question: "데이트 장소를",
        options: { A: "미리 찾아본다", B: "가서 정한다" },
        axis: '관계 운영 방식',
        value: { A: 'P', B: 'F' }
    },
    {
        id: 15,
        question: "연애는",
        options: { A: "어느 정도 예측 가능해야 한다", B: "변수가 있어야 재미있다" },
        axis: '관계 운영 방식',
        value: { A: 'P', B: 'F' }
    },
    // ④ 연인 중심 vs 개인 중심 (B / I)
    {
        id: 16,
        question: "연애를 하면",
        options: { A: "연인이 내 생활의 중심이 된다", B: "기존 생활 패턴을 유지하고 싶다" },
        axis: '개인 영역 인식',
        value: { A: 'B', B: 'I' }
    },
    {
        id: 17,
        question: "혼자만의 시간이",
        options: { A: "크게 필요하지 않다", B: "꼭 필요하다" },
        axis: '개인 영역 인식',
        value: { A: 'B', B: 'I' }
    },
    {
        id: 18,
        question: "연인이 자주 보자고 하면",
        options: { A: "좋다", B: "부담스러울 수 있다" },
        axis: '개인 영역 인식',
        value: { A: 'B', B: 'I' }
    },
    {
        id: 19,
        question: "연애 중에도",
        options: { A: "웬만한 일은 함께 하고 싶다", B: "각자의 시간이 중요하다" },
        axis: '개인 영역 인식',
        value: { A: 'B', B: 'I' }
    },
    {
        id: 20,
        question: "연애는",
        options: { A: "둘이 하나의 팀이 되는 거다", B: "두 사람이 각자 존재하는 관계다" },
        axis: '개인 영역 인식',
        value: { A: 'B', B: 'I' }
    },
];

const results = {
    // 1️⃣ OSPB
    "OSPB": {
        title: "다정한 현실주의 연애형",
        image: "https://via.placeholder.com/400x200/FFC0CB/FFFFFF?text=OSPB",
        summary: "감정 표현에 솔직하고 안정적인 관계를 계획적으로 만들어가며 연인 중심으로 움직이는 타입.",
        description: "사랑을 말과 행동으로 표현하는 데 거리낌이 없고, 관계의 미래를 자연스럽게 고민한다. 데이트, 기념일, 약속 등을 미리 챙기며 연인을 삶의 중요한 우선순위에 둔다.",
        pros: ["신뢰감이 매우 높다", "연인이 사랑받고 있다는 느낌을 받기 쉽다", "장기 연애에 강하다"],
        cons: ["상대가 부담을 느낄 수 있음", "헌신이 과해지면 서운함이 쌓일 수 있음"],
        advice: "상대의 속도와 독립성도 존중해야 관계가 오래간다."
    },
    // 2️⃣ OSPI
    "OSPI": {
        title: "헌신적이지만 균형을 아는 연애형",
        image: "https://via.placeholder.com/400x200/FFB6C1/FFFFFF?text=OSPI",
        summary: "솔직하고 안정적인 성향이지만, 개인의 영역도 중요하게 여긴다.",
        description: "연애에 진심이지만 모든 시간을 연인에게 쓰지는 않는다. 감정 표현은 분명하고, 관계의 안정성을 중시한다.",
        pros: ["건강한 거리감 유지", "감정 소통이 원활함"],
        cons: ["상대가 “차분하다”고 느낄 수 있음"],
        advice: "가끔은 의도적으로 감정 표현을 더 드러내면 좋다."
    },
    // 3️⃣ OSFB
    "OSFB": {
        title: "설렘 가득한 올인형 연애가",
        image: "https://via.placeholder.com/400x200/FF69B4/FFFFFF?text=OSFB",
        summary: "감정 표현이 풍부하고, 설렘을 중시하며, 연인에게 깊이 몰입하는 타입.",
        description: "연애 초반 불꽃이 강하고, 즉흥적인 데이트를 즐긴다. 연인을 중심으로 하루가 돌아간다.",
        pros: ["연애의 재미와 열정이 크다", "상대를 특별하게 느끼게 한다"],
        cons: ["감정 기복", "관계가 불안정해질 수 있음"],
        advice: "설렘만큼 안정도 함께 키워야 오래 간다."
    },
    // 4️⃣ OSFI
    "OSFI": {
        title: "자유로운 로맨티스트",
        image: "https://via.placeholder.com/400x200/FF1493/FFFFFF?text=OSFI",
        summary: "솔직하고 설렘을 즐기지만, 개인의 자유도 놓치지 않는다.",
        description: "감정 표현은 풍부하지만 구속은 싫어한다. 연애도 삶의 일부일 뿐 전부는 아니다.",
        pros: ["밝고 매력적인 연애 분위기", "서로 숨 막히지 않는 관계"],
        cons: ["상대가 불안함을 느낄 수 있음"],
        advice: "자유 속에서도 안정 신호를 주는 게 중요하다."
    },
    // 5️⃣ CSPB
    "CSPB": {
        title: "묵묵한 책임형 연애가",
        image: "https://via.placeholder.com/400x200/DB7093/FFFFFF?text=CSPB",
        summary: "감정 표현은 적지만, 행동으로 책임을 다하는 안정적인 타입.",
        description: "말보다 행동이 많고, 계획적으로 관계를 이끈다. 연인을 삶의 중심에 두지만 표현은 조용하다.",
        pros: ["신뢰감이 매우 높다", "위기 상황에 강하다"],
        cons: ["감정이 안 보인다는 오해"],
        advice: "가끔은 말로 표현하는 연습이 필요하다."
    },
    // 6️⃣ CSPI
    "CSPI": {
        title: "차분한 장기 연애형",
        image: "https://via.placeholder.com/400x200/CD5C5C/FFFFFF?text=CSPI",
        summary: "안정과 개인의 균형을 중요하게 여기는 현실적인 타입.",
        description: "감정 기복이 적고, 연애를 삶의 한 부분으로 받아들인다.",
        pros: ["안정적인 관계 유지", "감정 소모가 적다"],
        cons: ["설렘 부족"],
        advice: "의도적인 이벤트가 관계에 활력을 준다."
    },
    // 7️⃣ CSFB
    "CSFB": {
        title: "조용하지만 깊은 애착형",
        image: "https://via.placeholder.com/400x200/B22222/FFFFFF?text=CSFB",
        summary: "표현은 적지만 설렘과 애정은 강하고, 연인 중심으로 움직인다.",
        description: "겉으로는 무심해 보여도 관계에 깊이 몰입한다.",
        pros: ["헌신적", "깊은 정서적 유대"],
        cons: ["감정이 쌓였다가 폭발"],
        advice: "감정을 조금씩 나누는 연습이 필요하다."
    },
    // 8️⃣ CSFI
    "CSFI": {
        title: "자기만의 리듬을 지키는 연애형",
        image: "https://via.placeholder.com/400x200/8B0000/FFFFFF?text=CSFI",
        summary: "설렘은 느끼되, 개인의 공간을 최우선으로 여긴다.",
        description: "연락 빈도나 만남이 일정하지 않을 수 있다.",
        pros: ["성숙한 거리감", "독립적인 매력"],
        cons: ["차갑다는 오해"],
        advice: "상대에게 안심 신호를 주는 표현이 필요하다."
    },
    // 9️⃣ OTPB
    "OTPB": {
        title: "열정적인 미래 설계자",
        image: "https://via.placeholder.com/400x200/FF4500/FFFFFF?text=OTPB",
        summary: "솔직하고 설렘을 즐기지만, 계획과 헌신도 놓치지 않는다.",
        description: "연애를 이벤트처럼 즐기면서도 미래를 함께 그린다.",
        pros: ["재미와 안정의 균형"],
        cons: ["스스로 지치기 쉬움"],
        advice: "모든 걸 완벽히 하려 하지 말 것."
    },
    // 10️⃣ OTPI
    "OTPI": {
        title: "활기찬 현실 감각형",
        image: "https://via.placeholder.com/400x200/FF8C00/FFFFFF?text=OTPI",
        summary: "설렘을 즐기지만 개인의 삶도 중요시한다.",
        description: "밝고 적극적이지만 집착하지 않는다.",
        pros: ["매력적인 에너지"],
        cons: ["깊이가 부족하다는 평가"],
        advice: "감정의 깊이를 천천히 쌓아보자."
    },
    // 11️⃣ OTFB
    "OTFB": {
        title: "불꽃형 연애 몰입가",
        image: "https://via.placeholder.com/400x200/FFA500/FFFFFF?text=OTFB",
        summary: "즉흥적이고 감정 표현이 강하며 연인 중심이다.",
        description: "강렬한 사랑을 빠르게 불태운다.",
        pros: ["강한 로맨스"],
        cons: ["번아웃"],
        advice: "속도를 조절하는 게 핵심이다."
    },
    // 12️⃣ OTFI
    "OTFI": {
        title: "자유로운 연애 탐험가",
        image: "https://via.placeholder.com/400x200/FFD700/FFFFFF?text=OTFI",
        summary: "설렘과 자유를 동시에 추구한다.",
        description: "연애를 즐기되 얽매이지 않는다.",
        pros: ["가벼운 매력"],
        cons: ["상대의 불안"],
        advice: "책임감 있는 신호가 필요하다."
    },
    // 13️⃣ CTPB
    "CTPB": {
        title: "조용한 헌신형 로맨티스트",
        image: "https://via.placeholder.com/400x200/800080/FFFFFF?text=CTPB",
        summary: "겉으로 드러내지 않지만 설렘과 책임이 공존한다.",
        description: "말수는 적지만 행동은 확실하다.",
        pros: ["신뢰도 높음"],
        cons: ["감정 전달 부족"],
        advice: "표현은 관계의 윤활유다."
    },
    // 14️⃣ CTPI
    "CTPI": {
        title: "차분한 자유 연애형",
        image: "https://via.placeholder.com/400x200/4B0082/FFFFFF?text=CTPI",
        summary: "설렘은 느끼되 거리감을 유지한다.",
        description: "연애에 과몰입하지 않는다.",
        pros: ["성숙한 태도"],
        cons: ["온도 차"],
        advice: "연인의 기대치를 확인하자."
    },
    // 15️⃣ CTFB
    "CTFB": {
        title: "은근히 불타는 타입",
        image: "https://via.placeholder.com/400x200/000080/FFFFFF?text=CTFB",
        summary: "속은 뜨겁지만 겉은 차분한 즉흥형.",
        description: "감정이 쌓여 한 번에 터진다.",
        pros: ["깊은 애정"],
        cons: ["예측 불가"],
        advice: "감정 배출구를 만들어라."
    },
    // 16️⃣ CTFI
    "CTFI": {
        title: "독립적 감정 절제형",
        image: "https://via.placeholder.com/400x200/000000/FFFFFF?text=CTFI",
        summary: "설렘은 느끼지만 표현도, 의존도 최소화한다.",
        description: "자기 세계가 확실하다.",
        pros: ["자존감 높음"],
        cons: ["거리감"],
        advice: "연애는 혼자가 아니라 둘이다."
    }
};

const axisMapping = {
    '감정 표현': { A: 'O', B: 'C' },
    '안정감 추구': { A: 'S', B: 'T' },
    '관계 운영 방식': { A: 'P', B: 'F' },
    '개인 영역 인식': { A: 'B', B: 'I' }
};

// DOM Elements
const headerSection = document.querySelector('header');
const testArea = document.getElementById('test-area');
const startTestBtn = document.getElementById('start-test');
const questionSection = document.getElementById('question-section');
const questionNumberEl = questionSection.querySelector('.question-number');
const questionTextEl = questionSection.querySelector('.question-text');
const optionsContainer = questionSection.querySelector('.options-container');
const progressBarEl = questionSection.querySelector('.progress-bar');

const resultSection = document.getElementById('result-section');
const resultTitleEl = resultSection.querySelector('.result-title');
const resultCodeAttribute = resultSection.querySelector('.result-code');
const resultImageEl = resultSection.querySelector('.result-image');
const resultSummaryEl = resultSection.querySelector('.result-summary');
const resultDescriptionEl = resultSection.querySelector('.result-description');
const resultProsEl = resultSection.querySelector('.result-pros');
const resultConsEl = resultSection.querySelector('.result-cons');
const resultAdviceEl = resultSection.querySelector('.result-advice');
const shareResultBtn = document.getElementById('share-result');
const feedbackThumbUp = document.getElementById('feedback-thumb-up');
const feedbackThumbDown = document.getElementById('feedback-thumb-down');
const restartTestBtn = document.getElementById('restart-test');


// State
let currentQuestionIndex = 0;
let userAnswers = []; // Store chosen letter for each question
let axisScores = {
    'O': 0, 'C': 0,
    'S': 0, 'T': 0,
    'P': 0, 'F': 0,
    'B': 0, 'I': 0
};

// Functions
function startTest() {
    headerSection.style.display = 'none';
    testArea.style.display = 'block';
    currentQuestionIndex = 0;
    userAnswers = [];
    axisScores = {
        'O': 0, 'C': 0,
        'S': 0, 'T': 0,
        'P': 0, 'F': 0,
        'B': 0, 'I': 0
    };
    displayQuestion();
    resultSection.style.display = 'none'; // Hide result section if it was shown
    questionSection.style.display = 'block'; // Ensure question section is visible
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        questionNumberEl.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        questionTextEl.textContent = questionData.question;
        
        optionsContainer.innerHTML = ''; // Clear previous options
        for (const optionKey in questionData.options) {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = questionData.options[optionKey];
            button.dataset.option = optionKey;
            button.addEventListener('click', () => handleAnswer(optionKey));
            optionsContainer.appendChild(button);
        }
        updateProgressBar();
    } else {
        calculateResult();
    }
}

function handleAnswer(selectedOption) {
    const questionData = questions[currentQuestionIndex];
    userAnswers.push({
        questionId: questionData.id,
        selectedOption: selectedOption,
        axis: questionData.axis,
        value: questionData.value[selectedOption]
    });
    
    // Increment score for the chosen axis value
    axisScores[questionData.value[selectedOption]]++;

    currentQuestionIndex++;
    displayQuestion();
}

function calculateResult() {
    questionSection.style.display = 'none'; // Hide question section
    resultSection.style.display = 'block'; // Show result section

    const finalResult = [];

    // 감정 표현 (O/C)
    finalResult.push(axisScores['O'] >= axisScores['C'] ? 'O' : 'C');
    // 안정감 추구 (S/T)
    finalResult.push(axisScores['S'] >= axisScores['T'] ? 'S' : 'T');
    // 관계 운영 방식 (P/F)
    finalResult.push(axisScores['P'] >= axisScores['F'] ? 'P' : 'F');
    // 개인 영역 인식 (B/I)
    finalResult.push(axisScores['B'] >= axisScores['I'] ? 'B' : 'I');

    const resultCode = finalResult.join('');
    displayResult(resultCode);
}

function displayResult(resultCode) {
    const resultData = results[resultCode];

    if (!resultData) {
        resultTitleEl.textContent = "결과를 찾을 수 없습니다.";
        resultCodeAttribute.textContent = resultCode;
        // Optionally hide other elements or show a default message
        return;
    }

    resultTitleEl.textContent = resultData.title;
    resultCodeAttribute.textContent = `(${resultCode})`;
    
    if (resultData.image) {
        resultImageEl.src = resultData.image;
        resultImageEl.style.display = 'block';
    } else {
        resultImageEl.style.display = 'none';
    }

    resultSummaryEl.textContent = resultData.summary;
    resultDescriptionEl.textContent = resultData.description;

    resultProsEl.innerHTML = '';
    resultData.pros.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resultProsEl.appendChild(li);
    });

    resultConsEl.innerHTML = '';
    resultData.cons.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resultConsEl.appendChild(li);
    });

    resultAdviceEl.textContent = resultData.advice;
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
}

function shareResult() {
    const shareText = `내 연애 스타일은 ${resultTitleEl.textContent} ${resultCodeAttribute.textContent}!
${window.location.href}`;
    if (navigator.share) {
        navigator.share({
            title: '내 연애 스타일은?',
            text: shareText,
            url: window.location.href,
        }).then(() => {
            alert('결과가 공유되었습니다!');
        }).catch((error) => {
            console.error('공유 실패:', error);
            alert('공유 실패! 클립보드로 복사합니다.');
            navigator.clipboard.writeText(shareText); // Fallback to clipboard
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('결과가 클립보드에 복사되었습니다!');
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사 실패!');
        });
    }
}

// Event Listeners
startTestBtn.addEventListener('click', startTest);
shareResultBtn.addEventListener('click', shareResult);
restartTestBtn.addEventListener('click', startTest); // Restart uses the same logic as start

feedbackThumbUp.addEventListener('click', () => alert('피드백 감사합니다! (👍)'));
feedbackThumbDown.addEventListener('click', () => alert('피드백 감사합니다! (👎)'));


// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    headerSection.style.display = 'block';
    testArea.style.display = 'none';
});
