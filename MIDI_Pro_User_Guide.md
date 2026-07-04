# MIDI Pro — Complete User Guide

**A bidirectional MIDI control plugin for Touch Portal, by PrinterLight**

This guide is written for someone who has never used Touch Portal or MIDI Pro
before. If you already know Touch Portal, skip to [Part 2](#part-2--core-concepts).

---

## Part 1 — Absolute Beginner Quick Start

### What this plugin actually does

MIDI Pro turns Touch Portal buttons, sliders, and dials into a MIDI controller.
Press a button on your phone or Stream Deck-style Touch Portal panel, and MIDI
Pro sends a real MIDI message out of your computer to your DAW (Ableton,
Logic, FL Studio, Cubase...), a hardware synth, or any other MIDI-listening
software. It can also **listen** to MIDI coming in, and — its signature
feature — automatically show you on your Touch Portal buttons what was just
sent, without needing your gear to echo anything back.

### Step 1 — You need a MIDI port to talk to

MIDI Pro sends messages to a **MIDI port**. If you own a MIDI keyboard,
controller, or interface, it's already a port. If you don't have hardware yet,
install a free **virtual MIDI cable** so you can test everything on your
computer alone:

- **Windows** — loopMIDI (free, search "loopMIDI Tobias Erichsen")
- **macOS** — built in: Audio MIDI Setup → Window → Show MIDI Studio → IAC Driver → enable it

Once installed, that virtual port shows up in every MIDI Out / MIDI In dropdown
in MIDI Pro, and in your DAW's MIDI input list — so you can send from Touch
Portal straight into your DAW for testing, even with zero hardware.

### Step 2 — Add your first action

1. In Touch Portal, open a page and click a button to edit it.
2. In the Actions list on the left, find **MIDI Pro** and open the category.
3. Drag **Midi Note** onto the button.
4. Set **MIDI Out** to your virtual port (or your real device).
5. Leave everything else at its defaults and press the button in edit mode,
   or go live and press it for real.

If your DAW is listening on that port, you'll see a note come in. That's the
whole loop working.

### Step 3 — Watch it react

Try **MIDI Learn** next (see Part 5) — press a key on your real keyboard, or
send a note from your DAW back into the virtual port, and watch MIDI Pro tell
you exactly what it received. This is the fastest way to understand MIDI
Pro's whole design: it doesn't just send blindly, it can show you everything.

---

## Part 2 — Core Concepts

MIDI Pro has four kinds of building blocks. Understanding the difference
between them is the single most useful thing this guide can teach you.

| Concept | What it is | Example |
|---|---|---|
| **Action** | A button you press. Sends one MIDI message type. | "Midi Note" action on a Play button |
| **Connector** | A slider or dial you drag. Sends continuous values. | "CC Fader" bound to a volume slider |
| **State** | A live value Touch Portal remembers, that you can show on a button, gauge, or text field. | `tx.cc.volume.value` shows the last volume you sent |
| **Event** | A trigger that fires the instant something happens, so Touch Portal can react automatically. | "MIDI CC Sent" fires every time any named CC control sends |

The relationship that makes this powerful:

```
You press a button (Action) or move a slider (Connector)
        ↓
MIDI Pro sends the real MIDI message
        ↓
MIDI Pro updates a State with what it just sent
        ↓
MIDI Pro fires an Event announcing "something was sent"
        ↓
Touch Portal can now show that value anywhere, or automatically
react to it — change a page, flip an icon, trigger a notification
```

This only happens for controls you've given a **Name**. Leave the Name field
blank, and the control still sends MIDI perfectly — it just won't publish any
state or fire any event. Naming things is opt-in, and it's the one field you
should get in the habit of filling in.

---

## Part 3 — A Two-Minute MIDI Primer

You don't need to be a MIDI expert to use this plugin, but four terms come up
everywhere in it:

- **Channel** (1–16) — MIDI devices can address 16 independent channels, like
  16 separate radio frequencies. Most simple setups just use channel 1.
- **Note** (0–127) — which musical note. 60 is Middle C.
- **Velocity** (0–127) — how hard the note was hit. 127 = hardest, 0 = a Note
  Off in disguise (this is why velocity 0 usually means "note released").
- **CC / Control Change** (0–127 number, 0–127 value) — the general-purpose
  knob message. CC number identifies *which* control (CC 7 is the MIDI
  standard for Volume, CC 10 is Pan — but really it's just a number your DAW
  or synth is listening for). The value is *how much*.

Everything else in MIDI Pro is built from these four ideas.

---

## Part 4 — The Actions (Buttons)

Every action lives under the **MIDI Pro** category in Touch Portal's action
list. Seven actions total.

### Midi Note

Sends a Note On / Note Off message — the message a piano key generates.

| Field | What it does |
|---|---|
| **Name** | Optional. Fill this in to get live states/events for this button (see Part 8). |
| **Mode** | See the mode table below — this changes *when* the note fires. |
| **Note** | 0–127. Which note. Middle C = 60. |
| **Velocity On** | 0–127. How hard the "on" hit is. |
| **Velocity Off** | 0–127. What velocity to send for the "off" message (usually 0). |
| **Ch** | 1–16. MIDI channel. |
| **MIDI Out** | Which port to send to. |
| **MIDI In** | Optional — lets this same button listen for the identical incoming note and mirror it (used for Toggle mode feedback). |

**Mode — read this carefully, the names are not what you'd guess:**

| Mode | What actually happens |
|---|---|
| **On / Off** | Press fires ON *and* OFF immediately, back to back. A one-shot pulse. Use for drum hits, one-shot samples, clip triggers. |
| **On only** | Press sends only the ON velocity. Nothing on release. |
| **Off only** | Press sends only the OFF velocity. |
| **Hold** | Press sends ON. Release does nothing — you're expected to turn it off some other way. |
| **Momentary** | Press sends ON, **release sends OFF** — a true held key, like a sustain pedal. This is the mode most people expect when they hear "On/Off." |
| **Toggle** | Each press alternates ON → OFF → ON. Release is ignored. Good for mute buttons that stay lit. |

If you want "hold the button down, it plays; let go, it stops" — that's
**Momentary**, not "On / Off."

### Control Change (CC)

Sends the general-purpose knob message. Same shape as Midi Note, but for
continuous parameters instead of notes.

| Field | What it does |
|---|---|
| **Name** | Same as above. |
| **Mode** | Identical six modes as Midi Note (On/Off, On only, Off only, Hold, Momentary, Toggle) — same behavior table applies. |
| **CC#** | 0–127. Which control. |
| **Value On** / **Value Off** | 0–127 values sent for the two states. |
| **Ch** | 1–16. |
| **Repeat Mode** | *Once* (default) or **Repeat While Held** — continuously re-sends Value On at the chosen rate while the button is held down. |
| **Repeat Rate** | 5/10/20/30/50 Hz — only matters if Repeat Mode is on. |
| **MIDI Out / MIDI In** | Same as Midi Note. |

Use Repeat While Held for things like "nudge a fader up while I hold this
button" in a DAW that supports incremental CC nudges.

### CC Relative (CW/CCW)

A button-based rotary encoder. Instead of one value, it has two completely
independent packets — one for "clockwise," one for "counter-clockwise" — and
you decide what each one sends.

| Field | What it does |
|---|---|
| **Name** | Names the *encoder*, not a direction — CW and CCW share one Name and one live position (see Part 8). |
| **CW CC# / CW Val / CW Ch** | The exact CC message sent when you press the button. |
| **CCW CC# / CCW Val / CCW Ch** | The exact CC message sent when you release it. |
| **Repeat** | *Once* or **Repeat While Held** — held down repeats the CW packet at Rate; releasing always fires CCW once. |
| **Rate** | Repeat speed, only relevant if Repeat = Repeat While Held. |
| **MIDI Out / MIDI In** | Same as above. |

This is how you emulate a relative encoder knob using two ordinary buttons —
one wired as "press = CW," a second wired identically but you use its release,
or bind CW and CCW to two separate physical buttons on a controller.

### Pitch Bend

Sends the 14-bit pitch wheel message.

| Field | What it does |
|---|---|
| **Name** | Optional, for telemetry. |
| **Mode** | **Fixed** — press sends the Value and nothing else. **Return to Center** — press sends Value, release automatically snaps back to 8192 (dead center), so you get spring-loaded pitch-bend behavior from an ordinary button. |
| **Value** | 0–16383. 8192 is center/no-bend. 0 is full down, 16383 is full up. |
| **Ch** | 1–16. |
| **MIDI Out** | Destination port. |

### Program Change

Switches a synth or instrument's patch/preset number.

| Field | What it does |
|---|---|
| **Name** | Optional, for telemetry. |
| **Mode** | **Fixed** sends the exact Program number every press. **Increment (+1 on Hold)** / **Decrement (-1 on Hold)** step the program up or down by 1 from wherever it last landed — it does *not* reset to the base Program each time, so repeated presses walk through your patch list. |
| **Program** | 0–127. The starting/fixed patch number. |
| **Ch** | 1–16. |
| **Rate** | Repeat speed if you hold an Increment/Decrement button down. |
| **MIDI Out / MIDI In** | Same as above. |

### Panic / All Notes Off

The emergency stop button. Sends the MIDI "all notes off" broadcast so any
stuck or hanging notes clear instantly — the fix for "my synth won't stop
playing that one note."

| Field | What it does |
|---|---|
| **Channel** | *All*, or a specific channel 1–16. |
| **MIDI Out** | Destination port. |

Put one of these on every page. You will use it more than you expect.

### MIDI Learn

Not a "sender" — a diagnostic listener. Covered in full in Part 5.

---

## Part 5 — MIDI Learn: Diagnose Anything

MIDI Learn solves the single most common beginner problem: *"I don't know
what my controller actually sends."*

**How to use it:**

1. Drag the **MIDI Learn** action onto a button.
2. Set **MIDI In** to the port your hardware (or DAW) is connected through.
3. Press the button in Touch Portal, then immediately play a note, move a
   knob, or trigger whatever you want to identify on your real gear.
4. MIDI Pro captures the very next message on that port and publishes it to a
   set of states you can read immediately.

**What you get back**, all as Touch Portal states:

| State | Example value |
|---|---|
| `state.learn.display` | `NOTE Ch1 N60 Vel127` — compact, perfect for a button label |
| `state.learn.summary` | Multi-line: Device, Type, Channel, Note/CC/Program, Velocity/Value, and the raw hex bytes |
| `state.learn.device` | `X-Touch Mini` — which port it came from |
| `state.learn.timestamp` | `2026-07-04 14:32:07` — proves the capture is fresh, not stale |
| `state.learn.type` / `.channel` / `.control` / `.value` / `.raw` | The individual pieces, if you want to build your own display |

**Real use case:** your friend hands you an unlabeled MIDI controller. Instead
of guessing, put MIDI Learn on a button, add **Update Button text...** on a
second button's On Event tab pointing at `state.learn.summary` (or use the
500ms timer shortcut from Part 8), and press every knob and pad once. You'll
have a complete map of the device in five minutes.

