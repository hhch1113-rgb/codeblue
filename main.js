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
        noFileSelected: "No file selected.",
        notAnImage: "Please upload an image file.",
        selectedFile: "Selected: ",
        uploadStarting: "Starting upload...",
        uploading: "Uploading: ",
        uploadFailed: "Upload failed: ",
        uploadComplete: "Upload complete!",
        firebaseError: "Error: Firebase Storage is not initialized. Check console for details.",
        copySuccess: "URL copied to clipboard!",
        copyFail: "Failed to copy URL. Please copy it manually.",
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
        noFileSelected: "선택된 파일이 없습니다.",
        notAnImage: "이미지 파일을 업로드해주세요.",
        selectedFile: "선택됨: ",
        uploadStarting: "업로드를 시작합니다...",
        uploading: "업로드 중: ",
        uploadFailed: "업로드 실패: ",
        uploadComplete: "업로드 완료!",
        firebaseError: "오류: Firebase Storage가 초기화되지 않았습니다. 콘솔을 확인하세요.",
        copySuccess: "주소가 클립보드에 복사되었습니다!",
        copyFail: "주소 복사에 실패했습니다. 직접 복사해주세요.",
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
        noFileSelected: "ファイルが選択されていません。",
        notAnImage: "画像ファイルをアップロードしてください。",
        selectedFile: "選択済み: ",
        uploadStarting: "アップロードを開始します...",
        uploading: "アップロード中: ",
        uploadFailed: "アップロードに失敗しました: ",
        uploadComplete: "アップロード完了！",
        firebaseError: "エラー：Firebase Storageが初期化されていません。コンソールを確認してください。",
        copySuccess: "URLがクリップボードにコピーされました！",
        copyFail: "URLのコピーに失敗しました。手動でコピーしてください。",
    }
};
let currentLang = 'en';

// --- Functions ---

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    // Special case for the title tag
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
    // We don't resetUI here anymore. The bug was that this cleared the file input before it could be processed.
    if (files.length === 0) {
        // This case might not be reachable with the new flow, but it's good for safety.
        uploadStatus.textContent = translations[currentLang].noFileSelected;
        return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        uploadStatus.textContent = translations[currentLang].notAnImage;
        return;
    }
    fileNameDisplay.textContent = `${translations[currentLang].selectedFile}${file.name}`;
    uploadFile(file);
}

function uploadFile(file) {
    if (!window.firebase || !firebase.storage) {
        uploadStatus.textContent = translations[currentLang].firebaseError;
        console.error("Firebase Storage object is not available.");
        return;
    }
    
    uploadStatus.textContent = translations[currentLang].uploadStarting;
    
    const storageRef = firebase.storage().ref();
    const fileName = `${new Date().getTime()}-${file.name}`;
    const fileRef = storageRef.child(`images/${fileName}`);
    const uploadTask = fileRef.put(file);

    progressContainer.style.display = 'block';

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `${translations[currentLang].uploading}${Math.floor(progress)}%`;
        },
        (error) => {
            console.error("Upload failed:", error);
            uploadStatus.textContent = `${translations[currentLang].uploadFailed}${error.code}`;
            progressContainer.style.display = 'none';
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                resultUrl.value = downloadURL;
                resultSection.style.display = 'block';
                progressContainer.style.display = 'none';
                uploadStatus.textContent = translations[currentLang].uploadComplete;
            });
        }
    );
}

// --- Event Listeners ---

// Language Switcher
langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// UI Reset Trigger
dropArea.addEventListener('click', (e) => {
    // Only reset if the click is not on the label itself, to avoid double-triggering
    if (e.target !== fileLabel) {
       resetUI();
    }
});

// Drag and Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
});
dropArea.addEventListener('drop', (e) => {
    resetUI();
    handleFiles(e.dataTransfer.files);
}, false);

// File Input
fileInput.addEventListener('change', (e) => {
    // The reset is handled by the click on the drop area/label
    handleFiles(e.target.files);
});

// Copy Button
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
setLanguage('en'); // Set default language on load
resetUI(); // Set a clean initial state
