export default class LoginWindow {
  constructor(el, onLogin) {
    this.el = el;
    this.onLogin = onLogin;

    const loginNameInput = el.querySelector('[data-set=login__input]');
    const loginSubmit = el.querySelector('[data-set=login__submit]');
    const loginError = el.querySelector('[data-set=login__error]');

    loginSubmit.addEventListener('click', () => {
      loginError.textContent = '';

      const name = loginNameInput.value.trim();

      if (!name) {
        loginError.textContent = 'Введите логин !';
      } else {
        this.onLogin(name);
      }
    });
  }

  show() {
    this.el.classList.remove('hidden');
  }

  hide() {
    this.el.classList.add('hidden');
  }
}
