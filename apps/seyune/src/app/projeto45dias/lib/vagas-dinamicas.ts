/**
 * Sistema de vagas dinâmicas para Black Friday
 * Diminui progressivamente ao longo dos dias
 */

export function getVagasRestantes(): number {
  const today = new Date();

  // Normalizar para meia-noite (ignorar horário)
  today.setHours(0, 0, 0, 0);

  const day = today.getDate();
  const month = today.getMonth(); // 0-indexed (novembro = 10)
  const year = today.getFullYear();

  // Validar que estamos em novembro de 2025
  if (year !== 2025 || month !== 10) {
    // Fora do período da campanha
    return 0;
  }

  // Escassez progressiva baseada no dia
  switch (day) {
    case 25:
      return 12; // Hoje: 12 vagas
    case 26:
      return 8;  // Amanhã: 8 vagas (vendeu 4)
    case 27:
      return 4;  // Quinta: 4 vagas (vendeu mais 4)
    case 28:
      return 2;  // Sexta (último dia): apenas 2 vagas
    default:
      // Antes de 25/11 ou depois de 28/11: mantém 2 vagas
      return day < 25 ? 12 : 2;
  }
}

/**
 * Retorna texto formatado de vagas restantes
 */
export function getTextoVagas(): string {
  const vagas = getVagasRestantes();

  if (vagas === 0) {
    return "Vagas esgotadas";
  }

  if (vagas === 1) {
    return "Resta apenas 1 vaga";
  }

  return `Restam apenas ${vagas} vagas`;
}

/**
 * Verifica se a campanha já encerrou
 */
export function isCampanhaEncerrada(): boolean {
  return getVagasRestantes() === 0;
}
