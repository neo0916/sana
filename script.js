// ==========================================
// 🔑 雲端核心設定：請把妳剛才複製的組態完全填在這邊
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyD80RDn2bcBaELHmBMuNn3n5hLtKhzuKT4", // 👈 請確認這裡有換成妳剛才複製的真正金鑰
    authDomain: "sava-forever.firebaseapp.com",
    databaseURL: "https://sava-forever-default-rtdb.asia-southeast1.firebasedatabase.app/", // 👈 確保這行是妳的新加坡資料庫網址
    projectId: "sava-forever",
    storageBucket: "sava-forever.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};

// 初始化 Firebase 與資料庫
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const lettersRef = database.ref('letters'); // 在雲端建立一個叫 'letters' 的留言抽屜

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
// C. DEAR SANA 全端實時情書系統 (心臟核心)
// ==========================================

// 🚀 核心功能 1：自動讀取舊記錄 + 持續監聽追加！
// 只要雲端有新資料，這個監聽器會「即時」捕捉，並自動渲染到網頁上，刷新也絕對不會忘記！
lettersRef.on('child_added', (snapshot) => {
    const letterData = snapshot.val();
    const wall = document.getElementById('letters-wall');

    if (!wall) return;

    // 創造新卡片
    const newLetter = document.createElement('div');
    newLetter.style.opacity = '0'; // 初始隱形，準備動畫

    newLetter.innerHTML = `
        <p class="posted-text">「${letterData.content}」</p>
        <div class="posted-meta">
            <span class="posted-author">— ${letterData.author}</span>
            <span class="posted-date">${letterData.date}</span>
        </div>
    `;

    // 永遠將最新送出的情書插到留言牆的最上方
    wall.insertBefore(newLetter, wall.firstChild);

    // 絲滑向上滑入動畫觸發
    setTimeout(() => {
        newLetter.style.opacity = '';
        newLetter.className = 'posted-letter-card';
    }, 10);
});

// 🚀 核心功能 2：將新留言推送到雲端資料庫永久保存
function submitLetter() {
    const nameInput = document.getElementById('signer-name');
    const contentInput = document.getElementById('letter-content');

    if (nameInput.value.trim() === "" || contentInput.value.trim() === "") {
        alert("請填寫妳的名字與想對 Sana 說的話唷！");
        return;
    }

    // 精準綁定當前日期與類別欄位
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateString = `${yyyy}.${mm}.${dd}`;

    // 打包成神級數據物件
    const newLetterData = {
        author: nameInput.value.trim(),
        content: contentInput.value.trim(),
        date: dateString,
        category: "ONCE_Letter", // 精準綁定資料類別欄位
        timestamp: firebase.database.ServerValue.TIMESTAMP // 伺服器時間戳記，確保排序完美
    };

    // ⚡ 啪！直接推送到 Google 雲端儲存箱，實時同步全世界
    lettersRef.push(newLetterData)
        .then(() => {
            // 清空輸入框
            nameInput.value = "";
            contentInput.value = "";
        })
        .catch((error) => {
            console.error("雲端寫入失敗：", error);
            alert("糟糕，網路好像開小差了，請稍後再試試看！");
        });
}