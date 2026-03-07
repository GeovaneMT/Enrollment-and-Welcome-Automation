const { curso_escolhido, email_aluno, telefone, nome_completo, data_nascimento } = $input.first().json.body

const errors = [];

if (!telefone) errors.push("telefone é necessário");
if (!email_aluno) errors.push("email é necessário");
if (!curso_escolhido) errors.push("curso é necessário");
if (!nome_completo) errors.push("nome_completo é necessário");
if (!data_nascimento) errors.push("data_nascimento é necessário");

if (errors.length > 0) {
  return [
    {
      json: {
        valid: false,
        errors
      }
    }
  ];
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const isValidDate = (date) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();

  return day >= 1 && day <= daysInMonth;
};

const normalizeName = (name) =>
  name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

const normalizePhone = (phone) =>
  phone.replace(/\D/g, '');

const normalizeDate = (date) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
};


if (!isValidEmail(email_aluno)) {
  errors.push("formato de email inválido");
}

if (!isValidPhone(telefone)) {
  errors.push("número de telefone inválido");
}

if (!isValidDate(data_nascimento)) {
  errors.push("formato da data de nascimento inválida (DD/MM/YYYY expected)");
}

const course = curso_escolhido.toLowerCase();

if (!["tech", "business"].includes(course)) {
  errors.push("curso inválido (deve ser Tech ou Business)");
}

if (errors.length > 0) {
  return [
    {
      json: {
        valid: false,
        errors
      }
    }
  ];
}

return [
  {
    json: {
      valid: true,
      data: {
        email: email_aluno.toLowerCase(),
        phone: normalizePhone(telefone),
        name: normalizeName(nome_completo),
        birthDate: normalizeDate(data_nascimento),
        course
      }
    }
  }
];