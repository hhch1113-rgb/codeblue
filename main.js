// main.js - 연애 스타일 테스트 (모바일 최적화 + 16가지 완전 버전)
const cleanText = (text) => {
    if (!text) return '';
    return text
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

let questions = [];
let results = {};

function getTranslatedContent() {
    questions = [
        // ① 감정 표현 (O / C)
        { id: 1, question: locales[currentLang].q1_question, options: { A: locales[currentLang].q1_option_a, B: locales[currentLang].q1_option_b }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
        { id: 2, question: locales[currentLang].q2_question, options: { A: locales[currentLang].q2_option_a, B: locales[currentLang].q2_option_b }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
        { id: 3, question: locales[currentLang].q3_question, options: { A: locales[currentLang].q3_option_a, B: locales[currentLang].q3_option_b }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
        { id: 4, question: locales[currentLang].q4_question, options: { A: locales[currentLang].q4_option_a, B: locales[currentLang].q4_option_b }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
        { id: 5, question: locales[currentLang].q5_question, options: { A: locales[currentLang].q5_option_a, B: locales[currentLang].q5_option_b }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
        // ② 안정 vs 설렘 (S / T)
        { id: 6, question: locales[currentLang].q6_question, options: { A: locales[currentLang].q6_option_a, B: locales[currentLang].q6_option_b }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
        { id: 7, question: locales[currentLang].q7_question, options: { A: locales[currentLang].q7_option_a, B: locales[currentLang].q7_option_b }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
        { id: 8, question: locales[currentLang].q8_question, options: { A: locales[currentLang].q8_option_a, B: locales[currentLang].q8_option_b }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
        { id: 9, question: locales[currentLang].q9_question, options: { A: locales[currentLang].q9_option_a, B: locales[currentLang].q9_option_b }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
        { id: 10, question: locales[currentLang].q10_question, options: { A: locales[currentLang].q10_option_a, B: locales[currentLang].q10_option_b }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
        // ③ 계획 vs 즉흥 (P / F)
        { id: 11, question: locales[currentLang].q11_question, options: { A: locales[currentLang].q11_option_a, B: locales[currentLang].q11_option_b }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
        { id: 12, question: locales[currentLang].q12_question, options: { A: locales[currentLang].q12_option_a, B: locales[currentLang].q12_option_b }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
        { id: 13, question: locales[currentLang].q13_question, options: { A: locales[currentLang].q13_option_a, B: locales[currentLang].q13_option_b }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
        { id: 14, question: locales[currentLang].q14_question, options: { A: locales[currentLang].q14_option_a, B: locales[currentLang].q14_option_b }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
        { id: 15, question: locales[currentLang].q15_question, options: { A: locales[currentLang].q15_option_a, B: locales[currentLang].q15_option_b }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
        // ④ 연인 중심 vs 개인 중심 (B / I)
        { id: 16, question: locales[currentLang].q16_question, options: { A: locales[currentLang].q16_option_a, B: locales[currentLang].q16_option_b }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
        { id: 17, question: locales[currentLang].q17_question, options: { A: locales[currentLang].q17_option_a, B: locales[currentLang].q17_option_b }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
        { id: 18, question: locales[currentLang].q18_question, options: { A: locales[currentLang].q18_option_a, B: locales[currentLang].q18_option_b }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
        { id: 19, question: locales[currentLang].q19_question, options: { A: locales[currentLang].q19_option_a, B: locales[currentLang].q19_option_b }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
        { id: 20, question: locales[currentLang].q20_question, options: { A: locales[currentLang].q20_option_a, B: locales[currentLang].q20_option_b }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
    ];
    results = {
        "OSPB": {
            title: locales[currentLang].result_ospb_title,
            summary: locales[currentLang].result_ospb_summary,
            description: locales[currentLang].result_ospb_description,
            pros: locales[currentLang].result_ospb_pros,
            cons: locales[currentLang].result_ospb_cons,
            advice: locales[currentLang].result_ospb_advice
        },
        "OSPI": {
            title: locales[currentLang].result_ospi_title,
            summary: locales[currentLang].result_ospi_summary,
            description: locales[currentLang].result_ospi_description,
            pros: locales[currentLang].result_ospi_pros,
            cons: locales[currentLang].result_ospi_cons,
            advice: locales[currentLang].result_ospi_advice
        },
        "OSFB": {
            title: locales[currentLang].result_osfb_title,
            summary: locales[currentLang].result_osfb_summary,
            description: locales[currentLang].result_osfb_description,
            pros: locales[currentLang].result_osfb_pros,
            cons: locales[currentLang].result_osfb_cons,
            advice: locales[currentLang].result_osfb_advice
        },
        "OSFI": {
            title: locales[currentLang].result_osfi_title,
            summary: locales[currentLang].result_osfi_summary,
            description: locales[currentLang].result_osfi_description,
            pros: locales[currentLang].result_osfi_pros,
            cons: locales[currentLang].result_osfi_cons,
            advice: locales[currentLang].result_osfi_advice
        },
        "OTPB": {
            title: locales[currentLang].result_otpb_title,
            summary: locales[currentLang].result_otpb_summary,
            description: locales[currentLang].result_otpb_description,
            pros: locales[currentLang].result_otpb_pros,
            cons: locales[currentLang].result_otpb_cons,
            advice: locales[currentLang].result_otpb_advice
        },
        "OTPI": {
            title: locales[currentLang].result_otpi_title,
            summary: locales[currentLang].result_otpi_summary,
            description: locales[currentLang].result_otpi_description,
            pros: locales[currentLang].result_otpi_pros,
            cons: locales[currentLang].result_otpi_cons,
            advice: locales[currentLang].result_otpi_advice
        },
        "OTFB": {
            title: locales[currentLang].result_otfb_title,
            summary: locales[currentLang].result_otfb_summary,
            description: locales[currentLang].result_otfb_description,
            pros: locales[currentLang].result_otfb_pros,
            cons: locales[currentLang].result_otfb_cons,
            advice: locales[currentLang].result_otfb_advice
        },
        "OTFI": {
            title: locales[currentLang].result_otfi_title,
            summary: locales[currentLang].result_otfi_summary,
            description: locales[currentLang].result_otfi_description,
            pros: locales[currentLang].result_otfi_pros,
            cons: locales[currentLang].result_otfi_cons,
            advice: locales[currentLang].result_otfi_advice
        },
        "CSPB": {
            title: locales[currentLang].result_cspb_title,
            summary: locales[currentLang].result_cspb_summary,
            description: locales[currentLang].result_cspb_description,
            pros: locales[currentLang].result_cspb_pros,
            cons: locales[currentLang].result_cspb_cons,
            advice: locales[currentLang].result_cspb_advice
        },
        "CSPI": {
            title: locales[currentLang].result_cspi_title,
            summary: locales[currentLang].result_cspi_summary,
            description: locales[currentLang].result_cspi_description,
            pros: locales[currentLang].result_cspi_pros,
            cons: locales[currentLang].result_cspi_cons,
            advice: locales[currentLang].result_cspi_advice
        },
        "CSFB": {
            title: locales[currentLang].result_csfb_title,
            summary: locales[currentLang].result_csfb_summary,
            description: locales[currentLang].result_csfb_description,
            pros: locales[currentLang].result_csfb_pros,
            cons: locales[currentLang].result_csfb_cons,
            advice: locales[currentLang].result_csfb_advice
        },
        "CSFI": {
            title: locales[currentLang].result_csfi_title,
            summary: locales[currentLang].result_csfi_summary,
            description: locales[currentLang].result_csfi_description,
            pros: locales[currentLang].result_csfi_pros,
            cons: locales[currentLang].result_csfi_cons,
            advice: locales[currentLang].result_csfi_advice
        },
        "CTPB": {
            title: locales[currentLang].result_ctpb_title,
            summary: locales[currentLang].result_ctpb_summary,
            description: locales[currentLang].result_ctpb_description,
            pros: locales[currentLang].result_ctpb_pros,
            cons: locales[currentLang].result_ctpb_cons,
            advice: locales[currentLang].result_ctpb_advice
        },
        "CTPI": {
            title: locales[currentLang].result_ctpi_title,
            summary: locales[currentLang].result_ctpi_summary,
            description: locales[currentLang].result_ctpi_description,
            pros: locales[currentLang].result_ctpi_pros,
            cons: locales[currentLang].result_ctpi_cons,
            advice: locales[currentLang].result_ctpi_advice
        },
        "CTFB": {
            title: locales[currentLang].result_ctfb_title,
            summary: locales[currentLang].result_ctfb_summary,
            description: locales[currentLang].result_ctfb_description,
            pros: locales[currentLang].result_ctfb_pros,
            cons: locales[currentLang].result_ctfb_cons,
            advice: locales[currentLang].result_ctfb_advice
        },
        "CTFI": {
            title: locales[currentLang].result_ctfi_title,
            summary: locales[currentLang].result_ctfi_summary,
            description: locales[currentLang].result_ctfi_description,
            pros: locales[currentLang].result_ctfi_pros,
            cons: locales[currentLang].result_ctfi_cons,
            advice: locales[currentLang].result_ctfi_advice
        }
    };
}


// DOM Elements (기존 그대로)
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
const resultCodeEl = resultSection.querySelector('.result-code');
const resultImageEl = resultSection.querySelector('.result-image');
const resultSummaryEl = resultSection.querySelector('.result-summary');
const resultDescriptionEl = resultSection.querySelector('.result-description');
const resultProsEl = resultSection.querySelector('.result-pros');
const resultConsEl = resultSection.querySelector('.result-cons');
const resultAdviceEl = resultSection.querySelector('.result-advice');
const shareResultBtn = document.getElementById('share-result');
const restartTestBtn = document.getElementById('restart-test');

// State
let currentQuestionIndex = 0;
let userAnswers = [];
let axisScores = { 'O': 0, 'C': 0, 'S': 0, 'T': 0, 'P': 0, 'F': 0, 'B': 0, 'I': 0 };

// Functions (기존 그대로, calculateResult에 디버그 로그 유지)
function startTest() {
    console.log("startTest function executed!");
    headerSection.style.display = 'none';
    testArea.style.display = 'block';
    questionSection.style.display = 'block'; // Moved this up
    resultSection.style.display = 'none'; // Moved this up

    currentQuestionIndex = 0;
    userAnswers = [];
    axisScores = { 'O': 0, 'C': 0, 'S': 0, 'T': 0, 'P': 0, 'F': 0, 'B': 0, 'I': 0 };
    getTranslatedContent(); // Ensure questions are for the current language
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionNumberEl.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        questionTextEl.textContent = cleanText(q.question);

        optionsContainer.innerHTML = '';
        for (const key in q.options) {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = cleanText(q.options[key]);
            btn.dataset.option = key;
            btn.addEventListener('click', () => handleAnswer(key));
            optionsContainer.appendChild(btn);
        }
        updateProgressBar();
    } else {
        calculateResult();
    }
}

function handleAnswer(selectedOption) {
    const q = questions[currentQuestionIndex];
    userAnswers.push({
        questionId: q.id,
        selectedOption: selectedOption,
        axis: q.axis,
        value: q.value[selectedOption]
    });
    axisScores[q.value[selectedOption]]++;
    currentQuestionIndex++;
    displayQuestion();
}

function calculateResult() {
    questionSection.style.display = 'none';
    resultSection.style.display = 'block';

    const finalResult = [];
    finalResult.push(axisScores['O'] >= axisScores['C'] ? 'O' : 'C');
    finalResult.push(axisScores['S'] >= axisScores['T'] ? 'S' : 'T');
    finalResult.push(axisScores['P'] >= axisScores['F'] ? 'P' : 'F');
    finalResult.push(axisScores['B'] >= axisScores['I'] ? 'B' : 'I');

    const resultCode = finalResult.join('');

    // 디버그 로그 (콘솔에서 확인 가능)
    console.log('=== 결과 디버깅 ===');
    console.log('Axis Scores:', axisScores);
    console.log('Final Result Code:', resultCode);
    console.log('Result Exists:', !!results[resultCode]);
    console.log('Available Keys:', Object.keys(results));

    displayResult(resultCode);
}

function displayResult(resultCode) {
    const resultData = results[resultCode];
    if (!resultData) {
        resultTitleEl.textContent = "결과를 찾을 수 없습니다.";
        resultCodeEl.textContent = `(${resultCode})`;
        resultImageEl.style.display = 'none';
        resultSummaryEl.textContent = "죄송합니다. 해당 결과 조합을 찾을 수 없습니다.";
        resultDescriptionEl.textContent = "";
        resultProsEl.innerHTML = '';
        resultConsEl.innerHTML = '';
        console.error('결과 코드를 찾을 수 없음:', resultCode);
        return;
    }

    resultTitleEl.textContent = cleanText(resultData.title);
    resultCodeEl.textContent = `(${resultCode})`;

    if (resultData.image) {
        resultImageEl.src = resultData.image;
        resultImageEl.alt = `${resultData.title} 결과 이미지`;
        resultImageEl.style.display = 'block';
        resultImageEl.onerror = () => resultImageEl.style.display = 'none';
    } else {
        resultImageEl.style.display = 'none';
    }

    resultSummaryEl.textContent = cleanText(resultData.summary);
    resultDescriptionEl.textContent = cleanText(resultData.description);
    resultAdviceEl.textContent = cleanText(resultData.advice);

    resultProsEl.innerHTML = '';
    (resultData.pros || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = cleanText(item);
        resultProsEl.appendChild(li);
    });

    resultConsEl.innerHTML = '';
    (resultData.cons || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = cleanText(item);
        resultConsEl.appendChild(li);
    });
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
}

function shareResult() {
    const shareText = `내 연애 스타일은 ${cleanText(resultTitleEl.textContent)} ${resultCodeEl.textContent}!\n${window.location.href}`;
    if (navigator.share) {
        navigator.share({ title: '내 연애 스타일은?', text: shareText, url: window.location.href })
            .then(() => alert('결과가 공유되었습니다!'))
            .catch(() => {
                navigator.clipboard.writeText(shareText).then(() => alert('클립보드에 복사되었습니다!'));
            });
    } else {
        navigator.clipboard.writeText(shareText).then(() => alert('클립보드에 복사되었습니다!'));
    }
}

window.updateUI = () => {
    getTranslatedContent();
    translatePage();
    if(testArea.style.display === 'block') {
        if(questionSection.style.display === 'block') {
            displayQuestion();
        } else if (resultSection.style.display === 'block') {
            const resultCode = resultCodeEl.textContent.replace(/[()]/g, "");
            displayResult(resultCode);
        }
    }
}

// Event Listeners
startTestBtn.addEventListener('click', startTest);
shareResultBtn.addEventListener('click', shareResult);
restartTestBtn.addEventListener('click', startTest);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    getTranslatedContent();
    headerSection.style.display = 'block';
    testArea.style.display = 'none';
    translatePage();
});