const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('imgUpload');
const imageView = document.getElementById('img_view'); // Fixed id

inputFile.addEventListener('change', uploadImage);

function uploadImage() {
    const file = inputFile.files[0];
    if (file) {
        const imgLink = URL.createObjectURL(file);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.innerHTML = ''; // Clear any previous content
        console.log('image uploaded', file);
    }

}
