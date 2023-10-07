const image = document.querySelector('#image');
const preview = document.querySelector('#preview');
image.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            preview.setAttribute('src', this.result);
        });
        reader.readAsDataURL(file);
    } else {
        preview.setAttribute('src', '');
    }
});