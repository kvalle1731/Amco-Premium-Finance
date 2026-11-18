'use strict';
const $ = id => document.getElementById(id);
const mobileToggle = $('mobile-toggle');
const nav = $('site-nav');
mobileToggle?.addEventListener('click', () => {
  const opened = mobileToggle.getAttribute('aria-expanded') !== 'true';
  mobileToggle.setAttribute('aria-expanded', String(opened));
  mobileToggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', opened);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded', 'false');
}));
const usd = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', minimumFractionDigits:0, maximumFractionDigits:0}).format(n);
const premium = $('premium-input');
const downRange = $('down-range');
function updateIllustration() {
  const amount = Math.min(10000000, Math.max(0, Number(premium.value) || 0));
  const percent = Number(downRange.value);
  const initial = amount * percent / 100;
  $('down-percent').textContent = `${percent}%`;
  $('down-amount').textContent = usd(initial);
  $('finance-amount').textContent = usd(amount - initial);
  $('down-bar').style.width = percent + '%';
  $('financed-bar').style.width = (100-percent) + '%';
  downRange.style.setProperty('--range-progress', percent + '%');
}
premium?.addEventListener('input', updateIllustration);
downRange?.addEventListener('input', updateIllustration);
updateIllustration();
const audienceItems = [...document.querySelectorAll('.audience-item')];
audienceItems.forEach(item => {
  const button = item.querySelector('.audience-trigger');
  button.addEventListener('click', () => {
    audienceItems.forEach(other => {
      const active = other === item;
      other.classList.toggle('active', active);
      other.querySelector('.audience-trigger').setAttribute('aria-expanded', String(active));
      other.querySelector('.audience-panel').hidden = !active;
      other.querySelector('.audience-indicator').textContent = active ? '↗' : '+';
    });
  });
});
const form = $('finance-form');
const first = $('form-step-one');
const second = $('form-step-two');
const meter = $('meter-fill');
function showStep(step) {
  first.hidden = step !== 1;
  second.hidden = step !== 2;
  $('step-label').textContent = `STEP 0${step} / 02`;
  meter.style.width = step === 1 ? '50%' : '100%';
  if(step === 2) second.querySelector('input').focus({ preventScroll:true });
  form.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth',block:'center'});
}
$('next-step').addEventListener('click', () => {
  const valid = $('field-type').value && $('field-state').value;
  $('step-one-error').hidden = !!valid;
  if (valid) showStep(2);
  else (!$('field-type').value ? $('field-type') : $('field-state')).focus();
});
$('previous-step').addEventListener('click', () => showStep(1));
document.querySelectorAll('[data-audience]').forEach(a => a.addEventListener('click', () => { $('audience-select').value = a.dataset.audience; }));
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.namedItem('name');
  const email = form.elements.namedItem('email');
  const valid = name.value.trim() && email.validity.valid && email.value.trim();
  $('step-two-error').hidden = !!valid;
  if (!valid) {(!name.value.trim() ? name : email).focus();return;}
  const f = new FormData(form);
  const lines = [
    'Hello AMCO Premium Finance,', '',
    'I would like to begin a financing inquiry.', '',
    `Policy type: ${f.get('policyType')}`,
    `State: ${f.get('state')}`,
    `Premium amount: ${f.get('premium') ? usd(Number(f.get('premium'))) : 'Not provided'}`,
    `Policy effective date: ${f.get('effectiveDate') || 'Not provided'}`, '',
    `Name: ${String(f.get('name') || '').trim()}`,
    `Email: ${String(f.get('email') || '').trim()}`,
    `I am a: ${f.get('audience')}`,
    `Company: ${f.get('company') || 'Not provided'}`,
    `Additional note: ${f.get('message') || 'None'}`, '',
    'Please advise on next steps for reviewing financing eligibility and terms.'
  ];
  const subject = 'AMCO Premium Finance | Financing inquiry';
  const mailto = `mailto:info@amcopremium.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  $('form-status').textContent = 'Your email application should open with a prepared inquiry. Please review and send it there. Nothing has been submitted automatically.';
  window.location.href = mailto;
});
$('year').textContent = new Date().getFullYear().toString();