class Modal {

  /**
   * Constructor
   * @param {string} modal - the selector for the node el of the modal
   * @param {spread} others - any element you want to animate inside modal
   */
  constructor(modal, ...others) {
    this.modal = modal;
    this.others = others || [];
  }


  /**
   * Animation on enter 
   * @param {Number} offset - increment Timeout X ms  
   */
  animateOnShow(offset) {
    [].forEach.call(this.others, other => {
      setTimeout(() => {
        other.classList.add('is-visible');
        setTimeout(() => {
          other.classList.add('is-opaque');
        }, 300);
      }, 600 + offset);
      offset += 300;
    });
  }

  /**
   * Animation on leaving
   * @param {Number} offset  - increment Timeout X ms 
   */
  animateOnHide(offset) {
    [].forEach.call(this.others, other => {
      other.classList.remove('is-opaque');
      setTimeout(() => {
        other.classList.remove('is-visible');
      }, 300 + offset);
      offset += 100;
    });
  }

  show() {
    this.modal.classList.add('is-visible');
    document.body.classList.add('is-hidden');
    this.animateOnShow(0);
  }

  hide() {
    new Promise((resolve) => {
      resolve(this.animateOnHide(0));
    })
    .then(() => {
     setTimeout(() => {
        this.modal.classList.remove('is-visible');
        document.body.classList.remove('is-hidden');
      }, 300);
    })
    .then(() => {
      setTimeout(() => {
        this.modal.scrollTop = 0;
      }, 1000);
    });
  }

  /**
   * Toggle the animation based on selector
   */
  toggle() {
    (!this.modal.classList.contains('is-visible')) ? this.show() : this.hide();
  }
}

export default Modal;