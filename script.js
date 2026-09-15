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

  var TELEGRAM_TOKEN = '8987403954:AAFn_gpCM88FkIDlC3bcUcPzfZCTnvl_jfw';
  var CHAT_ID = '580830739';

  var text = '📩 Новая заявка с сайта\n\n' +
             'Имя: ' + name + '\n' +
             'Контакт: ' + contact + '\n' +
             (message ? 'Сообщение: ' + message : 'Сообщение: —');

  var url = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage';

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    if (data.ok) {
      form.style.display = 'none';
      var success = form.parentElement.querySelector('.form-success');
      if (success) success.style.display = 'block';
    } else {
      alert('Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.');
    }
  })
  .catch(function() {
    alert('Ошибка отправки. Попробуйте ещё раз или напишите в Telegram.');
  });

  return false;
}