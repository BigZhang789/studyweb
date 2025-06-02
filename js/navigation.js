// 导航组件 - 可在所有页面复用
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.createNavigation();
        this.bindEvents();
    }

    createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html">
                        <h2>孔杜留学指导</h2>
                    </a>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="index.html" class="nav-link">首页</a>
                        </li>
                        <li class="nav-item">
                            <a href="resources.html" class="nav-link">留学资料</a>
                        </li>
                        <li class="nav-item">
                            <a href="message-board.html" class="nav-link">留言板</a>
                        </li>
                        <li class="nav-item">
                            <a href="about.html" class="nav-link">关于我们</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.html" class="nav-link">联系我们</a>
                        </li>
                    </ul>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        `;

        // 插入到页面顶部
        document.body.insertBefore(nav, document.body.firstChild);
    }

    bindEvents() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // 高亮当前页面
        this.highlightCurrentPage();
    }

    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
