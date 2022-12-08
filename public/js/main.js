var imageUrl;

function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';
  document.querySelector('.btn-download').disabled = true;

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

function download() {
  const a = document.createElement('button');
  a.href = imageUrl;
  a.download = imageUrl.split('/').pop() + 'jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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

    imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
    document.querySelector('#img-download').href = imageUrl;
    document.querySelector('.btn-download').disabled = false;

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
