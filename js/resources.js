// 学习资料页面增强功能
class ResourcesEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.createBackToTopButton();
        this.createSearchFunction();
        this.addScrollEffects();
        this.bindEvents();
    }

    // 创建回到顶部按钮
    createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(backToTopBtn);

        // 滚动显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        // 点击回到顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 创建搜索功能
    createSearchFunction() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            position: sticky;
            top: 70px;
            background: white;
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 100;
            margin-bottom: 20px;
        `;

        searchContainer.innerHTML = `
            <div class="container">
                <div style="max-width: 500px; margin: 0 auto; position: relative;">
                    <input type="text" id="resource-search" placeholder="搜索学习资料..." style="
                        width: 100%;
                        padding: 15px 50px 15px 20px;
                        border: 2px solid #e9ecef;
                        border-radius: 25px;
                        font-size: 1rem;
                        transition: border-color 0.3s ease;
                    ">
                    <span style="
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #999;
                        font-size: 1.2rem;
                    ">🔍</span>
                </div>
            </div>
        `;

        // 插入到主内容区域的开始
        const mainContent = document.querySelector('.main-content');
        const firstSection = mainContent.querySelector('.section');
        mainContent.insertBefore(searchContainer, firstSection);

        // 搜索功能
        const searchInput = document.getElementById('resource-search');
        searchInput.addEventListener('input', (e) => {
            this.filterResources(e.target.value);
        });

        // 搜索框焦点效果
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#667eea';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#e9ecef';
        });
    }

    // 资料过滤功能
    filterResources(searchTerm) {
        const resourceCards = document.querySelectorAll('.resource-card');
        const sections = document.querySelectorAll('.section');
        
        searchTerm = searchTerm.toLowerCase();

        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // 隐藏没有可见资料的section
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.resource-card[style*="display: block"], .resource-card:not([style*="display: none"])');
            if (visibleCards.length === 0 && section.querySelector('.resource-card')) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    }

    // 添加滚动效果
    addScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // 观察所有资料卡片
        document.querySelectorAll('.resource-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });

        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 绑定其他事件
    bindEvents() {
        // 为所有购买按钮添加点击统计
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resourceTitle = e.target.closest('.resource-card')?.querySelector('h3')?.textContent;
                if (resourceTitle) {
                    console.log(`用户点击了资料: ${resourceTitle}`);
                    // 这里可以添加统计代码
                }
            });
        });

        // 添加价格高亮效果
        document.querySelectorAll('.price').forEach(price => {
            price.addEventListener('mouseenter', () => {
                price.style.transform = 'scale(1.1)';
                price.style.transition = 'transform 0.3s ease';
            });

            price.addEventListener('mouseleave', () => {
                price.style.transform = 'scale(1)';
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ResourcesEnhancer();
});
