// ==========================================
// A. 雙模式智能切換系統
// ==========================================
function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');

    if (currentTheme === 'prada') {
        document.documentElement.removeAttribute('data-theme');
        if (title) title.innerText = "No Sana, No Life.";
        if (subtitle) subtitle.innerText = "因為妳的笑容，世界才有了春天。";
    } else {
        document.documentElement.setAttribute('data-theme', 'prada');
        if (title) title.innerText = "The Muse of Milan.";
        if (subtitle) subtitle.innerText = "從起點到璀璨，湊崎紗夏的時光史詩。";
    }
}

// ==========================================
// B. VISUAL ARCHIVE 動態相片過濾系統
// ==========================================
function filterPhotos(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = 'fadeInGallery 0.6s ease forwards';

        if (category === 'all') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// ==========================================
// C. DEAR SANA 動態情書發布系統
// ==========================================
function submitLetter() {
    const nameInput = document.getElementById('signer-name');
    const contentInput = document.getElementById('letter-content');
    const wall = document.getElementById('letters-wall');

    if (nameInput.value.trim() === "" || contentInput.value.trim() === "") {
        alert("請填寫妳的名字與想對 Sana 說的話唷！");
        return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateString = `${yyyy}.${mm}.${dd}`;

    // 創造新卡片
    const newLetter = document.createElement('div');

    // 🔑 關鍵修正 1：剛出生時不給它動畫類別，先讓它維持預設或隱形狀態
    newLetter.style.opacity = '0';

    newLetter.innerHTML = `
        <p class="posted-text">「${contentInput.value}」</p>
        <div class="posted-meta">
            <span class="posted-author">— ${nameInput.value}</span>
            <span class="posted-date">${dateString}</span>
        </div>
    `;

    // 塞入牆的最前方
    wall.insertBefore(newLetter, wall.firstChild);

    // 🔑 關鍵修正 2：延遲 10 毫秒，在下一個渲染畫格強制注入 Class 引爆 CSS 動畫！
    setTimeout(() => {
        newLetter.style.opacity = ''; // 移除手動設置的隱形
        newLetter.className = 'posted-letter-card'; // 正式加載動畫
    }, 10);

    // 清空輸入框
    nameInput.value = "";
    contentInput.value = "";
}
// 🔑 關鍵修正 3：刪除了原本多出來的那個大括號