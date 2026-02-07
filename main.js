const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileNameDisplay = document.getElementById('file-name');
const uploadStatus = document.getElementById('upload-status');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const resultSection = document.getElementById('result');
const resultUrl = document.getElementById('result-url');
const copyButton = document.getElementById('copy-button');

// Reset UI state
function resetUI() {
    fileNameDisplay.textContent = '';
    uploadStatus.textContent = '';
    uploadStatus.style.color = '';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    resultSection.style.display = 'none';
    resultUrl.value = '';
    fileInput.value = ''; // Clear selected file
}

resetUI(); // Initialize UI state on load

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Handle file selection from input
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    resetUI(); // Reset UI on new file selection
    if (files.length === 0) {
        uploadStatus.textContent = 'No file selected.';
        uploadStatus.style.color = 'orange';
        return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        uploadStatus.textContent = 'Please upload an image file.';
        uploadStatus.style.color = 'red';
        return;
    }
    fileNameDisplay.textContent = `Selected: ${file.name}`;
    uploadFile(file);
}

function uploadFile(file) {
    if (!firebase || !firebase.storage) {
        uploadStatus.textContent = "Error: Firebase Storage is not initialized. Check console for details.";
        uploadStatus.style.color = 'red';
        console.error("Firebase Storage object is not available. Ensure firebase-app.js and firebase-storage.js are loaded and firebase.initializeApp() is called with correct config.");
        return;
    }
    
    uploadStatus.textContent = 'Starting upload...';
    uploadStatus.style.color = 'blue';
    
    const storageRef = firebase.storage().ref();
    const fileName = `${new Date().getTime()}-${file.name}`;
    const fileRef = storageRef.child(`images/${fileName}`);

    const uploadTask = fileRef.put(file);

    progressContainer.style.display = 'block';

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `Uploading: ${Math.floor(progress)}%`;
            uploadStatus.style.color = 'blue';
        },
        (error) => {
            console.error("Upload failed:", error);
            uploadStatus.textContent = `Upload failed: ${error.message}`;
            uploadStatus.style.color = 'red';
            progressContainer.style.display = 'none';
            alert("Upload failed. Please check console for details and ensure Firebase Storage rules are configured correctly.");
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                resultUrl.value = downloadURL;
                resultSection.style.display = 'block';
                progressContainer.style.display = 'none';
                uploadStatus.textContent = 'Upload complete!';
                uploadStatus.style.color = 'green';
            });
        }
    );
}

copyButton.addEventListener('click', () => {
    resultUrl.select();
    resultUrl.setSelectionRange(0, 99999); /* For mobile devices */
    try {
        document.execCommand('copy');
        alert('URL copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy URL. Please copy it manually.');
    }
});