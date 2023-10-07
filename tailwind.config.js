/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./views/**/*.{ejs,html,js,css}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                primary: {
                    100: '#92A65F',
                    200: '#446129',
                    300: '#183114',
                },
                secondary: {
                    100: '#DCDE9F',
                    200: '#F3F4D3',
                    300: '#FCEE21',
                },
            },
        },
    },
    plugins: [],
}
