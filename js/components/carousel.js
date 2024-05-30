class CarouselComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.interval = null;
        this.gap = 50;
    }

    connectedCallback() {
        console.log('CarouselComponent connected');
        this.render();
        // this.startAutoPlay();
        this.shadowRoot.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.shadowRoot.querySelector('.next').addEventListener('click', () => this.nextSlide());
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => this.update());
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    render() {
        console.log('CarouselComponent render');
        this.shadowRoot.innerHTML = `
<link href="css/styles.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />
<style>
    :host {
        display: block;
        position: relative;
        overflow: hidden;
        height: 500px;
        width: 100%;
        margin: auto;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 10px;
    }
    .wrapper {
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .slides {
        display: flex;
        // flex: 1;
        width: 100%;
        gap: ${this.gap}px;
        min-width: 0;
        transition: transform 0.75s ease;
    }
    ::slotted(*) {
        flex: 0 0 100%;
        transition: opacity 0.75s ease;
        // opacity: 0;
    }
    ::slotted(.active) {
        opacity: 1;
    }
    .nav {
        cursor: pointer;
        z-index: 1;
        color: #dadada;
        font-size: 1.6rem;
    }
    @media (min-width: 768px) {
        .nav {
            font-size: 2.6rem;
        }
    }
    .indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 5px;
    }
    .indicator {
        color: var(--bs-gray-500);
    }
    .indicator.active {
        color: var(--bs-white);
    }
</style>
<div class="wrapper">
    <span class="nav prev"><i class="bi bi-chevron-compact-left"></i></span>
    <div class="slides">
        <slot></slot>
    </div>
    <span class="nav next"><i class="bi bi-chevron-compact-right"></i></span>
</div>
<div class="indicators"></div>
<slot name="extra"></slot>
`;
        this.update();
    }
    update() {
        console.log('CarouselComponent update');
        this.updateSlides();
        this.renderIndicators();
    }

    updateSlides() {
        console.log('CarouselComponent updateSlides');
        const slides = this.shadowRoot.querySelector('slot').assignedElements();
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        const container = this.shadowRoot.querySelector('.slides');
        container.style.transform = `translateX(calc(-${this.currentIndex * 100}% - ${this.currentIndex * this.gap}px))`;
    }

    renderIndicators() {
        const slides = this.shadowRoot.querySelector('slot').assignedElements();
        const indicators = this.shadowRoot.querySelector('.indicators');
        console.log('CarouselComponent renderIndicators', indicators);
        indicators.innerHTML = slides.map((_, index) => `
            <div class="indicator ${index === this.currentIndex ? 'active' : ''} fs-3" data-index="${index}"><i class="bi bi-dash-lg"></i></div>
        `).join('');
        indicators.querySelectorAll('.indicator').forEach(indicator => {
            // console.log('CarouselComponent renderIndicators forEach', indicator)
            indicator.addEventListener('click', (event) => {
                let target = event.target;
                if (!target.classList.contains('indicator')) {
                    target = target.closest('.indicator');
                }
                if (target.classList.contains('active')) return;
                this.goToSlide(Number(target.dataset.index));
            });
        });
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.shadowRoot.querySelector('slot').assignedElements().length - 1;
        this.update();
    }

    nextSlide() {
        const slides = this.shadowRoot.querySelector('slot').assignedElements();
        this.currentIndex = (this.currentIndex + 1) % slides.length;
        this.update();
    }

    goToSlide(index) {
        console.log('CarouselComponent goToSlide', index);
        this.currentIndex = index;
        this.update();
    }
}

customElements.define('carousel-component', CarouselComponent);
