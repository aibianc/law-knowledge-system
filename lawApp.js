// 法律知识学习系统 - 应用逻辑

// 渲染主内容
function renderContent() {
    const content = document.getElementById('content');
    
    content.innerHTML = lawKnowledgeData.map(law => {
        return `
        <div id="${law.id}" class="law-card" style="--law-color: ${law.color}">
            <div class="law-header" style="border-color: ${law.color}">
                <div class="law-icon" style="background: ${law.color}">${law.icon}</div>
                <div class="law-title">${law.name}</div>
            </div>
            ${law.chapters.map((chapter, idx) => `
                <div class="chapter-block">
                    <div class="chapter-header" onclick="toggleChapter('${law.id}-${idx}')">
                        <div class="chapter-title">${chapter.title}</div>
                        <div class="toggle-icon" id="icon-${law.id}-${idx}">▼</div>
                    </div>
                    <div id="${law.id}-${idx}" class="chapter-content">
                        ${renderChapterContent(chapter.content, law.color)}
                    </div>
                </div>
            `).join('')}
        </div>
    `}).join('');
}

// 渲染章节内容
function renderChapterContent(content, color) {
    let html = '';
    for (let key in content) {
        html += `
            <div class="content-box" style="border-color: ${color}; --law-color: ${color}">
                <div class="content-subtitle">
                    💡 ${key}
                </div>
                <div class="content-list">
                    <ul>
                        ${content[key].map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    return html;
}

// 切换章节展开/收起
function toggleChapter(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    content.classList.toggle('active');
    icon.classList.toggle('active');
    
    if (content.classList.contains('active')) {
        icon.textContent = '▲';
    } else {
        icon.textContent = '▼';
    }
}

// 展开/收起全部
let allExpanded = false;
function toggleAll() {
    allExpanded = !allExpanded;
    const chapters = document.querySelectorAll('.chapter-content');
    const icons = document.querySelectorAll('.toggle-icon');
    
    chapters.forEach(c => {
        if (allExpanded) {
            c.classList.add('active');
        } else {
            c.classList.remove('active');
        }
    });
    
    icons.forEach(i => {
        if (allExpanded) {
            i.classList.add('active');
            i.textContent = '▲';
        } else {
            i.classList.remove('active');
            i.textContent = '▼';
        }
    });
}

// 生成侧边导航
function generateSideNav() {
    const sideNavContent = document.getElementById('sideNavContent');
    
    sideNavContent.innerHTML = lawKnowledgeData.map(law => {
        return `
            <div class="nav-law" style="--color: ${law.color}">
                <div class="nav-law-title" onclick="toggleNavLaw('nav-${law.id}')">
                    <span>${law.icon} ${law.name}</span>
                    <span class="icon">▶</span>
                </div>
                <div class="nav-chapter-list" id="nav-${law.id}">
                    ${law.chapters.map((chapter, idx) => `
                        <div class="nav-chapter-item" onclick="scrollToChapter('${law.id}', ${idx})">
                            ${chapter.title}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// 切换侧边导航法律模块
function toggleNavLaw(id) {
    const navLaw = document.getElementById(id);
    const icon = navLaw.previousElementSibling.querySelector('.icon');
    
    navLaw.classList.toggle('active');
    
    if (navLaw.classList.contains('active')) {
        icon.textContent = '▼';
        icon.parentElement.classList.add('active');
    } else {
        icon.textContent = '▶';
        icon.parentElement.classList.remove('active');
    }
}

// 滚动到指定章节
function scrollToChapter(lawId, chapterIdx) {
    const targetElement = document.getElementById(lawId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 自动展开该章节
        setTimeout(() => {
            const chapterContent = document.getElementById(`${lawId}-${chapterIdx}`);
            const icon = document.getElementById(`icon-${lawId}-${chapterIdx}`);
            if (chapterContent && !chapterContent.classList.contains('active')) {
                chapterContent.classList.add('active');
                icon.classList.add('active');
                icon.textContent = '▲';
            }
        }, 500);
    }
    
    // 移动端自动关闭侧边导航
    if (window.innerWidth <= 768) {
        toggleSideNav();
    }
}

// 切换移动端侧边导航
function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    sideNav.classList.toggle('active');
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 搜索功能
function searchLaw(keyword) {
    keyword = keyword.trim().toLowerCase();
    const lawCards = document.querySelectorAll('.law-card');
    
    if (!keyword) {
        lawCards.forEach(card => card.style.display = 'block');
        highlightKeyword('');
        return;
    }
    
    lawCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword)) {
            card.style.display = 'block';
            // 自动展开匹配的章节
            const chapters = card.querySelectorAll('.chapter-content');
            const icons = card.querySelectorAll('.toggle-icon');
            chapters.forEach(c => c.classList.add('active'));
            icons.forEach(i => {
                i.classList.add('active');
                i.textContent = '▲';
            });
        } else {
            card.style.display = 'none';
        }
    });
    
    highlightKeyword(keyword);
}

// 高亮关键词
function highlightKeyword(keyword) {
    const content = document.getElementById('content');
    const html = content.innerHTML;
    
    // 移除之前的高亮
    const cleanHtml = html.replace(/<mark class="highlight">(.*?)<\/mark>/g, '$1');
    
    if (keyword) {
        // 添加新的高亮
        const regex = new RegExp(`(${keyword})`, 'gi');
        const highlightedHtml = cleanHtml.replace(regex, '<mark class="highlight">$1</mark>');
        content.innerHTML = highlightedHtml;
    } else {
        content.innerHTML = cleanHtml;
    }
}

// 滚动监听
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // 更新进度条
    document.getElementById('progressBar').style.width = scrollPercent + '%';
    
    // 显示/隐藏滚动到顶部按钮
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTop > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // 高亮侧边导航当前章节
    highlightCurrentNav();
});

// 高亮侧边导航当前章节
function highlightCurrentNav() {
    const lawCards = document.querySelectorAll('.law-card');
    const navItems = document.querySelectorAll('.nav-chapter-item');
    
    // 移除所有高亮
    navItems.forEach(item => item.classList.remove('active'));
    
    // 查找当前在视口中的法律模块
    let currentLaw = null;
    lawCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentLaw = card.id;
        }
    });
    
    // 如果找到当前法律模块，高亮对应的侧边导航项
    if (currentLaw) {
        const chapters = document.querySelectorAll(`#${currentLaw} .chapter-block`);
        chapters.forEach((chapter, idx) => {
            const rect = chapter.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                // 找到对应的侧边导航项并高亮
                const navList = document.getElementById(`nav-${currentLaw}`);
                if (navList) {
                    const navItem = navList.children[idx];
                    if (navItem) {
                        navItem.classList.add('active');
                        // 自动展开该法律模块
                        if (!navList.classList.contains('active')) {
                            navList.classList.add('active');
                            const icon = navList.previousElementSibling.querySelector('.icon');
                            if (icon) {
                                icon.textContent = '▼';
                                icon.parentElement.classList.add('active');
                            }
                        }
                    }
                }
            }
        });
    }
}

// 平滑滚动到锚点
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 添加样式
const style = document.createElement('style');
style.textContent = `
    @media print {
        .navbar, .side-nav, .scroll-top, .progress-bar, .nav-toggle {
            display: none !important;
        }
        body {
            background: white !important;
        }
        .law-card {
            page-break-inside: avoid;
            box-shadow: none !important;
        }
        .chapter-content {
            max-height: none !important;
            display: block !important;
        }
    }
    .highlight {
        background-color: #ffeb3b;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    // Esc 清空搜索
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        searchLaw('');
        searchInput.blur();
    }
});

// 初始化
renderContent();
generateSideNav();
