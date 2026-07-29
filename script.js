// PlotMate 랜딩페이지 인터랙션

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. 모바일 메뉴 토글
     ----------------------------------------- */
  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('primary-navigation');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    // 메뉴 안 링크를 클릭하면 자동으로 메뉴 닫기 (모바일에서)
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------
     2. 스크롤 시 헤더에 그림자 추가
     ----------------------------------------- */
  const header = document.querySelector('.site-header');

  if (header) {
    const handleScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* -----------------------------------------
     3. 스크롤하면 카드/섹션이 서서히 나타나는 효과
     ----------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // 구형 브라우저 대비: 관찰 기능이 없으면 그냥 바로 보이게 처리
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

});
