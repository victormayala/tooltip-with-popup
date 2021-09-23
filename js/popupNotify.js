const template = document.createElement("template");
template.innerHTML = `

  <style>
    .tooltip-container {
      display: inline-block;
      position: relative;
      z-index: 2;
    }
    .cancel {
      display: none;
    }
    svg {
      width: 1em;
      cursor: pointer;
    }
    .notify-container {
      position: absolute;
      bottom: 125%;
      z-index: 9;
      width: 300px;
      background: white;
      box-shadow: 5px 5px 10px rgba(0,0,0,.1);
      font-size: .8em;
      border-radius: .5em;
      padding: 1em;
      transform: scale(0);
      transform-origin: bottom left;
      transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
    }
  </style>

  <div class="tooltip-container">
    <svg viewBox="0 0 165 165" class="alert">
      <g transform="translate(-1016 -445)"><circle cx="82.5" cy="82.5" r="82.5" transform="translate(1016 445)" fill="#409bf5"/><rect width="27" height="88" rx="6" transform="translate(1085 463)" fill="#fff"/><circle cx="17.5" cy="17.5" r="17.5" transform="translate(1081 557)" fill="#fff"/></g>
    </svg>
    <svg viewBox="0 0 165 165" class="cancel">
      <g transform="translate(-1245 -445)"><circle cx="82.5" cy="82.5" r="82.5" transform="translate(1245 445)" fill="#409bf5"/><rect width="20" height="129" rx="6" transform="matrix(0.719, 0.695, -0.695, 0.719, 1365.112, 474.156)" fill="#fff"/><rect width="20" height="129" rx="6" transform="translate(1274.821 488.963) rotate(-45)" fill="#fff"/></g>
    </svg>

    <div class="notify-container">
      <slot name="message" />
      <slot name="message1" />
    </div>
  </div>

`;

class PopupNotify extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  tooltip(expandState) {
    const tooltip = this.shadowRoot.querySelector(".notify-container");
    const alert = this.shadowRoot.querySelector(".alert");
    const cancel = this.shadowRoot.querySelector(".cancel");

    if (expandState == true) {
      tooltip.style.transform = "scale(1)";
      alert.style.display = "none";
      cancel.style.display = "block";
      expandState = false;
    } else {
      tooltip.style.transform = "scale(0)";
      cancel.style.display = "none";
      alert.style.display = "block";
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".alert").addEventListener("click", () => {
      this.tooltip(true);
    });
    this.shadowRoot.querySelector(".cancel").addEventListener("click", () => {
      this.tooltip(false);
    });
  }
}

window.customElements.define("popup-notify", PopupNotify);
 