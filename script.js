'use strict';
const menuButton = document.getElementById('menu-toggle');
const menu = document.getElementById('primary-nav');
function closeMenu(){ menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); }
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape') closeMenu();});
document.getElementById('copyright-year').textContent=String(new Date().getFullYear());

const form=document.getElementById('finance-form');
const stepOne=document.getElementById('step-one');
const stepTwo=document.getElementById('step-two');
const stepIndicator=document.getElementById('step-indicator');
const progressOne=document.getElementById('progress-1');
const progressTwo=document.getElementById('progress-2');
const status=document.getElementById('form-message');
function clearMessage(){status.textContent='';status.classList.remove('is-error');}
function validFields(fieldset){
  clearMessage();
  const fields=[...fieldset.querySelectorAll('[required]')];
  for(const field of fields){
    field.setAttribute('aria-invalid',String(!field.checkValidity()));
    if(!field.checkValidity()){
      status.textContent='Please complete the highlighted fields to continue.';
      status.classList.add('is-error');
      field.reportValidity(); field.focus(); return false;
    }
  }
  return true;
}
function gotoStep(n){
  stepOne.hidden=n!==1; stepTwo.hidden=n!==2;
  stepIndicator.textContent='STEP 0'+n+' / 02';
  progressOne.classList.toggle('is-active',n===1);
  progressTwo.classList.toggle('is-active',n===2);
  clearMessage();
  const focusable=n===1?document.getElementById('policy-type'):document.getElementById('contact-name');
  focusable.focus({preventScroll:true});
  document.getElementById('request').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
document.getElementById('continue-button').addEventListener('click',()=>{if(validFields(stepOne)) gotoStep(2);});
document.getElementById('back-button').addEventListener('click',()=>gotoStep(1));
for (const link of document.querySelectorAll('[data-policy]')){
  link.addEventListener('click',()=>{document.getElementById('policy-type').value=link.dataset.policy;});
}
for (const link of document.querySelectorAll('[data-role]')){
  link.addEventListener('click',()=>{document.getElementById('contact-role').value=link.dataset.role;});
}
function cleaned(input,max){return String(input||'').replace(/[\r\n\t]+/g,' ').trim().slice(0,max);}
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!validFields(stepOne)){gotoStep(1);return;}
  if(!validFields(stepTwo))return;
  const values=Object.fromEntries(new FormData(form).entries());
  const money=Number(values.premium);
  if(!Number.isFinite(money)||money<=0){gotoStep(1);status.textContent='Enter a valid positive premium amount.';status.classList.add('is-error');return;}
  const lines=[
    'Hello AMCO team,','',
    'I would like to request a preliminary insurance premium financing review.','',
    'POLICY DETAILS',
    'Policy type: '+cleaned(values.policyType,80),
    'State: '+cleaned(values.policyState,35),
    'Estimated total premium: '+new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(money),
    'Effective date: '+cleaned(values.effectiveDate,20),'',
    'CONTACT DETAILS',
    'Contact: '+cleaned(values.contactName,100),
    'Email: '+cleaned(values.email,160),
    'Role: '+cleaned(values.contactRole,70),
    'Organization: '+cleaned(values.organization,140),
    'Additional question: '+cleaned(values.note,350),'',
    'This is an inquiry, not a formal application or financing approval.','',
    'Prepared through the AMCO website. No request has been submitted automatically.'
  ];
  const subject='AMCO premium finance inquiry: '+cleaned(values.policyType,65);
  const url='mailto:info@amcopremium.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
  status.textContent='Your email app should open with a prepared request. Review it, then send it to AMCO. Nothing has been submitted automatically.';
  status.classList.remove('is-error');
  window.location.href=url;
});