// --- DOM Elements ---
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const uploadStatus = document.getElementById('upload-status');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const resultSection = document.getElementById('result');
const resultUrl = document.getElementById('result-url');
const copyButton = document.getElementById('copy-button');

console.log("main.js 로드됨: 스크립트가 시작되었습니다.");

// 🚨 중요: Imgur Client ID를 여기에 입력하세요.
// Imgur API를 사용하려면 https://api.imgur.com/oauth2/addclient 에서 Client ID를 발급받아야 합니다.
const IMGur_CLIENT_ID = "YOUR_IMGUR_CLIENT_ID";

// --- UI Reset Function ---
function resetUI() {
    console.log("UI 초기화: 모든 상태 메시지와 진행률을 초기 상태로 되돌립니다.");
    uploadStatus.textContent = '';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    resultSection.style.display = 'none';
    resultUrl.value = '';
    // fileInput.value = ''; // 파일 선택 즉시 input이 초기화되는 것을 방지
}

// --- Main File Handling Logic ---
function handleFiles(files) {
    console.log("handleFiles 함수 호출됨: 파일 처리 시작.");
    resetUI();

    if (!files || files.length === 0) {
        console.warn("경고: 파일이 선택되지 않았습니다.");
        uploadStatus.textContent = '파일이 선택되지 않았습니다.';
        return;
    }
    const file = files[0];
    console.log(`파일 객체 확인: ${file.name}, 타입: ${file.type}, 크기: ${file.size} 바이트`);

    if (!file.type.startsWith('image/')) {
        console.error("오류: 이미지 파일이 아닙니다.");
        uploadStatus.textContent = '이미지 파일만 업로드할 수 있습니다.';
        return;
    }

    uploadStatus.textContent = `'${file.name}' 파일 업로드 준비 중...`;
    uploadFileToImgur(file);
}

// --- Imgur Upload Function ---
function uploadFileToImgur(file) {
    console.log("uploadFileToImgur 함수 호출됨: Imgur 업로드 시작.");

    if (IMGur_CLIENT_ID === "YOUR_IMGUR_CLIENT_ID" || !IMGur_CLIENT_ID) {
        console.error("CRITICAL: Imgur Client ID가 설정되지 않았습니다. main.js에서 IMGur_CLIENT_ID를 확인하세요.");
        uploadStatus.textContent = "Imgur Client ID 설정 오류! main.js 파일을 확인하세요.";
        return;
    }

    const apiUrl = "https://api.imgur.com/3/image";
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("image", file); // Imgur API expects the file field name to be 'image'

    xhr.open("POST", apiUrl);
    xhr.setRequestHeader("Authorization", `Client-ID ${IMGur_CLIENT_ID}`);

    xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `업로드 중: ${progress.toFixed(2)}%`;
            console.log(`업로드 진행률: ${progress.toFixed(2)}%`);
        }
    });

    xhr.addEventListener("load", () => {
        console.log("Imgur 응답 수신:", xhr.responseText);
        progressContainer.style.display = 'none';

        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.success && response.data && response.data.link) {
                    const imageUrl = response.data.link;
                    console.log(`업로드 성공! 이미지 URL: ${imageUrl}`);
                    uploadStatus.textContent = "업로드 완료!";
                    resultUrl.value = imageUrl;
                    resultSection.style.display = 'block';
                } else {
                    console.error("Imgur 응답에서 이미지 링크를 찾을 수 없습니다:", response);
                    uploadStatus.textContent = "업로드 실패: Imgur 응답 오류. 콘솔을 확인하세요.";
                }
            } catch (e) {
                console.error("Imgur 응답 JSON 파싱 실패:", e);
                uploadStatus.textContent = "업로드 실패: Imgur 응답 파싱 오류. 콘솔을 확인하세요.";
            }
        } else {
            console.error(`Imgur API 오류: ${xhr.status} - ${xhr.statusText}`);
            console.error("Imgur API 상세 오류 응답:", xhr.responseText);
            uploadStatus.textContent = `업로드 실패: ${xhr.status} - ${xhr.statusText}. 콘솔을 확인하세요.`;
        }
    });

    xhr.addEventListener("error", () => {
        console.error("Imgur API 통신 오류 발생 (네트워크/CORS 문제일 수 있음).");
        uploadStatus.textContent = "업로드 실패: 네트워크 오류. 개발자 콘솔을 확인하세요.";
        progressContainer.style.display = 'none';
    });

    uploadStatus.textContent = "Imgur로 업로드 시작...";
    progressContainer.style.display = 'block';
    xhr.send(formData);
}

// --- Event Listeners ---

// 파일 선택을 위해 드롭 영역 클릭
dropArea.addEventListener('click', () => {
    fileInput.click();
});

// 파일 입력(input) 변경 시
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// 드래그 앤 드롭 이벤트
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.borderColor = '#1877f2';
});
dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.borderColor = '#ccd0d5';
});
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.borderColor = '#ccd0d5';
    handleFiles(e.dataTransfer.files);
});

// 복사 버튼 클릭
copyButton.addEventListener('click', () => {
    resultUrl.select();
    try {
        document.execCommand('copy');
        alert('주소가 클립보드에 복사되었습니다!');
    } catch (err) {
        alert('복사에 실패했습니다.');
    }
});

// --- Initial Setup ---
resetUI(); // 페이지 로드 시 UI 초기화
console.log("이벤트 리스너 설정 완료. 사용자 입력을 기다립니다.");