import validateCard from "./validateCardNum";

export default class CreditCardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <form class="validate">
      <ul class="cards list-unstyled">
        <li class="card visa"></li>
        <li class="card mastercard"></li>
        <li class="card amex"></li>
        <li class="card discover"></li>
        <li class="card jcb"></li>
        <li class="card diners"></li>
      </ul>

      <input type="text" class="validate__input" id="validate__input" placeholder="Credit card number">
      <button class="validate__button">Click to Validate</button>
    </form>
    `;
  }

  static get inputSelector() {
    return `.validate__input`;
  }

  static get submitBtnSelector() {
    return `.validate__button`;
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const submit = this.parentEl.querySelector(
      this.constructor.submitBtnSelector,
    );
    submit.addEventListener("click", (event) => this.onSubmit(event));
  }

  onSubmit(event) {
    event.preventDefault();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    if (validateCard(inputEl.value)) {
      this.showCurrentCard(inputEl);
    } else {
      inputEl.value = "Uncorrect card";
      inputEl.setAttribute("disabled", "");
      setTimeout(() => {
        inputEl.value = "";
        inputEl.removeAttribute("disabled");
      }, 1500);
    }
  }

  showCurrentCard(input) {
    const allCards = Array.from(document.querySelectorAll(".card"));

    let currentCard = null;

    if (input.value.startsWith(4)) {
      currentCard = "visa";
    } else if (input.value.startsWith(37)) {
      currentCard = "amex";
    } else if (input.value.startsWith(305)) {
      currentCard = "diners";
    } else if (input.value.startsWith(6011)) {
      currentCard = "discover";
    } else if (input.value.startsWith(55)) {
      currentCard = "mastercard";
    }

    const allCardsWithoutCurrent = allCards.filter(
      (card) => !card.classList.contains(currentCard),
    );

    allCardsWithoutCurrent.forEach((card) => card.classList.add("cdisabled"));
  }
}