---

## Part 6 — The Connectors (Sliders & Dials)

Connectors are Touch Portal's slider and dial widgets — you drag them instead
of pressing them. Every connector in MIDI Pro comes in two visual flavors
(Slider and Dial) that behave identically; pick whichever fits your layout.

### CC Fader / Rotary Dial — continuous CC control

The main way to control a continuous parameter — volume, filter cutoff, pan.

| Field | What it does |
|---|---|
| **Name** | For telemetry (Part 8). |
| **Mode** | **Absolute** — the slider position directly maps to a 0–127 CC value, like a real fader. **Relative** (three sub-variants) — the slider acts as an endless encoder instead: moving it away from center sends a stream of relative "tick" messages, for DAW parameters that expect relative nudges rather than an absolute position. |
| **CC# / Ch** | Standard CC target. |
| **Sensitivity** | Slow → Fast. Only affects Relative mode — how quickly ticks accelerate as you move further from center. |
| **CZ (Center Zone)** | A dead band around the center where nothing is sent — prevents accidental drift from being read as input. Relative mode only. |
| **MIDI Out / MIDI In** | Standard. |

**Which mode should you pick?** If your DAW's fader jumps to match your
Touch Portal slider position exactly — use **Absolute**. If your DAW's
control is one of those "infinite rotary" style knobs that only understands
relative nudges — use one of the **Relative** variants (Binary Offset is the
most universally supported; try that first).

