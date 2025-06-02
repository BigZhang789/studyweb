// 轮播图功能
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.dots = container.querySelectorAll('.carousel-dot');
        this.prevBtn = container.querySelector('.carousel-arrow.prev');
        this.nextBtn = container.querySelector('.carousel-arrow.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }

    init() {
        this.showSlide(0);
        this.bindEvents();
        this.startAutoSlide();
    }

    showSlide(index) {
        // 隐藏所有幻灯片
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // 显示当前幻灯片
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }

    bindEvents() {
        // 下一张按钮
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });

        // 上一张按钮
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });

        // 圆点导航
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetAutoSlide();
            });
        });

        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoSlide();
            }
        });
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5秒切换一次
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});
