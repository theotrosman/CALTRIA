// ─── LETTER FORM EXPERIENCE ─────────────────────────────────────

// Elements
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const mailbox = document.getElementById('mailbox');
const letterSuccess = document.getElementById('letterSuccess');
const sendBtn = document.getElementById('sendLetter');
const currentDateEl = document.getElementById('currentDate');

// Form data
const formData = {
  empresa: '',
  industria: '',
  tamaño: '',
  proceso: '',
  situacion: '',
  problema: '',
  presupuesto: '',
  email: '',
  telefono: '',
  nombre: ''
};

// Initialize
function init() {
  setCurrentDate();
  setupInputListeners();
  setupEnvelopeInteraction();
  setupSendButton();
}

// Set current date
function setCurrentDate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('es-ES', options);
  if (currentDateEl) {
    currentDateEl.textContent = dateString;
  }
}

// Setup envelope interaction
function setupEnvelopeInteraction() {
  // Auto-open envelope on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !envelope.classList.contains('opening')) {
        setTimeout(() => {
          openEnvelope();
        }, 500);
      }
    });
  }, { threshold: 0.3 });

  if (envelope) {
    observer.observe(envelope);
  }

  // Also allow click to open
  envelope?.addEventListener('click', openEnvelope);
}

// Open envelope and show letter
function openEnvelope() {
  if (envelope.classList.contains('opening')) return;
  
  envelope.classList.add('opening');
  
  setTimeout(() => {
    letter.classList.add('visible');
  }, 600);
}

// Setup input listeners
function setupInputListeners() {
  const inputs = document.querySelectorAll('.letter__input, .letter__select');
  
  inputs.forEach(input => {
    // Update form data on change
    input.addEventListener('input', (e) => {
      const field = e.target.dataset.field;
      formData[field] = e.target.value;
      
      // Add filled class
      if (e.target.value) {
        e.target.classList.add('filled');
      } else {
        e.target.classList.remove('filled');
      }
      
      // Check if form is complete
      checkFormCompletion();
    });

    // Focus effect
    input.addEventListener('focus', (e) => {
      e.target.parentElement.style.borderBottomColor = 'var(--color-primary)';
    });

    input.addEventListener('blur', (e) => {
      if (!e.target.value) {
        e.target.parentElement.style.borderBottomColor = '';
      }
    });
  });
}

// Check if form is complete
function checkFormCompletion() {
  const requiredFields = ['empresa', 'industria', 'tamaño', 'proceso', 'email', 'nombre'];
  const isComplete = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
  
  if (sendBtn) {
    sendBtn.disabled = !isComplete;
  }
}

// Setup send button
function setupSendButton() {
  sendBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (sendBtn.disabled) return;
    
    // Disable button
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    
    try {
      // Send email
      await sendEmail();
      
      // Animate letter going into envelope
      setTimeout(() => {
        animateSendSequence();
      }, 500);
      
    } catch (error) {
      console.error('Error sending letter:', error);
      alert('Hubo un error al enviar la carta. Por favor intenta nuevamente.');
      sendBtn.disabled = false;
      sendBtn.textContent = 'Enviar carta';
    }
  });
}

// Send email function
async function sendEmail() {
  const formSubmitURL = 'https://formsubmit.co/caltriasupport@gmail.com';
  
  const formDataToSend = new FormData();
  formDataToSend.append('_subject', `Nueva carta de ${formData.empresa} - Caltria`);
  formDataToSend.append('_template', 'table');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('Empresa', formData.empresa);
  formDataToSend.append('Industria', formData.industria);
  formDataToSend.append('Tamaño', formData.tamaño);
  formDataToSend.append('Proceso', formData.proceso);
  formDataToSend.append('Situación', formData.situacion);
  formDataToSend.append('Problema', formData.problema);
  formDataToSend.append('Presupuesto', formData.presupuesto);
  formDataToSend.append('Email', formData.email);
  formDataToSend.append('Teléfono', formData.telefono);
  formDataToSend.append('Nombre', formData.nombre);
  
  const response = await fetch(formSubmitURL, {
    method: 'POST',
    body: formDataToSend,
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Error sending email');
  }
  
  return response;
}

// Animate send sequence
function animateSendSequence() {
  // 1. Letter slides back into envelope
  letter.classList.add('sending');
  
  setTimeout(() => {
    letter.classList.remove('visible');
    
    // 2. Envelope closes
    setTimeout(() => {
      envelope.classList.remove('opening');
      
      // 3. Show mailbox
      setTimeout(() => {
        mailbox.classList.add('visible');
        
        // 4. Envelope moves to mailbox
        setTimeout(() => {
          envelope.style.transform = 'translateY(200px) scale(0.5)';
          envelope.style.opacity = '0';
          
          // 5. Open mailbox door
          setTimeout(() => {
            mailbox.classList.add('open');
            
            // 6. Envelope enters mailbox
            setTimeout(() => {
              envelope.style.display = 'none';
              
              // 7. Close mailbox
              setTimeout(() => {
                mailbox.classList.remove('open');
                mailbox.classList.add('flag-up');
                
                // 8. Show success message
                setTimeout(() => {
                  mailbox.style.opacity = '0';
                  letterSuccess.classList.add('visible');
                }, 800);
              }, 600);
            }, 400);
          }, 400);
        }, 600);
      }, 400);
    }, 600);
  }, 400);
}

// Initialize on load
if (envelope && letter) {
  init();
}

console.log('%c✉️ Letter Form Ready', 'color: #ff006e; font-size: 14px; font-weight: bold;');
