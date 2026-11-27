# Aura domu

**A full-screen Home Assistant dashboard card** — home, rooms, climate, heating, weather, energy, security, bin collection and F1 in one card. Soft neumorphic style, light and dark theme, tiles that rise out of concave dimples when you open a tab.

> Version **0.9.1 (beta)**. The interface is **Polish only** for now — an English translation is planned; feedback and ideas are welcome in [Issues](../../issues).

[Polski README](README.pl.md)

## Features

- **Dom (Home)** — clock, greeting and a "mood orb" (colour = room temperatures, pace = power draw, red = alarm), tiles for lights, thermostat, energy (with a chart) and security; events such as doorbell, leak, CO or finished laundry appear on the orb.
- **Pokoje (Rooms)** — rooms from your config, each with Lights (with brightness), Climate, Media, Sensors and Devices (washer, dryer, 3D printer, litter box, feeder, purifier…), plus a room switcher.
- **Klimat (Climate)**, **Ogrzewanie (Heating)** — room temperatures, all thermostats; boiler drawing, radiator circuits, floor heating, Auto / Comfort / Eco / Boost modes (confirmed by a second tap), gas today and boiler run time.
- **Pogoda (Weather)** — an animated drawn scene (sun, moon, clouds, rain, snow, storm, fog, wind), details, hourly forecast with a temperature curve, daily forecast.
- **Energia (Energy)**, **Ochrona (Security)** — power, electricity / gas / water, price; alarm mode, windows, leaks, CO, motion, cameras, sensor batteries.
- **Kosze (Bins)** — from [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule), with a reminder on the home screen the day before.
- **F1** — from [F1 Sensor](https://github.com/Nicxe/f1_sensor): countdown, weekend schedule in your time zone, podium, standings, circuit facts, race weather and a live mode (track status, positions, race control). No-spoiler mode is respected.
- **Ustawienia (Settings)** — theme, show / hide tabs (admins, saved in the dashboard config), link to HA settings.

**Zero-config start:** with just `type: custom:aura-domu` the card builds rooms, security and heating from your Home Assistant **areas** (lights, fans, thermostats, media, window / leak / motion / CO sensors, room temperature and humidity; diagnostic and hidden entities are skipped). **Ustawienia → Gotowa konfiguracja** shows that as YAML to copy, or saves it into the dashboard in one go, so you only fine-tune names and add devices. Once you list your own `rooms`, the card shows only those entities. Tabs without data hide themselves.

## Installation

**HACS:** HACS → ⋮ → Custom repositories → `https://github.com/krystianokris/aura-domu`, category **Dashboard**, then install **Aura domu**.

**Manual:** copy `dist/aura-domu.js` from the [latest release](../../releases) to `/config/www/`, then add the resource `/local/aura-domu.js?v=0.9.1` (JavaScript module). Change `?v=` after every update.

## Configuration

Create a dashboard with a **Panel** view and the card:

```yaml
type: custom:aura-domu
weather_entity: weather.home
rooms:
  - id: living
    name: Salon
    temperature: sensor.living_temperature
    lights:
      - {entity: light.living_ceiling, name: Sufit}
```

A full example with every tab is in [`examples/aura-domu.yaml`](examples/aura-domu.yaml); all options are described in the [Polish README](README.pl.md#konfiguracja). For the full-screen look, install [kiosk-mode](https://github.com/NemesisRE/kiosk-mode) and set `kiosk_mode: {kiosk: true}` on the dashboard.

## License
MIT
