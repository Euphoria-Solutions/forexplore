export const checkPasswordStrength = (password: string) => {
  const patterns = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    special: /[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]/,
    length: /.{8,}/,
  };

  let criteriaMet = 0;
  for (const pattern of Object.values(patterns)) {
    if (pattern.test(password)) {
      criteriaMet++;
    }
  }

  let strength: string;
  let color: string;
  if (criteriaMet === Object.keys(patterns).length) {
    strength = 'Very Strong';
    color = 'text-green';
  } else if (criteriaMet >= Object.keys(patterns).length / 2) {
    strength = 'Strong';
    color = 'text-green';
  } else if (criteriaMet >= 2) {
    strength = 'Moderate';
    color = 'text-yellow';
  } else {
    strength = 'Weak';
    color = 'text-red';
  }

  return {
    strength,
    color,
  };
};
