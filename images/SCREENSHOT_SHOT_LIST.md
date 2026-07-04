# Screenshot Shot List

**Why this is a shot list and not actual screenshots:** a marketplace
screenshot has to be a real capture of the plugin running inside Touch
Portal's actual interface. I have no way to run Touch Portal or produce a
genuine capture of it — anything I generated to *look like* a screenshot
would be a fabrication, which is exactly the wrong thing to put in front of
buyers deciding whether to trust the listing. What I can do is tell you
precisely what to capture and why, so the real screenshots take you
minutes instead of guesswork.

Suggested minimum width: **1200px** (matches common marketplace/asset-store
screenshot conventions; Touch Portal itself doesn't publish a mandatory
pixel spec since plugins are typically distributed via GitHub/community
hub rather than a strict app-store submission flow).

---

## 1. Feature Screenshots (2–3 images)

- **The action list open**, MIDI Pro category expanded, showing all seven
  actions named clearly (Midi Note, Control Change, CC Relative, Pitch
  Bend, Program Change, Panic, MIDI Learn). This is the single most
  important "what do I get" image.
- **A configured Midi Note or CC action's Property Inspector**, with the
  Name field filled in (e.g. "Play") and Mode set to something readable
  like Momentary — shows the field layout newcomers will actually see.
- **A page with a few buttons and one CC Fader connector** laid out
  together, so it reads as a real control surface rather than an empty
  test button.

## 2. Runtime Telemetry Screenshots (2 images)

- **The Touch Portal state picker open**, filtered/scrolled to show the
  `tx.cc.<name>.*` or `tx.note.<name>.*` states for a control you've
  actually named and fired at least once (states only appear after first
  use — fire it before opening the picker).
- **A button's On Event tab** with an `Update Button text…` action added
  and a `tx.*` state selected as its value — this is the one screenshot
  that answers "how do I actually see the value," which is the single
  most common point of confusion for new users.

## 3. MIDI Learn Screenshots (1–2 images)

- **`state.learn.summary` bound to a text display**, right after capturing
  a real message from your gear — ideally showing a genuinely
  identifiable device name, so it doesn't look like a placeholder.
- Optional: the MIDI Learn action's Property Inspector itself, MIDI In
  dropdown showing your real connected devices (proves port detection
  works, without needing to fake a device list).

## 4. Connector Examples (2 images)

- **CC Fader in Absolute mode** next to a bound readout showing a live
  value — reuse the same page from Feature Screenshots if convenient.
- **CC Comp or Rotary CC Comp's Property Inspector**, showing the
  independent Up/Down (or CW/CCW) fields filled in with different values —
  this is the detail that differentiates it from a basic single-CC
  connector and is worth making visible.

---

## Capture tips

- Fire every named control **at least once** before screenshotting its
  states — they don't exist in the state picker until then (see the User
  Guide, "Making a State Show Up on Screen").
- Use a real MIDI port name where possible (a connected device, or a named
  virtual port like `loopMIDI Port 1`) rather than leaving `(none)` — an
  empty-looking port field reads as broken, not as "not yet configured."
- Keep Touch Portal's own theme/chrome as shipped — don't heavily reskin
  the surrounding UI, since buyers are evaluating how it looks in *their*
  actual Touch Portal, not a customized demo environment.
