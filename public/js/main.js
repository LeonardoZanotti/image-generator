function onSubmit(e) {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    toggleSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      toggleSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);
    toggleSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function toggleSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.contains('show') ? spinner.classList.remove('show') : spinner.classList.add('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
