(() => {
const initialize = (root = document) => {
root.querySelectorAll('[data-variant-select]:not([data-ready])').forEach(select => {
select.dataset.ready = 'true';
select.addEventListener('change', () => {
const section = select.closest('section');
section.querySelector('[data-product-price]').textContent = select.selectedOptions[0].dataset.price;
const button = section.querySelector('[data-add-button]');
if (button) {button.disabled = select.selectedOptions[0].dataset.available !== 'true'; button.textContent = button.disabled ? button.dataset.soldLabel : button.dataset.addLabel;}
const url = new URL(window.location.href); url.searchParams.set('variant', select.value); history.replaceState({}, '', url);
});
});
root.querySelectorAll('[data-finder]:not([data-ready])').forEach(form => {
form.dataset.ready = 'true';
const section = form.closest('section');
const items = section.querySelectorAll('[data-finder-item]');
const status = section.querySelector('[data-finder-status]');
items.forEach(item => { item.hidden = true; });
if (items.length) status.textContent = status.dataset.prompt;
form.addEventListener('submit', event => {
event.preventDefault();
const data = new FormData(form), budget = Math.round(Number(data.get('budget')) * 100);
let count = 0;
items.forEach(item => {
const d = item.dataset;
const match = Number.isFinite(budget) && budget > 0 && d.available === 'true' && d.category === data.get('category') && Number(d.skill) <= Number(data.get('skill')) && d.space === data.get('space') && d.goal === data.get('goal') && Number(d.price) > 0 && Number(d.price) <= budget;
item.hidden = !match;
if (match) count++;
});
status.textContent = count ? `${status.dataset.match} ${count}` : status.dataset.empty;
});
});
root.querySelectorAll('[data-parts-filter]:not([data-ready])').forEach(form => {
form.dataset.ready = 'true';
form.addEventListener('submit', e => { e.preventDefault(); const model = new FormData(form).get('model'); window.location.assign(form.dataset.base + (model ? '/' + encodeURIComponent(model) : '')); });
});
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);}
}), {threshold: 0.08});
root.querySelectorAll('[data-reveal]:not([data-observed])').forEach(el => {
el.dataset.observed = 'true';
if (el.getBoundingClientRect().top > window.innerHeight) {el.classList.add('will-reveal'); observer.observe(el);}
});
}
};
initialize();
document.addEventListener('shopify:section:load', e => initialize(e.target));
})();
