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

  /* -----------------------------------------
     4. 얼리 액세스 신청 모달
     ----------------------------------------- */
  const modal = document.getElementById('waitlist-modal');
  const openTriggers = document.querySelectorAll('.js-open-modal');
  const closeButton = modal ? modal.querySelector('.modal-close') : null;
  const form = document.getElementById('waitlist-form');
  const formView = modal ? modal.querySelector('.modal-form-view') : null;
  const successView = modal ? modal.querySelector('.modal-success-view') : null;
  const doneButton = modal ? modal.querySelector('.modal-done') : null;

  let lastFocusedElement = null;

  const openModal = () => {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    const emailInput = document.getElementById('waitlist-email');
    if (emailInput) emailInput.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    // 신청 완료 화면을 다시 폼 화면으로 초기화
    if (formView && successView) {
      formView.hidden = false;
      successView.hidden = true;
    }
    if (form) form.reset();
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (modal) {
    // 오버레이(바깥쪽 어두운 영역) 클릭 시 닫기
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }

  // ESC 키로 닫기
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // 실제 서버 연동 전이라 신청 완료 화면만 보여줍니다.
      if (formView && successView) {
        formView.hidden = true;
        successView.hidden = false;
      }
    });
  }

  if (doneButton) {
    doneButton.addEventListener('click', closeModal);
  }

});
