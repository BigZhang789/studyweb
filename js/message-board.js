// 留言板功能
class MessageBoard {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('message-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitMessage();
            });
        }
    }

    submitMessage() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // 验证输入
        if (!name || !email || !message) {
            alert('请填写所有必填字段！');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }

        // 创建新留言（仅用于后台处理，不再显示）
        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString('zh-CN')
        };

        // 这里可以添加发送留言到服务器的代码
        // 例如: this.sendMessageToServer(newMessage);

        // 清空表单
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';

        alert('留言提交成功！感谢您的反馈。我们会尽快回复您。');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 页面加载完成后初始化留言板
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('message-form')) {
        new MessageBoard();
    }
});
