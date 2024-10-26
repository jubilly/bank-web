const handleRepeatedNumbers = (cpf) => {
	const numbers = [
		'00000000000',
		'11111111111',
		'22222222222',
		'33333333333',
		'44444444444',
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999',
	];
	return numbers.includes(cpf);
};

const handleFirstDig = (cpf) => {
	let sum = 0;
	let multiple = 10;
	for (let size = 0; size < 9; size ++) {
		sum += cpf[size] * multiple;
		multiple--;
	}
	sum = (sum * 10) % 11;

	if (sum === 10 || sum === 11) {
		sum = 0;
	}

	return sum != cpf[9];
}

const handleSecondDig = (cpf) => {
	let sum = 0;
	let multiple = 11;
	for (let size = 0; size < 10; size ++) {
		sum += cpf[size] * multiple;
		multiple--;
	}
	sum = (sum * 10) % 11;

	if (sum === 10 || sum === 11) {
		sum = 0;
	}

	return sum != cpf[10];
}

export default function validateCPF(input) {
	const cpf = input.value.replace(/\.|-/g, '');
	if (handleRepeatedNumbers(cpf) || handleFirstDig(cpf) || handleSecondDig(cpf)) {
		input.setCustomValidity('O CPF não é válido');
	}

}