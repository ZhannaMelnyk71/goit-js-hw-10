import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/name/deutschland').then(response => response.json()).then(console.log());