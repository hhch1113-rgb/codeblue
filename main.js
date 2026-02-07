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
        firebaseConfigError: "Error: Firebase is not configured correctly. Please check your credentials.",
        notAnImage: "Please upload an image file.",
        selectedFile: "Selected: ",
        uploadStarting: "Starting upload...",
        uploading: "Uploading: ",
        uploadFailed: "Upload failed: ",
        uploadPaused: "Upload is paused",
        uploadComplete: "Upload complete!",
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
        firebaseConfigError: "오류: Firebase가 올바르게 설정되지 않았습니다. 인증 정보를 확인하세요.",
        notAnImage: "이미지 파일을 업로드해주세요.",
        selectedFile: "선택됨: ",
        uploadStarting: "업로드를 시작합니다...",
        uploading: "업로드 중: ",
        uploadFailed: "업로드 실패: ",
        uploadPaused: "업로드가 중지됨",
        uploadComplete: "업로드 완료!",
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
        firebaseConfigError: "エラー：Firebaseが正しく構成されていません。資格情報を確認してください。",
        notAnImage: "画像ファイルをアップロードしてください。",
        selectedFile: "選択済み: ",
        uploadStarting: "アップロードを開始します...",
        uploading: "アップロード中: ",
        uploadFailed: "アップロードに失敗しました: ",
        uploadPaused: "アップロードが一時停止しました",
        uploadComplete: "アップロード完了！",
        copySuccess: "URLがクリップボードにコピーされました！",
        copyFail: "URLのコピーに失敗しました。手動でコピーしてください。",
    }
};
let currentLang = 'en';

// --- Main Functions ---

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
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
    fileInput.value = ''; // Resets the file input so the same file can be selected again
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
    uploadFileWithFirebase(file);
}

function uploadFileWithFirebase(file) {
    if (typeof firebase === 'undefined' || !firebase.storage) {
        uploadStatus.textContent = translations[currentLang].firebaseConfigError;
        return;
    }

    const storageRef = firebase.storage().ref();
    const fileName = `${new Date().getTime()}-${file.name}`;
    const fileRef = storageRef.child(`images/${fileName}`);
    const uploadTask = fileRef.put(file);

    uploadStatus.textContent = translations[currentLang].uploadStarting;
    progressContainer.style.display = 'block';

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            
            switch (snapshot.state) {
                case 'paused':
                    uploadStatus.textContent = translations[currentLang].uploadPaused;
                    break;
                default:
                    uploadStatus.textContent = `${translations[currentLang].uploading}${Math.floor(progress)}%`;
                    break;
            }
        },
        (error) => {
            console.error("Firebase upload failed:", error);
            uploadStatus.textContent = `${translations[currentLang].uploadFailed}${error.code}`;
            progressContainer.style.display = 'none';
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                uploadStatus.textContent = translations[currentLang].uploadComplete;
                resultUrl.value = downloadURL;
                resultSection.style.display = 'block';
                progressContainer.style.display = 'none';
            });
        }
    );
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
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
});

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
document.addEventListener('DOMContentLoaded', () => {
    const initialLang = navigator.language.split('-')[0];
    const langToSet = translations[initialLang] ? initialLang : 'en';
    setLanguage(langToSet);

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === langToSet);
    });

    resetUI();
});