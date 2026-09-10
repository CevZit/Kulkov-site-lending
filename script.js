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
});

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', '1');
  var banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
  // Событие аналитики
  if (typeof ym !== 'undefined') {
    ym(XXXXXX, 'reachGoal', 'cookies_accepted');
  }
}

// Обработка формы
function handleFormSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var name = form.querySelector('[name="name"]').value;
  var contact = form.querySelector('[name="contact"]').value;
  var message = form.querySelector('[name="message"]').value;
  var consent = form.querySelector('[name="consent"]').checked;

  if (!name || !contact || !consent) {
    alert('Пожалуйста, заполните имя, контакт и подтвердите согласие.');
    return false;
  }

  // Событие аналитики: отправка формы
  if (typeof ym !== 'undefined') {
    ym(XXXXXX, 'reachGoal', 'form_submit');
  }

  // Здесь можно отправить данные на почту или в Telegram через сервис.
  // Пока показываем сообщение об успехе.
  form.style.display = 'none';
  var success = form.parentElement.querySelector('.form-success');
  if (success) success.style.display = 'block';

  // Локальное сохранение (на случай, если сервер не подключён)
  console.log('Заявка:', { name: name, contact: contact, message: message });
  return false;
}

// События аналитики на клики
document.addEventListener('DOMContentLoaded', function() {
  // Клик по кнопке "Записаться"
  document.querySelectorAll('a[href="#contact"]').forEach(function(el) {
    el.addEventListener('click', function() {
      if (typeof ym !== 'undefined') ym(XXXXXX, 'reachGoal', 'click_zapis');
    });
  });

  // Клики по контактам в CTA
  document.querySelectorAll('.cta-contacts a').forEach(function(el) {
    el.addEventListener('click', function() {
      var href = el.getAttribute('href') || '';
      var goal = 'click_contact';
      if (href.indexOf('t.me') !== -1) goal = 'click_telegram';
      if (href.indexOf('mailto') !== -1) goal = 'click_email';
      if (typeof ym !== 'undefined') ym(XXXXXX, 'reachGoal', goal);
    });
  });
});