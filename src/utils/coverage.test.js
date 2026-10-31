import { describe, it, expect } from 'vitest';
import { calculateCoverage } from './coverage';

describe('calculateCoverage', () => {
  it('calculates coverage correctly for 24/7 window', () => {
    const shiftsPerDay = 6;
    const coverageWindow = '24/7';

    // For '24/7', multiplier is 3
    // monthlyShifts = 6 * 30 = 180
    // adminHoursSaved = round(180 * 0.45 * 3) = round(243) = 243
    // incidentAuditCapacity = 180 * 4 = 720

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result).toEqual({
      monthlyShifts: 180,
      adminHoursSaved: 243,
      incidentAuditCapacity: 720
    });
  });

  it('calculates coverage correctly for after-hours window', () => {
    const shiftsPerDay = 4;
    const coverageWindow = 'after-hours';

    // For 'after-hours', multiplier is 1.5
    // monthlyShifts = 4 * 30 = 120
    // adminHoursSaved = round(120 * 0.45 * 1.5) = round(81) = 81
    // incidentAuditCapacity = 120 * 4 = 480

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result).toEqual({
      monthlyShifts: 120,
      adminHoursSaved: 81,
      incidentAuditCapacity: 480
    });
  });

  it('calculates coverage correctly for business-hours window', () => {
    const shiftsPerDay = 2;
    const coverageWindow = 'business-hours';

    // For 'business-hours', multiplier is 1
    // monthlyShifts = 2 * 30 = 60
    // adminHoursSaved = round(60 * 0.45 * 1) = round(27) = 27
    // incidentAuditCapacity = 60 * 4 = 240

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result).toEqual({
      monthlyShifts: 60,
      adminHoursSaved: 27,
      incidentAuditCapacity: 240
    });
  });

  it('handles zero shifts per day', () => {
    const shiftsPerDay = 0;
    const coverageWindow = '24/7';

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result).toEqual({
      monthlyShifts: 0,
      adminHoursSaved: 0,
      incidentAuditCapacity: 0
    });
  });

  it('defaults to multiplier 1 for unknown coverage window', () => {
    const shiftsPerDay = 5;
    const coverageWindow = 'unknown-window';

    // If unknown, multiplier defaults to 1
    // monthlyShifts = 5 * 30 = 150
    // adminHoursSaved = round(150 * 0.45 * 1) = round(67.5) = 68
    // incidentAuditCapacity = 150 * 4 = 600

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result).toEqual({
      monthlyShifts: 150,
      adminHoursSaved: 68,
      incidentAuditCapacity: 600
    });
  });

  it('correctly rounds admin hours saved', () => {
    const shiftsPerDay = 1; // 30 monthly shifts
    const coverageWindow = 'after-hours'; // multiplier 1.5

    // monthlyShifts = 30
    // adminHoursSaved = 30 * 0.45 * 1.5 = 20.25 -> round to 20

    const result = calculateCoverage(shiftsPerDay, coverageWindow);

    expect(result.adminHoursSaved).toBe(20);
  });
});
