function safeParse(str) {
    if (!str) return [];
    try {
        return JSON.parse(str);
    } catch {
        try {
            return JSON.parse(str.replace(/'/g, '"'));
        } catch {
            console.warn("JSON parse failed:", str);
            return [];
        }
    }
}

function updateSlideInfo(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const dataEl = activeSlide.querySelector(".slider-container");
    if (!dataEl) return;

    const title = dataEl.dataset.title || "No title";
    const author = dataEl.dataset.author || "Unknown author";
    const plugins = safeParse(dataEl.dataset.plugisn);
    const builders = safeParse(dataEl.dataset.builder);

    // Update title + author
    document.getElementById("project-name").textContent = title;
    document.getElementById("slide-author").textContent = "By " + author;

    // Merge plugins + builders into one list
    const list = document.querySelector(".built-width-icons");
    list.innerHTML = "";

    [...plugins, ...builders].forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
    <a href="${item.link || "#"}">
    <img src="${item.image}" alt="${item.name}">
    </a>`;
        list.appendChild(li);
    });

    const totalSlides = swiper.slides.length;
    const currentSlide = swiper.realIndex + 1;
    document.getElementById("slide-counter").textContent = `${currentSlide}/${totalSlides}`;
}

// Swiper init
const swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    pagination: { el: ".swiper-pagination" },
    on: {
        init() {
            updateSlideInfo(this);
        },
        slideChange() {
            updateSlideInfo(this);
        }
    }
});