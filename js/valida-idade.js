export default function validateLegalAge(input) {	
	const birthDate = new Date(input.value);
	const isLegal = validateYear(birthDate);
	if (!isLegal) {
		input.setCustomValidity('O usuário é menor de idade');
	}
}

function validateYear(date) {
	const today = new Date();
	const legalAge = new Date(
		date.getUTCFullYear() + 18, 
		date.getUTCMonth(), 
		date.getUTCDate()
	);

	return today >= legalAge;
	
}
