# Security Specification: MultiSarv India Firebase Infrastructure

## 1. Data Invariants
1. **User Identity Invariant**: A user's profile (`/users/{userId}`) can only be created by themselves upon authentication, and their roles/permissions cannot be self-escalated.
2. **Leads Invariant**: Leads can be created by any authenticated user registering an inquiry. Only managers or administrators are allowed to view the master list of leads and perform deletions.
3. **Contact Forms Invariant**: Anyone can submit a contact form, but only admins can read or manage these entries.
4. **Blog Posts Invariant**: Anyone can view (get/list) of blogs, but only administrators are legally allowed to create, update, or delete blog articles.
5. **Security Audit Logs Invariant**: System modifications and configurations generate audit log entries. These logs are write-once or read-only for admins and cannot be mutated by standard clients.

---

## 2. The "Dirty Dozen" Malicious Payloads

### Payload 1: Admin Role Hijacking (Privilege Escalation)
* **Goal**: Write an admin role flag on a standard user profile.
* **Path**: `/users/attacker-uid`
* **Payload**: `{"uid": "attacker-uid", "name": "Attacker", "email": "attacker@gmail.com", "role": "admin"}`
* **Expected Result**: `PERMISSION_DENIED` - The role must only be assigned by trusted systems/admins, not by self-registration.

### Payload 2: Spoofed Identity on Lead Creation
* **Goal**: Inject a Lead claiming to be assigned to another agent or using an unverified identity.
* **Path**: `/leads/lead-999`
* **Payload**: `{"id": "lead-999", "name": "Fake Lead", "email": "fake@gmail.com", "assignedTo": "Admin", "status": "qualified"}`
* **Expected Result**: `PERMISSION_DENIED` - The authenticated user must be verified or must not bypass validations.

### Payload 3: Lead Deletion with Standard Auth
* **Goal**: Delete an existing business Lead from the collections.
* **Path**: `/leads/some-lead-id`
* **Operation**: `DELETE`
* **Expected Result**: `PERMISSION_DENIED` - Deletions of lead records are strictly for admin/manager level accounts.

### Payload 4: Arbitrary Blog Article Publication
* **Goal**: Inject a blog post without proper credentials.
* **Path**: `/blogs/malicious-blog`
* **Payload**: `{"id": "malicious-blog", "title": "Hacked!", "snippet": "Hacked", "content": "XYZ", "published": true}`
* **Expected Result**: `PERMISSION_DENIED` - Blog creation requires administrative credentials.

### Payload 5: Contact Forms Listing by Guest User
* **Goal**: Read all user inquiries submitted through contact forms.
* **Path**: `/contactForms`
* **Operation**: `LIST`
* **Expected Result**: `PERMISSION_DENIED` - Standard users or guests cannot browse contact form collections.

### Payload 6: Mutating Cryptographic or Server Timestamp Creation (Leads Bypass)
* **Goal**: Inject synthetic creation days or bypass correct timestamps.
* **Path**: `/leads/lead-timestamp-bypass`
* **Payload**: `{"id": "lead-1", "createdAt": "2000-01-01T00:00:00Z"}`
* **Expected Result**: `PERMISSION_DENIED` - Immutable system fields must conform to request temporal controls.

### Payload 7: Denial of Wallet ID Poisoning (Junk Character Attacks)
* **Goal**: Inject huge, invalid IDs to exhaust resources.
* **Path**: `/leads/VERY_LONG_JUNK_ID_CONTAINING_MORE_THAN_512_CHARACTERS_...`
* **Payload**: `{"id": "junk"}`
* **Expected Result**: `PERMISSION_DENIED` - Invalid ID patterns are blocked by validation rules.

### Payload 8: Mutating Audit Logs with Custom Admin Actions
* **Goal**: Alter system log trails to hide security leaks.
* **Path**: `/auditLogs/log-id`
* **Payload**: `{"action": "ERASED_HISTORY"}`
* **Expected Result**: `PERMISSION_DENIED` - Auditing records are strictly append-only or immutable via client.

### Payload 9: Hijacking Another User's Metadata
* **Goal**: Modify standard settings for an active manager.
* **Path**: `/settings/general-settings`
* **Payload**: `{"unauthorizedField": "leak"}`
* **Expected Result**: `PERMISSION_DENIED` - Strict settings rules verify matching scopes.

### Payload 10: Value Poisoning (Invalid Type Sizes on Leads)
* **Goal**: Update status to an arbitrary string of 500 characters.
* **Path**: `/leads/lead-101`
* **Payload**: `{"status": "VERY_LONG_STATUS_VALUE_THAT_VIOLES_ENUM_..."}`
* **Expected Result**: `PERMISSION_DENIED` - Fields must validate against strict type schemas.

### Payload 11: Email Spoofing Attack
* **Goal**: Trigger an operation using standard OAuth with an unverified email address claiming admin access.
* **Path**: `/users/unverified-auth-uid`
* **Operation**: `WRITE`
* **Expected Result**: `PERMISSION_DENIED` - Standard secure workflows require email verification.

### Payload 12: Blank Reads on Customers Directory (Query Trust Bypass)
* **Goal**: Run query list over users without passing specific document matching.
* **Path**: `/users`
* **Operation**: `LIST`
* **Expected Result**: `PERMISSION_DENIED` - Non-admin accounts must query only their own specific data.
