/**
 * MD3E Components | Toolbar component. 
 * Developed by bocajthomas
 * Version: 0.0.1
 * 
 * The Toolbar component displays a floating, rounded toolbar with Material Design icons.
 * 
 * @example
 * <!-- Usage in HTML -->
 * <md-toolbar></md-toolbar>
 * 
 * @fires toolbar-click - Dispatched when any button inside the toolbar is clicked.
 * 
 * @slot - Allows for custom buttons or other elements to be placed inside the toolbar.
 * 
 * @csspart md-toolbar - The container of the toolbar.
 * @csspart toolbar-button - The individual button elements.
 */
class MdToolbar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const newLocal = `
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
            <style>
                :host {
                    display: block;
                    font-family: 'Roboto', sans-serif;
                }

                .toolbar {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #242c33;
                    border-radius: 2rem; 
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4); 
                    padding: 0.5rem; 
                    width: 20rem;
                    gap: 0.25rem; 
                }

                .toolbar-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem; 
                    border-radius: 50px; 
                    color: white;
                    transition: background-color 150ms ease-in-out;
                    cursor: pointer;
                    border: none;
                    background-color: transparent;
                }

                .toolbar-button:hover {
                    background-color: #3e4c5a; 
                }
            </style>
            
            <div class="toolbar" part="md-toolbar">
                <slot></slot>
            </div>
        `;
        
        shadow.innerHTML = newLocal;
        this._toolbar = shadow.querySelector('.toolbar');
    }

    connectedCallback() {
        this._toolbar.addEventListener('click', this._handleButtonClick.bind(this));
        if (this.innerHTML.trim() === '') {
            this._createDefaultButtons();
        }
    }

    disconnectedCallback() {
        this._toolbar.removeEventListener('click', this._handleButtonClick.bind(this));
    }
    
    _createDefaultButtons() {
        const icons = ['undo', 'format_bold', 'format_italic', 'format_underline', 'edit', 'more_vert'];
        icons.forEach(iconName => {
            const button = document.createElement('button');
            button.className = 'toolbar-button';
            button.setAttribute('part', 'toolbar-button');
            button.innerHTML = `<span class="material-icons-round">${iconName}</span>`;
            button.dataset.icon = iconName; 
            this._toolbar.appendChild(button); 
        });
    }

    _handleButtonClick(event) {
        const button = event.target.closest('.toolbar-button');
        if (button) {
            this.dispatchEvent(new CustomEvent('toolbar-click', { 
                bubbles: true, 
                composed: true,
                detail: {
                    icon: button.dataset.icon
                }
            }));
        }
    }
}

customElements.define('md-toolbar', MdToolbar);
