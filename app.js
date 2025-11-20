// 颜色配置
const colorConfig = {
    blue: { from: '#4facfe', to: '#00f2fe', accent: '#4facfe', icon: '🔵' },
    green: { from: '#43e97b', to: '#38f9d7', accent: '#43e97b', icon: '🟢' },
    yellow: { from: '#fa709a', to: '#fee140', accent: '#fa709a', icon: '🟡' },
    purple: { from: '#a18cd1', to: '#fbc2eb', accent: '#a18cd1', icon: '🟣' },
    red: { from: '#ff6a88', to: '#ff99ac', accent: '#ff6a88', icon: '🔴' }
};

// 渲染内容
function renderContent() {
    const content = document.getElementById('content');
    const colors = colorConfig;
    
    content.innerHTML = knowledgeData.map(chapter => {
        const chapterColor = colors[chapter.color];
        return `
        <div id="${chapter.id}" class="chapter-card" style="--color-from: ${chapterColor.from}; --color-to: ${chapterColor.to}; --accent-color: ${chapterColor.accent}">
            <div class="chapter-header" style="border-color: ${chapterColor.accent}">
                <div class="chapter-icon">${chapterColor.icon}</div>
                <div class="chapter-title" style="color: ${chapterColor.accent}">${chapter.title}</div>
            </div>
            ${chapter.sections.map((section, sIdx) => `
                <div class="section-block" style="border-color: ${chapterColor.accent}">
                    <div class="section-header" onclick="toggleSection('${chapter.id}-${sIdx}')">
                        <div class="section-title">${section.title}</div>
                        <div class="toggle-icon" id="icon-${chapter.id}-${sIdx}">▼</div>
                    </div>
                    <div id="${chapter.id}-${sIdx}" class="section-content">
                        ${section.definition ? `
                            <div class="point-card" style="border-color: ${chapterColor.accent}; background: linear-gradient(135deg, ${chapterColor.from}11, ${chapterColor.to}11)">
                                <div class="point-title" style="color: ${chapterColor.accent}">
                                    📖 定义
                                </div>
                                <div class="point-content">${section.definition}</div>
                            </div>
                        ` : ''}
                        ${section.points.map(point => `
                            <div class="point-card" style="border-color: ${chapterColor.accent}">
                                <div class="point-title" style="color: ${chapterColor.accent}">
                                    💡 ${point.name}
                                </div>
                                <div class="point-content">
                                    <ul>
                                        ${point.items.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `}).join('');
}

// 切换章节
function toggleSection(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    content.classList.toggle('active');
    icon.classList.toggle('active');
    
    // 添加动画效果
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
    const sections = document.querySelectorAll('.section-content');
    const icons = document.querySelectorAll('.toggle-icon');
    
    sections.forEach(s => {
        if (allExpanded) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
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

// 搜索功能
function search(keyword) {
    keyword = keyword.trim().toLowerCase();
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    if (!keyword) {
        chapterCards.forEach(card => card.style.display = 'block');
        highlightKeyword('');
        return;
    }
    
    chapterCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword)) {
            card.style.display = 'block';
            // 自动展开匹配的章节
            const sections = card.querySelectorAll('.section-content');
            const icons = card.querySelectorAll('.toggle-icon');
            sections.forEach(s => s.classList.add('active'));
            icons.forEach((i, idx) => {
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

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
    const chapters = document.querySelectorAll('.chapter-card');
    const navItems = document.querySelectorAll('.nav-section-item');
    
    // 移除所有高亮
    navItems.forEach(item => item.classList.remove('active'));
    
    // 查找当前在视口中的章节
    let currentChapter = null;
    chapters.forEach(chapter => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentChapter = chapter.id;
        }
    });
    
    // 如果找到当前章节，高亮对应的侧边导航项
    if (currentChapter) {
        const sections = document.querySelectorAll(`#${currentChapter} .section-block`);
        sections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                // 找到对应的侧边导航项并高亮
                const navList = document.getElementById(`nav-${currentChapter}`);
                if (navList) {
                    const navItem = navList.children[idx];
                    if (navItem) {
                        navItem.classList.add('active');
                        // 自动展开该章节
                        if (!navList.classList.contains('active')) {
                            navList.classList.add('active');
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
                const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 添加打印样式
const style = document.createElement('style');
style.textContent = `
    @media print {
        .navbar, .quick-nav, .scroll-top, .progress-bar {
            display: none !important;
        }
        body {
            background: white !important;
        }
        .chapter-card {
            page-break-inside: avoid;
            box-shadow: none !important;
        }
        .section-content {
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

// 生成侧边导航
function generateSideNav() {
    const sideNavContent = document.getElementById('sideNavContent');
    const colors = colorConfig;
    
    sideNavContent.innerHTML = knowledgeData.map(chapter => {
        const chapterColor = colors[chapter.color];
        return `
            <div class="nav-chapter" style="--color-from: ${chapterColor.from}; --color-to: ${chapterColor.to}; --color-accent: ${chapterColor.accent}">
                <div class="nav-chapter-title" onclick="toggleNavChapter('nav-${chapter.id}')">
                    <span>${chapterColor.icon}</span>
                    <span>${chapter.title}</span>
                </div>
                <div class="nav-section-list" id="nav-${chapter.id}">
                    ${chapter.sections.map((section, idx) => `
                        <div class="nav-section-item" onclick="scrollToSection('${chapter.id}', ${idx})">
                            ${section.title}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// 切换侧边导航章节
function toggleNavChapter(id) {
    const navChapter = document.getElementById(id);
    navChapter.classList.toggle('active');
}

// 滚动到指定章节
function scrollToSection(chapterId, sectionIdx) {
    const targetElement = document.getElementById(chapterId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 自动展开该章节
        setTimeout(() => {
            const sectionContent = document.getElementById(`${chapterId}-${sectionIdx}`);
            const icon = document.getElementById(`icon-${chapterId}-${sectionIdx}`);
            if (sectionContent && !sectionContent.classList.contains('active')) {
                sectionContent.classList.add('active');
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

// 初始化
renderContent();
generateSideNav();

// 添加键盘快捷键
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
        search('');
        searchInput.blur();
    }
});
