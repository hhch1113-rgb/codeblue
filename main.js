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

// --- UI Reset Function ---
function resetUI() {
    console.log("UI 초기화: 모든 상태 메시지와 진행률을 초기 상태로 되돌립니다.");
    uploadStatus.textContent = '';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    resultSection.style.display = 'none';
    resultUrl.value = '';
    // fileInput.value = ''; 
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
    uploadFileToFirebase(file);
}

// --- Firebase Upload Function ---
function uploadFileToFirebase(file) {
    console.log("uploadFileToFirebase 함수 호출됨: Firebase 업로드 시작.");

    if (typeof firebase === 'undefined' || !firebase.storage) {
        console.error("CRITICAL: Firebase SDK 또는 Firebase Storage가 초기화되지 않았습니다. index.html의 firebaseConfig를 확인하세요.");
        uploadStatus.textContent = "Firebase 설정 오류! 페이지를 새로고침하고 개발자 콘솔을 확인해주세요.";
        return;
    }

    const storageRef = firebase.storage().ref();
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = storageRef.child(`images/${fileName}`);
    console.log(`Firebase Storage 참조 생성: images/${fileName}`);

    const uploadTask = fileRef.put(file);
    console.log("Firebase 업로드 태스크 생성 및 시작.");

    progressContainer.style.display = 'block';

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            console.log(`업로드 진행률: ${progress.toFixed(2)}%`);
        },
        (error) => {
            console.error("Firebase 업로드 실패! 전체 오류 객체:", error);
            
            let errorMessage = `업로드 실패: ${error.code}`;
            if (error.code === 'storage/unauthorized') {
                errorMessage = "업로드 실패: 권한 문제. Firebase Storage의 보안 규칙을 확인하세요.";
                console.error("도움말: Firebase 콘솔 -> Storage -> 규칙 탭에서 'allow read, write: if true;' 또는 유사한 공개 규칙으로 설정했는지 확인하세요.");
            }
            
            uploadStatus.textContent = errorMessage;
            progressContainer.style.display = 'none';
        },
        () => {
            console.log("업로드 성공! 다운로드 URL을 가져옵니다.");
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(`다운로드 URL: ${downloadURL}`);
                uploadStatus.textContent = "업로드 완료!";
                resultUrl.value = downloadURL;
                resultSection.style.display = 'block';
                progressContainer.style.display = 'none';
            });
        }
    );
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