### CC Comp / Rotary CC Comp — independent up/down control

Built for the case where "up" and "down" genuinely need to be two different
messages, not just +1/-1 of the same one — for example, two separate buttons
on a hardware surface, or a DAW plugin with distinct increment/decrement CCs.

| Field | What it does |
|---|---|
| **Name** | Names the whole control — both directions share one live position. |
| **Up CC# / Up Ch / Up Val / Up Sens** | The exact packet sent when you slide *above* center. |
| **Down CC# / Down Ch / Down Val / Down Sens** | The exact packet sent when you slide *below* center. |
| **CZ** | Dead band around center, shared by both directions. |
| **DZ (Dead Zone)** | A little extra buffer so the slider has to properly cross back to center before it can re-trigger in the same direction — stops jitter at the boundary from double-firing. |
| **MIDI Out / MIDI In** | Standard. |

### Pitch Bend Slider / Dial

A fader that continuously controls pitch bend instead of a CC. Center = no
bend (8192). Only two fields you'll touch: **Name** and **Ch**.

### Program Change Slider / Dial

Drag across 0–100% and land on a specific patch/program number (0–127) —
useful as a quick patch browser without needing separate Increment/Decrement
buttons. Only **Name** and **Ch** to configure.

---

## Part 7 — Which Control Should I Use?

