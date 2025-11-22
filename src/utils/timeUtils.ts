/**
 * Calcula el tiempo restante hasta el próximo domingo a las 00:00 UTC
 * @returns Objeto con las horas, minutos y segundos restantes
 */
export function getTimeUntilNextSunday(): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const currentDay = now.getUTCDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  // Crear una fecha para el próximo domingo a las 00:00 UTC
  const nextSunday = new Date(now);
  nextSunday.setUTCHours(0, 0, 0, 0);

  // Calcular días hasta el próximo domingo
  let daysToAdd;
  if (currentDay === 0) {
    // Si es domingo, verificar si ya pasó las 00:00 UTC
    if (now.getTime() >= nextSunday.getTime()) {
      // Ya pasamos las 00:00 UTC del domingo, esperar 7 días
      daysToAdd = 7;
    } else {
      // Aún no llegamos a las 00:00 UTC, es el mismo día
      daysToAdd = 0;
    }
  } else {
    // No es domingo, calcular días hasta el próximo domingo
    daysToAdd = 7 - currentDay;
  }

  nextSunday.setUTCDate(nextSunday.getUTCDate() + daysToAdd);

  const diff = nextSunday.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

/**
 * Formatea un número para que tenga al menos 2 dígitos (agrega 0 al inicio si es necesario)
 * @param num Número a formatear
 * @returns String con el número formateado
 */
export function padTimeUnit(num: number): string {
  return String(num).padStart(2, "0");
}
