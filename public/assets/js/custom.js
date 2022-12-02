document.getElementById('contactSubmitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  let validated = formValidate();
  if (validated) handleContactSubmit();
});

const handleContactSubmit = async (body) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      const alert = document.getElementById('emailSuccess');
      alert.classList.remove('d-none');
      document.getElementById('emailForm').reset();
      setTimeout(() => {
        alert.classList.add('d-none');
      }, 4000);
    }
  } catch (error) {
    console.log('error', error);
  }
};

const formValidate = () => {
  const body = {
    leadFullName: document.getElementById('fn').value,
    leadEmail: document.getElementById('email').value,
    leadMessage: document.getElementById('message').value,
  };

  const fail = document.getElementById('formFail');

  if (!body.leadFullName || !body.leadEmail || !body.leadMessage) {
    fail.classList.remove('d-none');
    return false;
  } else {
    fail.classList.add('d-none');
    return body;
  }
};
