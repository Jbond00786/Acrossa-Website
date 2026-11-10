export const calculateCoverage = (shiftsPerDay, coverageWindow) => {
  let multiplier = 1;
  if (coverageWindow === '24/7') multiplier = 3;
  if (coverageWindow === 'after-hours') multiplier = 1.5;
  if (coverageWindow === 'business-hours') multiplier = 1;

  const monthlyShifts = shiftsPerDay * 30;
  const adminHoursSaved = Math.round(monthlyShifts * 0.45 * multiplier);
  const incidentAuditCapacity = monthlyShifts * 4;

  return {
    monthlyShifts,
    adminHoursSaved,
    incidentAuditCapacity
  };
};
