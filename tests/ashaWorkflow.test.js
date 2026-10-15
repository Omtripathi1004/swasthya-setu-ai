/**
 * Unit Tests: ASHA/ANM Frontline Field Workflow & Privacy Compliance
 */

describe('ASHA Field App Privacy & Encounter Architecture', () => {
  function generateSyntheticId() {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `ASHA-ENC-2026-${rand}`;
  }

  function createFieldEncounterDraft({ beneficiaryCode, category, vitals, referralFacility, consentFollowup, isOffline }) {
    const syntheticId = generateSyntheticId();
    
    // Privacy check: reject raw 12-digit numbers (Aadhaar) or 10-digit phone numbers
    if (/\b\d{10,12}\b/.test(beneficiaryCode)) {
      throw new Error('PHI_VIOLATION: Personal identification numbers must not be stored in beneficiary code.');
    }

    return {
      encounter_id: syntheticId,
      beneficiary_code: beneficiaryCode,
      category,
      vitals,
      referral: {
        facility: referralFacility,
        generated_at: new Date().toISOString(),
        disclaimer: 'Field referral guidance slip. Does not replace registered medical prescription.'
      },
      follow_up: consentFollowup ? {
        consent_granted: true,
        type: 'local_in_app_reminder',
        scheduled_for: '2026-10-22'
      } : null,
      sync_status: isOffline ? 'LOCAL_DRAFT_PENDING_SYNC' : 'SYNCED'
    };
  }

  test('generates valid synthetic non-identifying IDs conforming to ASHA-ENC-2026-XXXX format', () => {
    const id = generateSyntheticId();
    expect(id).toMatch(/^ASHA-ENC-2026-\d{4}$/);
  });

  test('blocks personal Aadhaar / phone numbers from being recorded in field records', () => {
    expect(() => {
      createFieldEncounterDraft({
        beneficiaryCode: 'Patient 987654321012',
        category: 'ANC Check',
        vitals: { bp: '120/80' },
        referralFacility: 'CHC BKT',
        isOffline: false
      });
    }).toThrow('PHI_VIOLATION');
  });

  test('properly flags offline drafts as LOCAL_DRAFT_PENDING_SYNC without implying delivered emergency alert', () => {
    const draft = createFieldEncounterDraft({
      beneficiaryCode: 'Beneficiary S.D.',
      category: 'Maternal ANC',
      vitals: { bp: '130/85', hb: '10.4' },
      referralFacility: 'CHC Bakshi Ka Talab',
      consentFollowup: true,
      isOffline: true
    });

    expect(draft.sync_status).toBe('LOCAL_DRAFT_PENDING_SYNC');
    expect(draft.follow_up.consent_granted).toBe(true);
    expect(draft.follow_up.type).toBe('local_in_app_reminder');
    expect(draft.referral.disclaimer).toContain('Field referral guidance slip');
  });
});
