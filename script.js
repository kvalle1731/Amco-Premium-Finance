
'use strict';

const audiences = {
  agencies: {
    kicker: 'FOR THE PROFESSIONALS BEHIND THE POLICY',
    title: 'Give your clients a better way to say <em>yes.</em>',
    description: 'Help clients evaluate premium financing alongside paying in full, while keeping your agency focused on service, placement and growth.',
    benefits: ['Offer additional payment flexibility', 'Help simplify financing conversations', 'Keep the focus on serving your insureds'],
    action: 'Talk about an agency partnership',
    card: 'Agency partnership', sub: 'Purpose-built support'
  },
  carriers: {
    kicker: 'FOR THE ORGANIZATIONS MOVING INSURANCE FORWARD',
    title: 'Make payment flexibility part of the <em>experience.</em>',
    description: 'Explore a thoughtful approach to premium finance collaboration with carriers, MGAs and insurance distribution partners.',
    benefits: ['Discuss financing at the point of purchase', 'Consider partner-focused operational needs', 'Create a clearer journey for your distribution network'],
    action: 'Discuss a carrier partnership',
    card: 'Carrier collaboration', sub: 'Connected by design'
  },
  insureds: {
    kicker: 'FOR THE PEOPLE PROTECTING WHAT MATTERS',
    title: 'Your coverage matters. So does your <em>cash flow.</em>',
    description: 'Understand how eligible insurance premiums may be paid over time, rather than all at once, through a formal financing agreement.',
    benefits: ['Learn the basics in plain language', 'Understand the role of a down payment', 'Know what to review before signing an agreement'],
    action: 'Ask about financing',
    card: 'Policyholder options', sub: 'Clarity comes first'
  }
};

const tabs = [...document.querySelectorAll('.audience-tab')];
function activateAudience(name, focus = false) {
  const data = audiences[name];
  if (!data) return;
  tabs.forEach(tab => {
    const selected = tab.dataset.audience === name;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  const panel = document.getElementById('audience-panel');
  panel.setAttribute('aria-labelledby', `tab-${name}`);
  document.getElementById('audience-kicker').textContent = data.kicker;
  document.getElementById('audience-title').innerHTML = data.title;
  document.getElementById('audience-description').textContent = data.description;
  document.getElementById('audience-benefits').replaceChildren(...data.benefits.map(value => {
    const li = document.createElement('li'); li.textContent = value; return li;
  }));
  document.getElementById('audience-link').innerHTML = `${data.action} <span aria-hidden="true">↗</span>`;
  document.querySelector('.art-person strong').textContent = data.card;
  document.querySelector('.art-person small').textContent = data.sub;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateAudience(tab.dataset.audience));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    activateAudience(tabs[next].dataset.audience, true);
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  mainNav.classList.toggle('is-open', !expanded);
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

document.getElementById('year').textContent = new Date().getFullYear();
const premium = document.getElementById('premium');
const downPayment = document.getElementById('down-payment');
const installments = document.getElementById('installments');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
function updateCalculator() {
  const amount = Math.max(0, Math.min(10000000, Number(premium.value) || 0));
  const upfront = amount * Number(downPayment.value) / 100;
  const balance = amount - upfront;
  document.getElementById('upfront-value').textContent = money.format(upfront);
  document.getElementById('balance-value').textContent = money.format(balance);
  document.getElementById('installment-value').textContent = money.format(balance / Number(installments.value));
}
[premium, downPayment, installments].forEach(el => el.addEventListener('input', updateCalculator));
updateCalculator();

const inquiry = document.getElementById('inquiry-form');
inquiry.addEventListener('submit', event => {
  event.preventDefault();
  if (!inquiry.reportValidity()) return;
  const values = Object.fromEntries(new FormData(inquiry));
  const subject = `AMCO Premium Finance inquiry: ${values.audience}`;
  const body = [
    'Hello AMCO team,', '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organization: ${values.organization || 'Not provided'}`,
    `Interested as: ${values.audience}`, '',
    'Message:', values.message, '',
    'Sent from the AMCO website inquiry form.'
  ].join('\n');
  const url = `mailto:info@amcopremium.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Your email application should open with a prepared message. Please send it there to contact AMCO.';
  window.location.href = url;
});

