document.addEventListener('DOMContentLoaded', function() {
    // 滾動效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // 大洲選單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const continentDropdown = document.querySelector('.continent-dropdown');

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        continentDropdown.classList.toggle('active');
    });

    // 點擊其他地方關閉選單
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.continent-menu')) {
            continentDropdown.classList.remove('active');
        }
    });

    // 卡片hover效果
    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
        const viewMore = card.querySelector('.view-more');
        
        card.addEventListener('mouseenter', function() {
            viewMore.style.color = 'var(--color-accent-green)';
        });
        
        card.addEventListener('mouseleave', function() {
            viewMore.style.color = 'var(--color-accent-blue)';
        });
    });

    // 平滑滾動
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 移動端選單
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-button');
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            position: absolute;
            right: 1rem;
            top: 1rem;
            color: var(--color-secondary);
        `;

        header.appendChild(mobileMenuButton);

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuButton.style.display = 'block';
            } else {
                mobileMenuButton.style.display = 'none';
                nav.classList.remove('active');
                nav.querySelector('ul').style.display = 'flex';
            }
        };

        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            const ul = nav.querySelector('ul');
            ul.style.display = ul.style.display === 'none' || ul.style.display === '' ? 'flex' : 'none';
        });

        window.addEventListener('resize', handleResize);
        handleResize();
    };

    createMobileMenu();
});
