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

// --- Translations ---
const translations = {
    en: {
        pageTitle: "Easy Image Uploader",
        title: "Welcome to Easy Image Uploader",
        description: "Drag and drop your images below or click to select a file for quick and easy sharing.",
        dropText: "Drag & Drop your image here or",
        chooseFile: "Choose a file",
        resultTitle: "Your image URL:",
        copyButton: "Copy URL",
        privacy: "Privacy",
        terms: "Terms",
        faq: "FAQ",
        contact: "Contact/Report",
        // Status Messages
        notAnImage: "Please upload an image file.",
        selectedFile: "Selected: ",
        uploadStarting: "Starting upload...",
        uploading: "Uploading: ",
        uploadFailed: "Upload failed. ",
        uploadComplete: "Upload complete!",
        copySuccess: "URL copied to clipboard!",
        copyFail: "Failed to copy URL. Please copy it manually.",
        corsError: "A network error occurred. This could be due to a server configuration (CORS) issue. Please check the browser console for more details.",
        serverError: "Server returned an error. Please try again later."
    },
    ko: {
        pageTitle: "간편 이미지 업로더",
        title: "간편 이미지 업로더에 오신 것을 환영합니다",
        description: "이미지를 아래에 드래그 앤 드롭하거나 파일을 선택하여 빠르고 쉽게 공유하세요.",
        dropText: "여기에 이미지를 드래그 앤 드롭하거나",
        chooseFile: "파일 선택",
        resultTitle: "이미지 주소:",
        copyButton: "주소 복사",
        privacy: "개인정보처리방침",
        terms: "이용약관",
        faq: "자주 묻는 질문",
        contact: "문의/신고",
        // Status Messages
        notAnImage: "이미지 파일을 업로드해주세요.",
        selectedFile: "선택됨: ",
        uploadStarting: "업로드를 시작합니다...",
        uploading: "업로드 중: ",
        uploadFailed: "업로드 실패. ",
        uploadComplete: "업로드 완료!",
        copySuccess: "주소가 클립보드에 복사되었습니다!",
        copyFail: "주소 복사에 실패했습니다. 직접 복사해주세요.",
        corsError: "네트워크 오류가 발생했습니다. 서버 설정(CORS) 문제일 수 있습니다. 자세한 내용은 브라우저 콘솔을 확인해주세요.",
        serverError: "서버에서 오류가 발생했습니다. 나중에 다시 시도해주세요."
    },
    ja: {
        pageTitle: "簡単画像アップローダー",
        title: "簡単画像アップローダーへようこそ",
        description: "画像を下にドラッグ＆ドロップするか、ファイルを選択して、すばやく簡単に共有します。",
        dropText: "ここに画像をドラッグ＆ドロップするか",
        chooseFile: "ファイルを選択",
        resultTitle: "画像URL:",
        copyButton: "URLをコピー",
        privacy: "プライバシー",
        terms: "規約",
        faq: "よくある質問",
        contact: "お問い合わせ/報告",
        // Status Messages
        notAnImage: "画像ファイルをアップロードしてください。",
        selectedFile: "選択済み: ",
        uploadStarting: "アップロードを開始します...",
        uploading: "アップロード中: ",
        uploadFailed: "アップロードに失敗しました. ",
        uploadComplete: "アップロード完了！",
        copySuccess: "URLがクリップボードにコピーされました！",
        copyFail: "URLのコピーに失敗しました。手動でコピーしてください。",
        corsError: "ネットワークエラーが発生しました。サーバー構成（CORS）の問題である可能性があります。詳細については、ブラウザコンソールを確認してください。",
        serverError: "サーバーからエラーが返されました。後でもう一度お試しください。"
    }
};
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

    formData.append("file", file); // Assuming the server expects a field named "file"

    // Progress
    xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `${translations[currentLang].uploading}${Math.floor(progress)}%`;
        }
    });

    // Success
    xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            uploadStatus.textContent = translations[currentLang].uploadComplete;
            try {
                // Assuming server returns JSON: {"url": "http://..."}
                const response = JSON.parse(xhr.responseText);
                if (response.url) {
                    resultUrl.value = response.url;
                    resultSection.style.display = 'block';
                } else {
                     // If JSON is returned but no 'url' key, show server response for debugging
                    uploadStatus.textContent = translations[currentLang].uploadFailed + "Invalid server response.";
                    console.error("Server response:", xhr.responseText);
                }
            } catch (e) {
                uploadStatus.textContent = translations[currentLang].uploadFailed + "Could not parse server response.";
                console.error("Could not parse server response:", xhr.responseText, e);
            }
        } else {
             // Handle HTTP errors
            uploadStatus.textContent = translations[currentLang].serverError + ` (Code: ${xhr.status})`;
        }
        progressContainer.style.display = 'none';
    });

    // Error
    xhr.addEventListener("error", () => {
        uploadStatus.textContent = translations[currentLang].corsError;
        progressContainer.style.display = 'none';
    });

    xhr.open("POST", uploadUrl, true);
    uploadStatus.textContent = translations[currentLang].uploadStarting;
    progressContainer.style.display = 'block';
    xhr.send(formData);
}

// --- Event Listeners ---

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