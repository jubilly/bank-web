import validateCPF from './valida-cpf.js';
import validateLegalAge from './valida-idade.js';

const validateForm = () => {
	const errors = [
		'valueMissing',
		'typeMismatch',
		'patternMismatch',
		'tooShort',
		'customError'
	];
	
	const messages = {
		nome: {
			valueMissing: "O campo de nome não pode estar vazio.",
			patternMismatch: "Por favor, preencha um nome válido.",
			tooShort: "Por favor, preencha um nome válido."
		},
		email: {
			valueMissing: "O campo de e-mail não pode estar vazio.",
			typeMismatch: "Por favor, preencha um email válido.",
			tooShort: "Por favor, preencha um e-mail válido."
		},
		rg: {
			valueMissing: "O campo de RG não pode estar vazio.",
			typeMismatch: "Por favor, preencha um RG válido.",
			tooShort: "O campo de RG não tem caractéres suficientes."   
		},
		cpf: {
			valueMissing: 'O campo de CPF não pode estar vazio.',
			patternMismatch: "Por favor, preencha um CPF válido.",
			customError: "O CPF digitado não existe.",
			tooShort: "O campo de CPF não tem caractéres suficientes." 
		},
		aniversario: {
			valueMissing: 'O campo de data de nascimento não pode estar vazio.',
			customError: 'Você deve ser maior que 18 anos para se cadastrar.'
		},
		termos: {
			valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
		}
	};
	
	const formInptus = document.querySelectorAll('form [required]');
	
	formInptus.forEach(input => {
		input.addEventListener('blur', handleField);
		input.addEventListener('invalid', event => event.preventDefault());
	});
	
	function handleField() {
		const field = this;
		field.setCustomValidity('');
		
		let message = "";
	
		const fieldErroMessage = field.parentNode.querySelector('.mensagem-erro');
	
		if (field.name === 'cpf' && field.value.length >= 11) {
			validateCPF(field);
		}
	
		if(field.name === 'aniversario' && field.value != '') {
			validateLegalAge(field);
		}
	
		errors.forEach(error => {
			if (field.validity[error]) {
	
				if (field.validity.customError) {
					message = field.validationMessage;
					return;
				}
	
				message = messages[field.name][error];
			}
		});
	
		const isInputValid = field.checkValidity();
		if (!isInputValid) {
			fieldErroMessage.textContent = message;
		} else {
			fieldErroMessage.textContent = '';
		}
	
	}
}

validateForm();

const sendForm = () => {
	const form = document.querySelector('[data-formulario]');

	form.addEventListener('submit', event => {
		event.preventDefault();

		const response = {
			name: event.target.elements['nome']?.value,
			email: event.target.elements['email']?.value,
			rg: event.target.elements['rg']?.value,
			cpf: event.target.elements['cpf']?.value,
			birthday: event.target.elements['aniversario']?.value,
		}

		const data = JSON.stringify(response);
		localStorage.setItem('register', data);

		setTimeout(() => {
			window.location.href = './abrir-conta-form-2.html';
		}, 200);

	});
}


sendForm();

