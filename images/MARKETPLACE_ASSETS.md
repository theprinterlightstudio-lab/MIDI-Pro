# MIDI Pro — Marketplace Assets

**A note before anything else:** the "MCU examples" item on the Marketplace
Assets list doesn't belong here. I checked `entry.tp` directly — this plugin
has zero MCU (Mackie Control Universal) functionality and zero Sequencer
functionality. Those terms have been quietly riding along in several
planning-document checklists for a while now (the Hardware Validation
Matrix, the RC1 Feature Freeze checklist, and now this one), but they
actually belong to a completely different, separate Stream Deck plugin from
earlier in this project's history — one you explicitly told me to discard
weeks ago ("discard the last prompt it was supposed to be for Streamdeck
Plugin not touch portal"). I've dropped both from everything below. Worth a
quick look through your own notes in case that contamination shows up
anywhere else before release.

---

## Short Description

*(For the marketplace summary line / search result snippet — one or two
sentences.)*

> Bidirectional MIDI control for Touch Portal — send notes, CC, pitch bend
> and program changes, then watch every transmission come alive on screen
> through real-time runtime telemetry.

**Alternate, slightly shorter:**

> Send and monitor MIDI from Touch Portal, with live on-screen feedback for
> every button, slider, and dial — no external MIDI feedback required.

---

## Long Description

**MIDI Pro** turns Touch Portal into a full bidirectional MIDI control
surface. Press a button, and it sends a real MIDI message to your DAW,
synth, or any MIDI-listening software. Move a slider, and it sends
continuous CC, pitch bend, or program change values. That much you'd expect
from a MIDI plugin.

What sets MIDI Pro apart is what happens next: **every named control
publishes its own live state back into Touch Portal**, instantly. No
external MIDI feedback loop, no round-trip through your DAW required. Name
a fader "Volume," move it, and `tx.cc.volume.value` updates immediately —
ready to drive a gauge, a button icon, or a text readout anywhere on your
page.

**Built for musicians and performers**, not just generic automation:

- **Seven send actions** covering Note, CC, CC Relative (independent
  clockwise/counter-clockwise encoder emulation), Pitch Bend, Program
  Change, and an emergency All-Notes-Off Panic button.
- **Eight connectors** — sliders and dials for continuous control, with
  independent up/down or clockwise/counter-clockwise packet assignment for
  full encoder emulation, plus adjustable sensitivity and dead-zone control.
- **MIDI Learn** — point it at any incoming MIDI message and get back a
  complete readable breakdown: type, channel, note/CC/program number,
  value, raw hex bytes, source device, and timestamp. Diagnose an unlabeled
  controller in minutes.
- **Runtime Telemetry** — the headline feature. Every named action and
  connector publishes persistent Touch Portal states the instant it fires,
  plus five generic events (one per MIDI message type) for automation that
  reacts to *any* transmission of a given kind.
- **Six button modes** covering everything from one-shot trigger pulses to
  true press-and-hold behavior to alternating toggle switches, with
  optional Repeat-While-Held on CC and Program Change.

Whether you're triggering samples, riding a virtual fader, building a
patch browser, or wiring up a live performance rig, MIDI Pro gives you both
the MIDI messages and the on-screen feedback to match — using Touch
Portal's own native automation tools, no extra software required.

---

## Feature List

*(Short bulleted form for a features tab/section.)*

- Send MIDI Note, CC, Pitch Bend, and Program Change messages
- CC Relative (CW/CCW) button for independent-direction encoder emulation
- Six configurable button modes: On/Off, On Only, Off Only, Hold,
  Momentary, Toggle
- Optional Repeat-While-Held on CC and Program Change actions
- Eight slider/dial connectors for continuous CC, Pitch Bend, and Program
  Change control
- Absolute and Relative connector modes with adjustable sensitivity
- Independent Up/Down (or CW/CCW) packet assignment on Comp connectors,
  with Center Zone and Dead Zone control
- MIDI Learn diagnostic tool — full message breakdown including raw hex
  and source device
- Runtime Telemetry: live per-control states for every named action and
  connector, no external feedback loop needed
- Five generic TX events for building automation that reacts to any
  transmission of a given MIDI type
- Panic / All Notes Off emergency stop
- Automatic MIDI port hot-plug detection

---

## Release Notes — RC1

**MIDI Pro RC1** is the first public release candidate.

**What's included:**

- Full send-action set: Midi Note, Control Change, CC Relative, Pitch
  Bend, Program Change, Panic
- Full connector set: CC Fader, CC Comp, Rotary Dial, Rotary CC Comp,
  Pitch Bend Slider/Dial, Program Change Slider/Dial
- MIDI Learn with complete diagnostic state output
- Runtime Telemetry: persistent per-control states and five TX events
- Automatic port detection with hot-plug support

**What to expect next:** this is a release *candidate* — the public
action, connector, state, and event API is now frozen and will not change
except for bug fixes. Remaining work before final release is hardware
validation, packaging verification, and documentation polish, not new
features.

**Feedback:** if something doesn't behave the way this guide describes,
that's a bug report, not a feature request — please flag it.