| I want to... | Use this |
|---|---|
| Trigger a one-shot sample / drum hit | Midi Note, Mode = **On / Off** |
| Hold a note while a button is pressed | Midi Note, Mode = **Momentary** |
| A mute button that stays lit | Midi Note or CC, Mode = **Toggle** |
| A volume fader | CC Fader connector, Mode = **Absolute** |
| An endless-rotation encoder knob | CC Fader connector, Mode = **Relative**, or CC Relative action |
| Nudge a value repeatedly while holding a button | CC action with **Repeat While Held** |
| A pitch wheel with spring-back | Pitch Bend action, Mode = **Return to Center** |
| Browse through synth patches | Program Change, Mode = **Increment/Decrement** |
| "Everything just stopped working" | Panic / All Notes Off |
| "What does my controller actually send?" | MIDI Learn |

---

## Part 8 — Runtime Telemetry: States & Events

This is MIDI Pro's headline feature: Touch Portal can show you, live, what
was just sent — without your DAW or hardware sending anything back.

### It only works if you fill in Name

Every send action and every connector has a **Name** field. The moment you
name a control "Volume" and press/move it once, MIDI Pro creates a small set
of live states under that name automatically. Leave Name blank and nothing is
created — this is intentional, so the state list doesn't fill up with clutter
for controls you don't care to monitor.

### The states you get, per control type

| You named a... | You get these live states |
|---|---|
| Midi Note "Play" | `tx.note.play.state` (on/off) · `tx.note.play.velocity` |
| CC or CC Fader "Volume" | `tx.cc.volume.value` (0–127) · `tx.cc.volume.state` (on/off, ≥64 = on) |
| Pitch Bend "Expression" | `tx.pb.expression.value` (0–16383) · `tx.pb.expression.pct` (−100…+100, easier for gauges) |
| Program Change "Patch" | `tx.pc.patch.program` |
| CC Relative or CC Comp "Jog" | `tx.dial.jog.value` (a running position, 0–127, starts at 64) · `tx.dial.jog.direction` (cw/ccw) |

Every one of these also gets a `.time` companion showing exactly when it last
fired (`HH:MM:SS`) — handy for a "last activated" readout.

**Important:** if you name a *connector* the same as a *button action* — say,
both called "Jog" — they share the exact same live position. Turning a
physical-feeling button and dragging a slider both called "Jog" will move one
single number, not two separate ones. Use this deliberately if you want two
different controls to represent the same underlying parameter.

### Making a state actually show up on screen

This is the step beginners most often skip, so read it carefully: **naming a
control and pressing it does not automatically make its value appear
anywhere.** MIDI Pro only creates and updates the state in the background.
You still have to tell a specific button, on a specific event, to display it.

Touch Portal's own native action for this is called **Update Button text...**
— and it lives specifically under a button's **On Event** tab, not On Press.

1. Press/move your named MIDI Pro control at least once first, so its state
   actually exists (see the troubleshooting note below).
2. Edit the button where you want the *value to appear* — this can be the
   same button that sends the MIDI, or a completely different one.
3. Switch to that button's **On Event** tab (a separate list from On Press).
4. Add Touch Portal's built-in **Update Button text...** action.
5. Inside that action's own text field, use Touch Portal's variable picker
   (usually a small `+` or `$` icon) to insert your MIDI Pro state — find it
   listed under the **MIDI Pro** category by the exact name you typed, e.g.
   `tx.cc.volume.value`.
6. Save. The button will now redraw with that value whenever the event you
   attached it to fires.

**The easy shortcut for "just show me a live number, I don't care about
events":** Touch Portal has a built-in periodic refresh event that
re-evaluates a button's text roughly every 500ms on its own, with no MIDI Pro
event needed at all. Put your state variable into that button's text using
the same variable picker, attach it to Touch Portal's own refresh event
instead of one of MIDI Pro's five events, and it will simply stay current on
its own — the closest thing to "just works" for a live dashboard number.

