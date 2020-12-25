export default class UserList {
  constructor(el) {
    this.el = el;
    this.users = new Set();
  }

  updateUI() {
    this.el.innerHTML = '';

    const frag = document.createDocumentFragment();

    this.users.forEach((name) => {
      const div = document.createElement('div');
      div.textContent = name;
      frag.append(div);
    });

    this.el.appendChild(frag);
  }

  add(name) {
    this.users.add(name);
    this.updateUI();
  }

  addList(names) {
    names.forEach((name) => {
      this.add(name);
    });
  }

  remove(name) {
    this.users.delete(name);
    this.updateUI();
  }
}
