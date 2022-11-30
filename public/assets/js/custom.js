document.getElementById('contactSubmitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  handleContactSubmit();
});

const handleContactSubmit = async () => {
  const body = {
    leadFullName: document.getElementById('fn').value,
    leadEmail: document.getElementById('email').value,
    leadMessage: document.getElementById('message').value,
  };
  console.log(body);
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
      document.getElementById('emailForm').reset();
    }
  } catch (error) {
    console.log('error', error);
  }
};
