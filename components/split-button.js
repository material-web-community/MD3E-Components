/**
 * MD3E Components | Split Button component. 
 * Developed by bocajthomas
 * Version: 0.0.1
 * 
 * The SplitButton component displays a primary action button and a secondary menu button.
 * 
 * @example
 * <!-- Usage in HTML -->
 * <md-split-button></md-split-button>
 * 
 * @fires main-click - Dispatched when the main button is clicked.
 * @fires menu-click - Dispatched when the menu button is clicked.
 * 
 * @slot - (Not used) The component does not currently support slots.
 * 
 * @csspart md-split-button - The container of the split button.
 * @csspart common-button - The main action button.
 * @csspart menu-icon-button - The menu icon button.
 * 
 * @cssprop --md-sys-color-surface - Background color of the button.
 * @cssprop --md-sys-color-outline-variant - Border color of the button.
 * @cssprop --md-sys-color-surface-variant - Hover background color.
 */
class SplitButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const newLocal = `
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
            <style>
            :host {
                display: inline-block;
                font-family: 'Roboto', sans-serif;
                font-size: 14px;
                cursor: pointer;
                position: relative;
                user-select: none;
                padding: 0;
            }
            .md-split-button {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                gap: 2px;
            }

            .material-icons-round {
                font-size: 20px;
            }

            .common-button {
                align-items: center;
                justify-content: center;
                display: flex;
                padding: 20px;
                background-color: rgb(0, 0, 0);
                border-bottom-left-radius: 30px;
                border-top-left-radius: 30px;
                border-bottom-right-radius: 10px;
                border-top-right-radius: 10px;
                gap: 10px;
            }

            .menu-icon-button {
                align-items: center;
                justify-content: center;
                display: flex;
                padding: 20px;
                background-color: rgb(0, 0, 0);
                border-bottom-left-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom-right-radius: 30px;
                border-top-right-radius: 30px;
                transition: border-bottom-left-radius 0.1s ease-in-out, border-top-left-radius 0.1s ease-in-out;
            }

            .expanded {
                border-bottom-left-radius: 30px;
                border-top-left-radius: 30px;
                border-bottom-right-radius: 30px;
                border-top-right-radius: 30px;
            }

            .menu-icon-button .material-icons-round {
                transition: transform 0.1s ease-in-out;
            }
            </style>
            
            <div class="md-split-button">
                <div class="common-button" tabindex="0">
                    <span class="material-icons-round">edit</span>
                    <span class="label">Edit</span>
                </div>

                <div class="menu-icon-button" tabindex="0" aria-haspopup="true" aria-expanded="false">
                    <span class="material-icons-round">expand_more</span>
                </div>
            </div>
        `;
        shadow.innerHTML = newLocal;

        this._mainButton = shadow.querySelector('.common-button');
        this._menuButton = shadow.querySelector('.menu-icon-button');
        this._menuIcon = shadow.querySelector('.menu-icon-button .material-icons-round');

        const updateIcon = () => {
            const icon = getComputedStyle(this).getPropertyValue('--md-split-button-icon').trim();
            if (icon) {
                const iconSpan = this._mainButton.querySelector('.material-icons-round');
                if (iconSpan) iconSpan.textContent = icon;
            }
        };
        updateIcon();

        const observer = new MutationObserver(() => updateIcon());
        observer.observe(this, { attributes: true, attributeFilter: ['style'] });

        this._mainButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('main-click', { bubbles: true, composed: true }));
        });

        this._menuButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('menu-click', { 
                bubbles: true, 
                composed: true 
            }));
            this._menuButton.classList.toggle('expanded');
            this._menuIcon.style.transform = this._menuButton.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }
}

customElements.define('md-split-button', SplitButton);