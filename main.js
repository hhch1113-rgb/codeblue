const translations = {
    en: {
        title: "ToolHub",
        subtitle: "A collection of useful online tools.",
        toolTitle: "Tool",
        toolDescription: "A useful tool.",
        toolLink: "Go to tool",
    },
    ko: {
        title: "도구 허브",
        subtitle: "유용한 온라인 도구 모음입니다.",
        toolTitle: "도구",
        toolDescription: "유용한 도구입니다.",
        toolLink: "도구로 이동",
    },
    ja: {
        title: "ツールハブ",
        subtitle: "便利なオンラインツールのコレクションです。",
        toolTitle: "ツール",
        toolDescription: "便利なツールです。",
        toolLink: "ツールに移動",
    },
};

const toolList = document.getElementById("tool-list");

function generateToolList(lang) {
    toolList.innerHTML = "";
    for (let i = 1; i <= 18; i++) {
        const toolCard = document.createElement("div");
        toolCard.classList.add("tool-card");

        const toolTitle = document.createElement("h2");
        toolTitle.textContent = `${translations[lang].toolTitle} ${i}`;

        const toolDescription = document.createElement("p");
        toolDescription.textContent = translations[lang].toolDescription;

        const toolLink = document.createElement("a");
        toolLink.href = `tool-${i}.html`;
        toolLink.textContent = translations[lang].toolLink;

        toolCard.appendChild(toolTitle);
        toolCard.appendChild(toolDescription);
        toolCard.appendChild(toolLink);
        toolList.appendChild(toolCard);
    }
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translations[lang][key];
    });
    generateToolList(lang);
}

const langButtons = document.querySelectorAll(".lang-btn");
langButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = button.getAttribute("data-lang");
        setLanguage(lang);

        langButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Set initial language
setLanguage("en");
