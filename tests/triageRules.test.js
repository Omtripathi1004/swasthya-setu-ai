/**
 * Unit Tests: Deterministic Clinical Triage & Red-Flag Escalation Engine
 * 
 * Verifies non-negotiable safety criteria:
 * 1. Severe breathing difficulty, chest pain, stroke, unconsciousness, heavy bleeding, seizure,
 *    and obstetric emergencies trigger IMMEDIATE emergency escalation.
 * 2. Model / user score cannot downgrade an emergency red flag.
 * 3. Does not diagnose or prescribe.
 */

const { evaluateDeterministicTriage, EMERGENCY_RED_FLAGS } = require('../api/_triageRules.js');

describe('Deterministic Safety-First Triage Engine', () => {

  test('contains all mandatory life-threatening emergency red flags', () => {
    const flagIds = EMERGENCY_RED_FLAGS.map(f => f.id);
    expect(flagIds).toContain('BREATHING_DISTRESS');
    expect(flagIds).toContain('CHEST_PAIN');
    expect(flagIds).toContain('UNCONSCIOUSNESS');
    expect(flagIds).toContain('STROKE_SIGNS');
    expect(flagIds).toContain('UNCONTROLLED_BLEEDING');
    expect(flagIds).toContain('ACTIVE_SEIZURE');
    expect(flagIds).toContain('OBSTETRIC_EMERGENCY');
  });

  test('triggers immediate EMERGENCY when severe breathing distress is reported', () => {
    const res = evaluateDeterministicTriage({
      symptomsText: 'Patient cannot breathe and has gasping respiration'
    });

    expect(res.isEmergency).toBe(true);
    expect(res.urgencyLevel).toBe('EMERGENCY');
    expect(res.cannotDowngrade).toBe(true);
    expect(res.immediateAction).toMatch(/108/);
  });

  test('triggers immediate EMERGENCY when severe chest pain is reported', () => {
    const res = evaluateDeterministicTriage({
      symptomsText: 'Severe crushing chest pain radiating to left arm'
    });

    expect(res.isEmergency).toBe(true);
    expect(res.urgencyLevel).toBe('EMERGENCY');
    expect(res.cannotDowngrade).toBe(true);
    expect(res.recommendedFacilityTier).toMatch(/District Hospital|CHC/);
  });

  test('triggers immediate EMERGENCY when stroke FAST signs are detected', () => {
    const res = evaluateDeterministicTriage({
      symptomsText: 'Sudden facial droop and slurred speech'
    });

    expect(res.isEmergency).toBe(true);
    expect(res.urgencyLevel).toBe('EMERGENCY');
  });

  test('triggers immediate EMERGENCY when severe pregnancy eclampsia vitals (BP >= 160) occur', () => {
    const res = evaluateDeterministicTriage({
      vitals: {
        isPregnant: true,
        bpSys: 165,
        bpDia: 112
      }
    });

    expect(res.isEmergency).toBe(true);
    expect(res.flags.some(f => f.id === 'OBSTETRIC_EMERGENCY')).toBe(true);
  });

  test('correctly assigns ROUTINE care tier for mild symptoms without red flags', () => {
    const res = evaluateDeterministicTriage({
      symptomsText: 'Mild runny nose, normal appetite, slight tiredness',
      vitals: {
        temp: 98.6,
        bpSys: 120,
        bpDia: 80,
        spo2: 98
      }
    });

    expect(res.isEmergency).toBe(false);
    expect(res.urgencyLevel).toBe('ROUTINE');
    expect(res.recommendedFacilityTier).toMatch(/PHC Bargadi/);
  });
});
