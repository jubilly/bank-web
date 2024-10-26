const handleCamera = () => {
	const buttonStartCamera = document.querySelector('[data-video-botao]');
	const fieldCamera = document.querySelector('[data-camera]');
	const video = document.querySelector('[data-video]');

	buttonStartCamera.addEventListener('click', async function () {
		const camera = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

		const active = camera.active;

		if (!active) return;

		buttonStartCamera.style.display = 'none';
		fieldCamera.style.display = 'block';
		video.srcObject = camera;

	});

	const buttonCapturePicture = document.querySelector('[data-tirar-foto]');
	const canvas = document.querySelector('[data-video-canvas]');
	const message = document.querySelector('[data-mensagem]');

	let imageURL = '';
	

	buttonCapturePicture.addEventListener('click', function () {
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		imageURL = canvas.toDataURL('image/jpeg');
		fieldCamera.style.display = 'none';
		message.style.display = 'block';
	});


	const buttonSendPicture = document.querySelector('[data-enviar]');

	buttonSendPicture.addEventListener('click', () => {

		const personalData = localStorage.getItem('register');
		const parsedData = JSON.parse(personalData);

		parsedData.image = imageURL;

		localStorage.setItem('register', JSON.stringify(parsedData));

		window.location.href = '../pages/abrir-conta-form-3.html';

	});

}



handleCamera();