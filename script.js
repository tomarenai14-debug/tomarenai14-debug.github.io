// Heroフェードイン
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  hero.classList.add('visible');
});

// カードのスクロールフェードイン
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      card.classList.add('visible');
    }
  });
});


