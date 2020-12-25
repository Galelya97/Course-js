export default class MessageSender {
  constructor(el, onSend) {
    this.onSend = onSend;

    this.messageInput = el.querySelector('[data-set=message__input]');
    this.messageSendButton = el.querySelector('[data-set=send-button]');

    this.messageSendButton.addEventListener('click', () => {
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    });
  }

  clear() {
    this.messageInput.value = '';
  }
}
