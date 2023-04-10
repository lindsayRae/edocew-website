document.getElementById('contactSubmitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  let body = formValidate();
  if (body) handleContactSubmit(body);
});

const handleContactSubmit = async (body) => {
  let fail = document.getElementById('formFail');
  try {
    console.log('body', body);
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
    } else {
      fail.classList.remove('d-none');
      fail.innerText =
        'Oops, there was problem sending the email. Please email us directly through your email provider. contact@edocew.com';
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

  let fail = document.getElementById('formFail');

  if (!body.leadFullName || !body.leadEmail || !body.leadMessage) {
    fail.classList.remove('d-none');
    return false;
  } else {
    fail.classList.add('d-none');
    return body;
  }
};
