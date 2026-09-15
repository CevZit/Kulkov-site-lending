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

  var text = '📩 Новая заявка с сайта\n\n' +
             'Имя: ' + name + '\n' +
             'Контакт: ' + contact + '\n' +
             (message ? 'Сообщение: ' + message : 'Сообщение: —');

  fetch('https://form-proxy.souldrugplus.workers.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    if (data.ok) {
      if (typeof ym !== 'undefined') {
        ym(XXXXXX, 'reachGoal', 'form_submit');
      }
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

// Кнопка "наверх"
document.addEventListener('DOMContentLoaded', function() {
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
