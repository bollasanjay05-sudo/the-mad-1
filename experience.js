const heroSlides = [
  { 
    title: 'MAKE IT<br/><em>YOURS.</em>', 
    desc: 'Original comic energy, meme culture and custom graphics printed on the pieces you love.',
    img: 'assets/images/summertime-tee.jpg',
    kicker: 'THE MAD EDIT / APPAREL',
    watermark: 'APPAREL',
    floating: 'CUSTOM GRAPHICS ↗'
  },
  { 
    title: 'KEEP THE<br/><em>MEMORY.</em>', 
    desc: 'Turn your favorite photos into stunning shadow boxes, premium frames, and acrylic keepsakes.',
    img: 'assets/images/shadow-box.jpg',
    kicker: 'THE MAD EDIT / PHOTO GIFTS',
    watermark: 'FRAMES',
    floating: 'CUSTOM FRAMES ↗'
  },
  { 
    title: 'DRINK IN<br/><em>STYLE.</em>', 
    desc: 'Custom printed tumblers and drinkware for your daily hydration or event giveaways.',
    img: 'assets/images/tumbler.jpg',
    kicker: 'THE MAD EDIT / DRINKWARE',
    watermark: 'DRINKWARE',
    floating: 'CUSTOM TUMBLERS ↗'
  },
  { 
    title: 'WEAR YOUR<br/><em>VIBE.</em>', 
    desc: 'Bold back prints and aesthetic designs that speak louder than words.',
    img: 'assets/images/kurama-tee.jpg',
    kicker: 'THE MAD EDIT / ANIME',
    watermark: 'ANIME',
    floating: 'NINE TAILS ↗'
  },
  { 
    title: 'FRIDGE<br/><em>GOALS.</em>', 
    desc: 'Colorful, magnetic photo frames to keep your favorite people close in the kitchen.',
    img: 'assets/images/magnets.jpg',
    kicker: 'THE MAD EDIT / MAGNETS',
    watermark: 'MAGNETS',
    floating: 'CUSTOM MAGNETS ↗'
  }
];

let currentSlide = 0;
const heroImage = document.getElementById('ed-hero-photo');
const heroTitle = document.getElementById('ed-hero-title');
const heroDesc = document.getElementById('ed-hero-description');
const heroKicker = document.getElementById('ed-hero-kicker');
const heroWatermark = document.getElementById('ed-hero-watermark');
const heroFloating = document.getElementById('ed-floating-label');
const heroCurrent = document.getElementById('ed-hero-current');
const heroIndex = document.getElementById('ed-hero-index');

function updateHero(index) {
  const slide = heroSlides[index];
  
  // Fade out
  heroImage.style.opacity = 0;
  heroTitle.style.opacity = 0;
  heroDesc.style.opacity = 0;

  setTimeout(() => {
    heroImage.src = slide.img;
    heroTitle.innerHTML = slide.title;
    heroDesc.innerText = slide.desc;
    heroKicker.innerText = slide.kicker;
    heroWatermark.innerText = slide.watermark;
    heroFloating.innerText = slide.floating;
    heroCurrent.innerText = `${slide.watermark} / 0${index + 1}`;
    heroIndex.innerHTML = `0${index + 1}<span> / 0${heroSlides.length}</span>`;

    // Fade in
    heroImage.style.opacity = 1;
    heroTitle.style.opacity = 1;
    heroDesc.style.opacity = 1;
  }, 300);
}

document.getElementById('ed-hero-next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  updateHero(currentSlide);
});

document.getElementById('ed-hero-prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  updateHero(currentSlide);
});

// Auto-play
setInterval(() => {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  updateHero(currentSlide);
}, 6000);