**Using a MIDI Pro Event instead of the timer:** attach **Update Button
text...** to one of MIDI Pro's five events (e.g., "MIDI CC Sent") instead of
the timer if you want the display to refresh at the *exact instant* that
specific type of message goes out, rather than up to 500ms later.

### Events — for automation, not display

Events are momentary triggers, one per MIDI type: **MIDI Note Sent**, **MIDI
CC Sent**, **MIDI Pitch Bend Sent**, **MIDI Program Change Sent**, **MIDI Dial
Changed**. Use these in Touch Portal's "On Event" trigger system to make
things happen automatically — switch a page, fire a notification, run another
action — the instant any named control of that type transmits.

Each event carries context through five shared states that get overwritten by
whichever control fired most recently:

| State | Meaning |
|---|---|
| `tx.last.name` | Which control just fired (e.g. `Volume`) |
| `tx.last.type` | Note / CC / Pitch Bend / Program Change / Dial |
| `tx.last.value` | What it sent |
| `tx.last.port` | Which MIDI port |
| `tx.last.channel` | Which channel |

**Do not** bind a permanent dashboard display to `tx.last.*` — the next
transmission from *any* control overwrites it. It's built for the split
second an event handler needs to read it, not for long-term display. For
display, always use the per-name states (`tx.cc.volume.value`, etc.) instead.

**Example automation:** "When MIDI Note Sent fires, if `tx.last.state` is
`on`, switch to the 'Now Playing' page." This works for *any* named Note
action, without wiring up a separate trigger for each one.

### Runtime States vs. TX Events — which do I use?

These solve two different problems, and once the distinction clicks, the
rest of this plugin gets much easier to reason about.

```
                    MIDI Pro sends MIDI
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
       Runtime States                 TX Events
       "I know exactly            "React to any
        which control              transmission of
        I want to watch"           this type, generically"
              │                           │
       tx.note.play.state           MIDI Note Sent, etc.
       tx.cc.volume.value           read tx.last.* afterward
              │                           │
              ▼                           ▼
       Button icon / LED           Notifications, logs,
       Gauge / text / bar          macros, analytics
```

**Use Runtime States when you already know which control you want to
observe.** This is the common case — a button's icon, an LED, a gauge, a
progress bar, a label. No plugin Event is needed at all: bind a display
element's On Event tab directly to the state itself (e.g. "when
`tx.note.play.state` changes to `on`"), as covered above. This is the whole
reason the TX Runtime State Publisher exists.

**Use TX Events when you want one generic handler that reacts to *any*
transmission of a given type**, without caring in advance which named
control triggered it — a "last activated" indicator, a transmission logger,
a macro recorder, simple analytics. Read `tx.last.name` / `.value` / `.port`
inside the event to find out what just happened.

| | Runtime States | TX Events |
|---|---|---|
| Use when | You know the specific control | You want to react to anything of that type |
| Reads | `tx.note.play.state`, `tx.cc.volume.value`, etc. | `tx.last.name`, `.type`, `.value`, `.port`, `.channel` |
| Good for | Button icons, LEDs, gauges, text, progress bars | Notifications, logging, macros, generic workflows |
| Setup | Bind display element directly to the state | Attach to one of the five events, then branch on `tx.last.*` |

---

## Part 9 — Real-World Scenarios

### The live performer — a volume fader that shows itself

You're running a laptop set and want a visual confirmation your master
volume fader actually moved, without staring at your DAW.

1. Drag a **CC Fader** connector onto your page, Mode = Absolute, CC# = 7
   (the MIDI standard for Volume), Name = `Master`.
2. On a nearby button, go to its On Event tab, add **Update Button text...**,
   attach it to the built-in 500ms timer (or the "MIDI CC Sent" event), and
   point it at `tx.cc.master.value`.
3. Now every time you drag the fader, the number on that button updates —
   a live readout with zero extra wiring in your DAW.

### The sample trigger wall

Eight buttons, each firing a different one-shot sample via note trigger.

1. Eight **Midi Note** actions, Mode = **On / Off** (the one-shot pulse), one
   different Note number per button (e.g. 60, 62, 64...), all same channel.
2. Map those note numbers in your sampler/DAW to eight different sounds.
3. No Name needed here unless you want a "last sample fired" display
   somewhere — if you do, name each one and, on a display button's On Event
   tab, add **Update Button text...** pointed at `tx.last.name` for an
   "on air" style readout of whichever pad was hit last.

