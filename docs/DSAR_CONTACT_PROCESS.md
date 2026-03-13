# DSAR Contact Process — Siargao Finder

## Scope
This process handles Data Subject Access Requests (DSAR) submitted via:
- `/data-rights-request` form
- direct email to `info@siargaofinder.com`

## Intake Channels
1. **Web form** (`POST /api/data-requests`)
   - Required: full name, email, request type
   - Request types: access, deletion, portability, correction
   - Stored in `data_subject_requests` (when table exists)
   - Notification email sent to `info@siargaofinder.com` when Resend is configured

2. **Email fallback**
   - If form/API unavailable, users can email `info@siargaofinder.com`

## Operational Workflow
1. **Acknowledge receipt** within 72 hours.
2. **Verify identity** before disclosing/changing personal data.
3. **Classify request type** (access/deletion/portability/correction).
4. **Collect relevant records** from auth/profile/listing-related tables.
5. **Execute action**:
   - Access: provide copy/summary of personal data
   - Deletion: erase where legally allowed and confirm completion
   - Portability: provide machine-readable export
   - Correction: update inaccurate data
6. **Respond within 30 days** (or notify extension with reason, if required by law).
7. **Log resolution** in admin notes/ticket with date, action, and owner.

## Admin Ownership
- Primary owner: `amira.01072023@gmail.com`
- Contact mailbox: `info@siargaofinder.com`

## Evidence to retain
- Request timestamp
- Identity verification outcome
- Data sources checked
- Final action taken + date

## Failure/Degraded Mode
If both DB insert and email delivery are unavailable:
- API returns unavailable error.
- User should be instructed to contact `info@siargaofinder.com` directly.

