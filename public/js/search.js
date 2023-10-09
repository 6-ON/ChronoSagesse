const searchInput = document.querySelector('#search-input');
const searchLink = document.querySelector('#search-link');

searchInput.addEventListener('input', () => {
    const value = searchInput.value;
    const url = new URL(window.location.href);
    url.searchParams.set('title', value);
    searchLink.href = url;
});
searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        searchLink.click();
    }
});
