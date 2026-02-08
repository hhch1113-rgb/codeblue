const supportedLangs = ['ko', 'en', 'ja'];
let currentLang = 'ko';

function getLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang && supportedLangs.includes(lang)) {
        return lang;
    }
    const browserLang = navigator.language.split('-')[0];
    if (supportedLangs.includes(browserLang)) {
        return browserLang;
    }
    return 'ko';
}

function setLanguage(lang) {
    if (supportedLangs.includes(lang)) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        translatePage();
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
    }
}

function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (locales[currentLang] && locales[currentLang][key]) {
            element.innerHTML = locales[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-content]').forEach(element => {
        const key = element.getAttribute('data-i18n-content');
        if (locales[currentLang] && locales[currentLang][key]) {
            element.setAttribute('content', locales[currentLang][key]);
        }
    });
    
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (locales[currentLang] && locales[currentLang][key]) {
            element.setAttribute('alt', locales[currentLang][key]);
        }
    });

    document.documentElement.lang = currentLang;
}

document.addEventListener('DOMContentLoaded', () => {
    currentLang = getLanguage();
    translatePage();
});
