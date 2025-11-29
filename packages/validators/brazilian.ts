/**
 * Validadores para dados brasileiros
 *
 * - CPF (Cadastro de Pessoa Física)
 * - Telefone (formato BR)
 * - Idade (18+ anos)
 */

// ============================================================================
// CPF Validation
// ============================================================================

/**
 * Valida CPF brasileiro usando algoritmo oficial
 *
 * @param cpf CPF com ou sem máscara (ex: "123.456.789-10" ou "12345678910")
 * @returns true se válido, false caso contrário
 */
export function validateCPF(cpf: string): boolean {
  // Remover máscaras
  const cleanCPF = cpf.replace(/\D/g, '');

  // CPF deve ter 11 dígitos
  if (cleanCPF.length !== 11) {
    return false;
  }

  // CPFs inválidos conhecidos (todos os dígitos iguais)
  const invalidCPFs = [
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

  if (invalidCPFs.includes(cleanCPF)) {
    return false;
  }

  // Validar dígitos verificadores
  let sum = 0;
  let remainder: number;

  // Validar primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  // Validar segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
}

/**
 * Formata CPF com máscara
 *
 * @param cpf CPF sem máscara
 * @returns CPF formatado (000.000.000-00)
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) {
    return cpf; // Retorna original se inválido
  }

  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Remove máscara do CPF
 *
 * @param cpf CPF com máscara
 * @returns CPF sem máscara (apenas números)
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

// ============================================================================
// Phone Validation (BR)
// ============================================================================

/**
 * Valida telefone brasileiro
 *
 * Formatos aceitos:
 * - (11) 98765-4321 (celular)
 * - (11) 3456-7890 (fixo)
 * - 11987654321
 * - 1134567890
 *
 * @param phone Telefone com ou sem máscara
 * @returns true se válido, false caso contrário
 */
export function validatePhone(phone: string): boolean {
  // Remover máscaras
  const cleanPhone = phone.replace(/\D/g, '');

  // Telefone deve ter 10 (fixo) ou 11 (celular) dígitos
  if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
    return false;
  }

  // DDD deve estar entre 11 e 99
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // Celular (11 dígitos) deve começar com 9
  if (cleanPhone.length === 11) {
    const firstDigit = cleanPhone.charAt(2);
    if (firstDigit !== '9') {
      return false;
    }
  }

  // Fixo (10 dígitos) não pode começar com 9
  if (cleanPhone.length === 10) {
    const firstDigit = cleanPhone.charAt(2);
    if (firstDigit === '9') {
      return false;
    }
  }

  return true;
}

/**
 * Formata telefone com máscara
 *
 * @param phone Telefone sem máscara
 * @returns Telefone formatado
 * - (11) 98765-4321 (celular)
 * - (11) 3456-7890 (fixo)
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length === 11) {
    // Celular: (11) 98765-4321
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  if (cleanPhone.length === 10) {
    // Fixo: (11) 3456-7890
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return phone; // Retorna original se inválido
}

/**
 * Remove máscara do telefone
 *
 * @param phone Telefone com máscara
 * @returns Telefone sem máscara (apenas números)
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// ============================================================================
// Age Validation
// ============================================================================

export interface AgeValidationResult {
  /**
   * true se idade é válida (18-100 anos)
   */
  valid: boolean;

  /**
   * Idade calculada em anos
   */
  age: number;

  /**
   * Mensagem de erro (se inválido)
   */
  error?: string;
}

/**
 * Valida idade mínima (18 anos) e máxima (100 anos)
 *
 * @param birthdate Data de nascimento (YYYY-MM-DD ou Date)
 * @param minAge Idade mínima (padrão: 18)
 * @param maxAge Idade máxima (padrão: 100)
 * @returns Resultado da validação com idade calculada
 */
export function validateAge(
  birthdate: string | Date,
  minAge: number = 18,
  maxAge: number = 100
): AgeValidationResult {
  try {
    const birthDate = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

    // Validar se data é válida
    if (isNaN(birthDate.getTime())) {
      return {
        valid: false,
        age: 0,
        error: 'Data de nascimento inválida',
      };
    }

    // Calcular idade
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajustar se ainda não fez aniversário este ano
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Validar se data não é futura
    if (age < 0) {
      return {
        valid: false,
        age: 0,
        error: 'Data de nascimento não pode ser futura',
      };
    }

    // Validar idade mínima
    if (age < minAge) {
      return {
        valid: false,
        age,
        error: `Idade mínima: ${minAge} anos`,
      };
    }

    // Validar idade máxima
    if (age > maxAge) {
      return {
        valid: false,
        age,
        error: `Idade máxima: ${maxAge} anos`,
      };
    }

    return {
      valid: true,
      age,
    };
  } catch (error) {
    return {
      valid: false,
      age: 0,
      error: 'Erro ao validar data de nascimento',
    };
  }
}

/**
 * Formata data para input[type="date"]
 *
 * @param date Data (Date object ou string)
 * @returns String no formato YYYY-MM-DD
 */
export function formatDateForInput(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return '';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Formata data para exibição (DD/MM/YYYY)
 *
 * @param date Data (Date object ou string YYYY-MM-DD)
 * @returns String no formato DD/MM/YYYY
 */
export function formatDateForDisplay(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return '';
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

// ============================================================================
// Email Validation (Bonus)
// ============================================================================

/**
 * Valida email
 *
 * @param email Email
 * @returns true se válido, false caso contrário
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
