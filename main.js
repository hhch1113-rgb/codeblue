// --- DOM Elements ---
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileLabel = document.querySelector('.file-label');
const fileNameDisplay = document.getElementById('file-name');
const uploadStatus = document.getElementById('upload-status');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const resultSection = document.getElementById('result');
const resultUrl = document.getElementById('result-url');
const copyButton = document.getElementById('copy-button');
const langButtons = document.querySelectorAll('.lang-btn');
// Debug elements
const debugInfo = document.getElementById('debug-info');
const debugStatusCode = document.getElementById('debug-status-code');
const debugResponseText = document.getElementById('debug-response-text');
const debugExplanation = document.getElementById('debug-explanation');


// --- Translations ---
const translations = {
    en: {
        // ... (other translations)
        notAnImage: "Please upload an image file.",
        selectedFile: "Selected: ",
        uploadStarting: "Starting upload...",
        uploading: "Uploading: ",
        uploadFailed: "Upload failed. ",
        uploadComplete: "Upload complete!",
        copySuccess: "URL copied to clipboard!",
        copyFail: "Failed to copy URL. Please copy it manually.",
        // Debug Translations
        debugTitle: "Server Response Information",
        debugStatus: "Status:",
        debugResponse: "Response:",
        debugExplanationCORS: "This status (0) usually indicates a network error, most commonly a CORS (Cross-Origin Resource Sharing) issue. The server at the destination URL must be configured to accept requests from this website's domain.",
        debugExplanation404: "The server could not find the requested URL. Please verify the upload endpoint.",
        debugExplanation500: "The server encountered an internal error. Please check the server-side logs.",
        debugExplanationSuccess: "The server responded, but the client-side code could not find a 'url' field in the JSON response. Check the server's output format.",
        debugExplanationOther: "An HTTP error occurred. Check the status and response for more details."
    },
    ko: {
        // ... (other translations)
        notAnImage: "이미지 파일을 업로드해주세요.",
        selectedFile: "선택됨: ",
        uploadStarting: "업로드를 시작합니다...",
        uploading: "업로드 중: ",
        uploadFailed: "업로드 실패. ",
        uploadComplete: "업로드 완료!",
        copySuccess: "주소가 클립보드에 복사되었습니다!",
        copyFail: "주소 복사에 실패했습니다. 직접 복사해주세요.",
        // Debug Translations
        debugTitle: "서버 응답 정보",
        debugStatus: "상태:",
        debugResponse: "응답:",
        debugExplanationCORS: "상태 코드 (0)은 일반적으로 네트워크 오류, 특히 CORS(Cross-Origin Resource Sharing) 문제를 의미합니다. 대상 서버가 현재 웹사이트 도메인からの 요청을 허용하도록 설정되어야 합니다.",
        debugExplanation404: "서버가 요청된 URL을 찾을 수 없습니다. 업로드 주소를 확인해주세요.",
        debugExplanation500: "서버 내부 오류가 발생했습니다. 서버 측 로그를 확인해주세요.",
        debugExplanationSuccess: "서버가 응답했지만, 웹페이지 코드에서 JSON 응답 내 'url' 필드를 찾을 수 없습니다. 서버의 출력 형식을 확인해주세요.",
        debugExplanationOther: "HTTP 오류가 발생했습니다. 자세한 내용은 상태 및 응답을 확인하세요."
    },
    ja: {
        // ... (other translations)
    }
};
// For brevity, only en and ko are fully filled out. The rest are inherited from the previous version.
Object.assign(translations.ja, translations.en); // Simple fallback

let currentLang = 'en';

// --- Functions ---

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.title = translations[lang].pageTitle;
}

function resetUI() {
    fileNameDisplay.textContent = '';
    uploadStatus.textContent = '';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    resultSection.style.display = 'none';
    resultUrl.value = '';
    fileInput.value = '';
    debugInfo.style.display = 'none';
    debugStatusCode.textContent = '';
    debugResponseText.textContent = '';
    debugExplanation.textContent = '';
}

function showDebugInfo(status, response, explanationKey) {
    debugStatusCode.textContent = status;
    debugResponseText.textContent = response || '(No response body)';
    debugExplanation.textContent = translations[currentLang][explanationKey] || '';
    debugInfo.style.display = 'block';
}

function handleFiles(files) {
    if (files.length === 0) return;
    resetUI();
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        uploadStatus.textContent = translations[currentLang].notAnImage;
        return;
    }
    fileNameDisplay.textContent = `${translations[currentLang].selectedFile}${file.name}`;
    uploadFile(file);
}

function uploadFile(file) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const uploadUrl = "http://144.24.86.35/app/uploads/ETC/image";

    formData.append("file", file);

    xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `${translations[currentLang].uploading}${Math.floor(progress)}%`;
        }
    });

    xhr.addEventListener("load", () => {
        progressContainer.style.display = 'none';
        const status = xhr.status;
        const responseText = xhr.responseText;

        if (status >= 200 && status < 300) {
            try {
                const response = JSON.parse(responseText);
                if (response.url) {
                    uploadStatus.textContent = translations[currentLang].uploadComplete;
                    resultUrl.value = response.url;
                    resultSection.style.display = 'block';
                } else {
                    uploadStatus.textContent = translations[currentLang].uploadFailed;
                    showDebugInfo(status, responseText, 'debugExplanationSuccess');
                }
            } catch (e) {
                uploadStatus.textContent = translations[currentLang].uploadFailed;
                showDebugInfo(status, responseText, 'debugExplanationSuccess');
            }
        } else {
            uploadStatus.textContent = translations[currentLang].uploadFailed;
            let explanationKey = 'debugExplanationOther';
            if (status === 404) explanationKey = 'debugExplanation404';
            if (status >= 500) explanationKey = 'debugExplanation500';
            showDebugInfo(status, responseText, explanationKey);
        }
    });

    xhr.addEventListener("error", () => {
        progressContainer.style.display = 'none';
        uploadStatus.textContent = translations[currentLang].uploadFailed;
        showDebugInfo(xhr.status, xhr.responseText, 'debugExplanationCORS');
    });

    xhr.open("POST", uploadUrl, true);
    uploadStatus.textContent = translations[currentLang].uploadStarting;
    progressContainer.style.display = 'block';
    xhr.send(formData);
}

// --- Event Listeners (omitted for brevity, they are the same as before) ---
langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

dropArea.addEventListener('click', () => resetUI());
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});
['dragenter', 'dragover'].forEach(e => dropArea.addEventListener(e, () => dropArea.classList.add('dragover')));
['dragleave', 'drop'].forEach(e => dropArea.addEventListener(e, () => dropArea.classList.remove('dragover')));
dropArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
copyButton.addEventListener('click', () => {
    resultUrl.select();
    resultUrl.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        alert(translations[currentLang].copySuccess);
    } catch (err) {
        alert(translations[currentLang].copyFail);
    }
});

// --- Initial Setup ---
setLanguage('en');
resetUI();
