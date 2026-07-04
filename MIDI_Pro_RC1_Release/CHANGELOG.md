# Changelog

All notable changes to MIDI Pro are documented here. Versions before RC1 are
grouped by milestone rather than a strict version number, since the plugin
identity and public API were still being established.

## RC1 — Feature Freeze

**Package SHA-256:** `6852f4be33778290fbd1f3fd2eaac6cdc5a9b46e811b619b7c31dca1d005b0e6`
**Executable SHA-256:** `94c3906ad12a63ac294fd06315ec611d0ecd87ea1100180c8bdf9ae6751ce32a`

Public API frozen from this point forward: action IDs, connector IDs, state
IDs, event IDs, the Runtime Telemetry naming convention, and the MIDI Learn
state set. Only bug fixes are permitted against this baseline.

### Fixed (Release Readiness Audit)
- Action display name corrected: `Midi Note` → `MIDI Note`, for consistency
  with every other MIDI-prefixed name in the plugin.
- `MIDI Dial Changed` event's format string brought in line with the other
  four events' phrasing (`"MIDI Pro sent Dial '$val'"`).
- Documentation naming drift corrected: the connector is `Rotary CC Comp`,
  not `Rotary Comp`, in the User Guide and PDF.
- Support email typo corrected in the Settings page description.

### Verified, not changed (flagged for a future decision)
- CC Fader / Rotary Dial's `deadzone` field internally drives Center Zone
  behavior, not a dead zone — the label is correct, the field ID is a
  misnomer inherited from an earlier design. Renaming the ID would reset
  any already-configured connector's saved value, so it was left as-is
  pending an explicit decision.
- Repeat-capability asymmetry across Note (none) / CC (separate Repeat
  Mode + Rate fields) / Program Change (folded into the Mode dropdown) —
  three different patterns for a related concept, likely intentional
  per-protocol but not unified.

### Added
- MIDI Learn robustness verified against Running Status, SysEx, MIDI
  Clock, Active Sensing, Start/Continue/Stop, and System Reset — all
  filtered at the driver level, with a 12-case defense-in-depth fuzz test
  added to the regression suite confirming zero crashes and zero
  false-positive captures.

## Runtime Telemetry — Connector Extension

- Extended the TX Runtime State Publisher to all 8 connectors (CC Fader,
  CC Comp, Rotary Dial, Rotary CC Comp, Pitch Bend Slider/Dial, Program
  Change Slider/Dial). Every connector now has a Name field and publishes
  into the same `tx.*` state families as the button actions.
- Extracted the publisher into a shared `TxPublisher` module
  (`src/txPublisher.js`) so buttons and connectors hold the *same*
  instance — the Dial position accumulator is genuinely shared: a button
  and a connector using the same Name advance one counter, not two.

## Runtime Telemetry — Canonical API Cleanup

- Removed every legacy/bare-form state ID (`tx.note.<name>`,
  `tx.cc.<name>.on`, `tx.dial.<name>.dir`, etc.) in favor of a single,
  property-based canonical form (`tx.note.<name>.state`,
  `tx.cc.<name>.value`, `tx.dial.<name>.direction`, and so on). This was
  done deliberately before the RC1 freeze, while no external users existed
  yet, specifically so the frozen API would be the clean one.
- Added `TX_STATE_REFERENCE.md` as the authoritative frozen state/event
  reference.

## Runtime Telemetry — Full Context & Events

- Expanded `tx.last.*` from 5 states to 13, adding per-protocol context
  (`.note`, `.velocity`, `.state`, `.cc`, `.program`, `.pitchbend`,
  `.direction`) alongside the common set (`.name`, `.type`, `.value`,
  `.time`, `.port`, `.channel`).
- Added the five TX Events (MIDI Note/CC/Pitch Bend/Program Change Sent,
  MIDI Dial Changed) — one event per protocol, each resolving `$val` to
  `tx.last.name`. Verified every event fires only after its associated
  state updates complete.

## TX Runtime State Publisher — Introduced

- The flagship feature: any send action given a Name automatically
  publishes live Touch Portal states the instant it transmits, with no
  external MIDI feedback loop required.
- MIDI Learn extended with device name, compact display string, full
  multi-line summary (including raw hex bytes), and capture timestamp.

## RC1 Candidate 3 — Permanent Identity

- Plugin namespace changed from `com.sfx.midipro` to
  `com.printerlight.midipro` — the permanent identity, chosen specifically
  to avoid a second breaking rename after users begin building pages
  against it.
- Executable renamed `SFXMidiBridge.exe` → `MidiProHost.exe`.
- Publisher/author changed to PrinterLight throughout.

## RC1 Candidate 2 — Blocker Fixes

- **Fixed:** CC Comp / Rotary CC Comp connectors failed to save in Touch
  Portal — traced to exceeding a safe field-count threshold; trimmed by
  removing two dead fallback fields.
- **Fixed:** CC Relative (CW/CCW) button sent computed values instead of
  the user's configured CC/Value/Channel — root cause was routing through
  a generic tick-based handler that never read the literal Value field.
  Rebuilt to send exactly what's configured, on press (CW) and release
  (CCW).
- Full port-field audit across every action and connector; parity
  confirmed between `entry.tp` and the backend's field registration
  tables.

## RC1 Candidate 1 — Initial Stabilization

- Namespace rebrand, MIDI Learn input-dropdown fix (four input action
  port IDs were missing from backend field registration, leaving their
  dropdowns permanently empty), initial regression suite established.
