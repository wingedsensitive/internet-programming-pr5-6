// Файл: scripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    const fabBtn = document.querySelector('.fab-btn');
    const fabNav = document.querySelector('.fab-nav');

    if (fabBtn && fabNav) {
        fabBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            fabNav.classList.toggle('active');
            
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
});