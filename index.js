document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const joinWaitlistBtns = document.querySelectorAll('#joinWaitlistBtn, #joinWaitlistBtn2');
  const closeModal = document.getElementById('closeModal');
  const formModal = document.getElementById('formModal');

  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      navLinks.classList.remove('active');
    });
  });

  joinWaitlistBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      formModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModal.addEventListener('click', function() {
    formModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  formModal.addEventListener('click', function(e) {
    if (e.target === formModal) {
      formModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