### The synth patch browser

Two buttons — Next Patch / Previous Patch — walking through 128 presets.

1. One **Program Change** action, Mode = **Increment (+1 on Hold)**, Name =
   `Patch`.
2. A second Program Change action, Mode = **Decrement (-1 on Hold)**, same
   Name = `Patch` (they share the live position).
3. On a display button's On Event tab, add **Update Button text...** pointed
   at `tx.pc.patch.program` — you'll always see exactly which patch number
   you're currently on, even though neither button alone "knows" it.

### The expression pedal replacement

You don't own a real expression pedal, but your synth patch has a filter
sweep mapped to CC 74.

1. **CC Fader** connector, Absolute mode, CC# = 74, Name = `Filter`.
2. On a gauge widget's On Event tab, add **Update Button text...** (or the
   equivalent gauge-value action) pointed at `tx.cc.filter.value` for a big,
   visible sweep indicator during a performance.

### The DJ-style filter knob

An endless rotary feel for sweeping a filter, using two adjacent buttons as
CW/CCW instead of a touch slider.

1. **CC Relative (CW/CCW)** action, CW Val and CCW Val set to whatever your
   DAW's relative-CC mapping expects (check your DAW's MIDI mapping docs —
   Binary Offset's 65/63 pair is the most common), Name = `Jog`.
2. On a display element's On Event tab, add **Update Button text...** (or
   its rotation-property equivalent) pointed at `tx.dial.jog.value` for a
   satisfying live visual as you spin it.

---

## Part 10 — Quick Reference

### All 7 Actions

| Action | Sends | Has Hold? |
|---|---|---|
| Midi Note | Note On/Off | Yes |
| Control Change (CC) | CC | Yes |
| CC Relative (CW/CCW) | Two independent CC packets | Yes |
| Pitch Bend | Pitch Bend | Yes |
| Program Change | Program Change | Yes |
| Panic / All Notes Off | All Notes Off broadcast | Yes |
| MIDI Learn | *(listens, doesn't send)* | No |

### All 8 Connectors

| Connector | Widget | Sends |
|---|---|---|
| CC Fader | Slider | CC (Absolute or Relative) |
| Rotary Dial | Dial | CC (Absolute or Relative) |
| CC Comp | Slider | CC (independent Up/Down) |
| Rotary CC Comp | Dial | CC (independent CW/CCW) |
| Pitch Bend Slider | Slider | Pitch Bend |
| Pitch Bend Dial | Dial | Pitch Bend |
| Program Change Slider | Slider | Program Change |
| Program Change Dial | Dial | Program Change |

### All 5 Events

MIDI Note Sent · MIDI CC Sent · MIDI Pitch Bend Sent · MIDI Program Change
Sent · MIDI Dial Changed

### Every telemetry state, by prefix

`tx.note.<name>.*` · `tx.cc.<name>.*` · `tx.pb.<name>.*` · `tx.pc.<name>.*` ·
`tx.dial.<name>.*` · `tx.last.*` (event context only) · `state.learn.*`
(MIDI Learn results)

---

## Part 11 — Troubleshooting

**I named my control, pressed it, but nowhere shows the value.** This is
expected — naming a control only creates the state in the background. You
still have to explicitly add Touch Portal's **Update Button text...** action
under some button's **On Event** tab and point it at that state yourself.
See Part 8, "Making a state actually show up on screen."

**A MIDI In or MIDI Out dropdown is empty.** Make sure the device is
physically connected (or your virtual port app is running) *before* opening
the action's settings, then reopen it. Ports are detected automatically on
hotplug, but the dropdown needs to be freshly opened to show the update.

**I pressed a named button but its state never showed up in the state
picker.** States are created the *first time* a named control actually fires
— press the button or move the slider at least once before looking for its
state.

**My Toggle button doesn't seem to alternate correctly.** Toggle mode ignores
button release entirely — only presses count. Make sure you're actually
releasing between presses rather than holding down.

**Nothing happens when I press a button at all.** Check that MIDI Out is
actually set — an unset port silently does nothing rather than erroring, by
design, so a half-configured button doesn't crash the plugin.

**Values seem "off by one direction."** For CC Relative / CC Comp, double
check which value your DAW expects for "increase" vs "decrease" — this varies
by DAW and by relative-CC encoding standard. If in doubt, use MIDI Learn on
a working relative knob you already have to see exactly what byte pattern
your DAW is listening for, then match it.
