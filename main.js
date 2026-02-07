const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const progressBar = document.getElementById('progress-bar');
const resultSection = document.getElementById('result');
const resultUrl = document.getElementById('result-url');
const copyButton = document.getElementById('copy-button');

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
    if (files.length === 0) {
        return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    uploadFile(file);
}

function uploadFile(file) {
    if (!firebase.storage) {
        alert("Firebase Storage is not configured. Please check your firebaseConfig.");
        return;
    }
    
    // Create a storage reference
    const storageRef = firebase.storage().ref();
    
    // Create a unique filename
    const fileName = `${new Date().getTime()}-${file.name}`;
    const fileRef = storageRef.child(`images/${fileName}`);

    // Create the upload task
    const uploadTask = fileRef.put(file);

    // Show progress bar
    progressBar.style.display = 'block';

    // Register observers for 'state_changed' event
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
        },
        (error) => {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
            progressBar.style.display = 'none';
        },
        () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                resultUrl.value = downloadURL;
                resultSection.style.display = 'block';
                progressBar.style.display = 'none';
            });
        }
    );
}

copyButton.addEventListener('click', () => {
    resultUrl.select();
    document.execCommand('copy');
    alert('URL copied to clipboard!');
});
