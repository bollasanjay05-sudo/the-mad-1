/* One copy of the user's hero slider — the pasted block appeared three times.
   The image paths below point to real artwork bundled with this website. */
const heroSlides = [
 {title:'MAKE IT<br/><em>YOURS.</em>',desc:'Original comic energy, meme culture and custom graphics printed on the pieces you love.',img:'assets/images/summertime-tee.webp',kicker:'THE MAD EDIT / APPAREL',watermark:'APPAREL',floating:'CUSTOM GRAPHICS ↗',category:'Apparel',subcategory:'T-Shirts'},
 {title:'KEEP THE<br/><em>MEMORY.</em>',desc:'Turn your favorite photos into custom frames, acrylic keepsakes and memorable gifts.',img:'assets/images/shadow-box.webp',kicker:'THE MAD EDIT / PHOTO GIFTS',watermark:'FRAMES',floating:'CUSTOM FRAMES ↗',category:'Photo Gifts',subcategory:'Frames'},
 {title:'DRINK IN<br/><em>STYLE.</em>',desc:'Original patterned tumblers and bottles for everyday hydration or event giveaways.',img:'assets/images/tumbler.webp',kicker:'THE MAD EDIT / DRINKWARE',watermark:'DRINKWARE',floating:'CUSTOM TUMBLERS ↗',category:'Drinkware',subcategory:'Tumblers'},
 {title:'WEAR YOUR<br/><em>VIBE.</em>',desc:'Bold prints and fresh original illustrations that speak louder than words.',img:'assets/images/turtle-hoodie.webp',kicker:'THE MAD EDIT / ORIGINAL COMICS',watermark:'ORIGINAL ART',floating:'GRAPHIC HOODIES ↗',category:'Apparel',subcategory:'Hoodies'},
 {title:'FRIDGE<br/><em>GOALS.</em>',desc:'Colorful magnetic photo keepsakes to bring your favorite moments home.',img:'assets/images/magnets.webp',kicker:'THE MAD EDIT / MAGNETS',watermark:'MAGNETS',floating:'CUSTOM MAGNETS ↗',category:'Photo Gifts',subcategory:'Magnets'}
];
let currentSlide=0, slideTimer=null, animationTimer=null;
const heroImage=document.getElementById('ed-hero-photo');
const heroTitle=document.getElementById('ed-hero-title');
const heroDesc=document.getElementById('ed-hero-description');
const heroKicker=document.getElementById('ed-hero-kicker');
const heroWatermark=document.getElementById('ed-hero-watermark');
const heroFloating=document.getElementById('ed-floating-label');
const heroCurrent=document.getElementById('ed-hero-current');
const heroIndex=document.getElementById('ed-hero-index');
function updateHero(index,immediate=false){
 currentSlide=(index+heroSlides.length)%heroSlides.length;
 const slide=heroSlides[currentSlide];
 const apply=()=>{heroImage.src=slide.img;heroImage.alt=`${slide.watermark} custom product photography concept`;heroTitle.innerHTML=slide.title;heroDesc.textContent=slide.desc;heroKicker.textContent=slide.kicker;heroWatermark.textContent=slide.watermark;heroFloating.textContent=slide.floating;heroCurrent.textContent=`${slide.watermark} / 0${currentSlide+1}`;heroIndex.innerHTML=`0${currentSlide+1}<span> / 0${heroSlides.length}</span>`;document.getElementById('ed-hero-progress').style.width=`${100*(currentSlide+1)/heroSlides.length}%`;heroImage.style.opacity='1';heroTitle.style.opacity='1';heroDesc.style.opacity='1';document.querySelectorAll('[data-hero-index]').forEach((el,i)=>el.setAttribute('aria-pressed',String(i===currentSlide)))};
 clearTimeout(animationTimer);
 if(immediate)apply();else{heroImage.style.opacity='0';heroTitle.style.opacity='0';heroDesc.style.opacity='0';animationTimer=setTimeout(apply,220)}
}
function startHeroAutoplay(){clearInterval(slideTimer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.hidden)slideTimer=setInterval(()=>updateHero(currentSlide+1),6000)}
function heroNavigate(direction){updateHero(currentSlide+direction);startHeroAutoplay()}
document.getElementById('ed-hero-next').addEventListener('click',()=>heroNavigate(1));
document.getElementById('ed-hero-prev').addEventListener('click',()=>heroNavigate(-1));
document.getElementById('ed-hero-shop').addEventListener('click',()=>{const slide=heroSlides[currentSlide];window.madStore?.setCategory(slide.category,slide.subcategory);document.getElementById('shop').scrollIntoView({behavior:'smooth'})});
const heroRail=document.getElementById('ed-category-rail');
heroRail.innerHTML=heroSlides.map((s,i)=>`<button type="button" class="ed-tray-tile" data-hero-index="${i}" aria-pressed="${i===currentSlide}"><img src="${s.img}" alt="${s.watermark} preview"><span>${s.watermark}<small>EXPLORE THE EDIT ↗</small></span></button>`).join('');
heroRail.addEventListener('click',e=>{const b=e.target.closest('[data-hero-index]');if(!b)return;updateHero(Number(b.dataset.heroIndex));startHeroAutoplay();document.getElementById('ed-hero-stage').scrollIntoView({behavior:'smooth',block:'center'})});
document.getElementById('ed-hero-stage').addEventListener('mouseenter',()=>clearInterval(slideTimer));
document.getElementById('ed-hero-stage').addEventListener('mouseleave',startHeroAutoplay);
document.addEventListener('visibilitychange',startHeroAutoplay);
updateHero(0,true);startHeroAutoplay();
