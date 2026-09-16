// Плавающая навигация
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('floatNav');
  if (nav) {
    var toggle = nav.querySelector('.float-nav-toggle');
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.float-nav-menu a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
      });
    });
  }

  // Cookies
  var cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
    cookieBanner.classList.remove('hidden');
  }

  // Кнопка "наверх"
  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.setAttribute('aria-label', 'Наверх');
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
});

// Cookies
function acceptCookies() {
  localStorage.setItem('cookiesAccepted', '1');
  var banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
}

// Обработка формы — отправка напрямую в Telegram
handleFormSubmit