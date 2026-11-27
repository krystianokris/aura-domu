# Aura domu

**Pulpit na cały ekran dla Home Assistanta** — dom, pokoje, klimat, ogrzewanie, pogoda, energia, ochrona, kosze i F1 w jednej karcie. Miękki, „wypukły” styl (neumorfizm), jasny i ciemny motyw, kafelki wyłaniające się z wklęsłych dołków przy wejściu na zakładkę.

> Wersja **0.9.1 (beta)** — czekam na opinie i propozycje w [Issues](../../issues). Interfejs jest na razie po polsku.

[English README](README.md)

## Co potrafi

| Zakładka | Co pokazuje |
|---|---|
| **Dom** | Zegar, powitanie i „kula” nastroju domu (kolor = temperatura w pokojach, tempo = pobór mocy, czerwień = alarm). Kafelki: światła (z „Zgaś wszystkie”), termostat, energia z wykresem, ochrona. Zdarzenia (dzwonek, wyciek, czad, koniec prania) pokazują się na kuli. |
| **Pokoje** | Pokoje z konfiguracji. W pokoju: Światła (z jasnością), Klimat, Multimedia, Czujniki, Urządzenia (pralka, suszarka, drukarka 3D, kuweta, karmnik, oczyszczacz…). Pasek do przełączania pokoi. |
| **Klimat** | Temperatura i wilgotność każdego pokoju, wszystkie termostaty i klimatyzacje. |
| **Ogrzewanie** | Kocioł (rysunek z płomieniem, gdy grzeje), obiegi pokoi z zaworami, podłogówka, tryby Auto / Komfort / Eco / Boost (zmiana dopiero po drugim stuknięciu), gaz dziś, czas pracy kotła. |
| **Pogoda** | Rysowana, animowana scena (słońce, księżyc, chmury, deszcz, śnieg, burza, mgła, wiatr), szczegóły, prognoza godzinowa z wykresem i prognoza na kolejne dni. |
| **Energia** | Moc teraz, prąd / gaz / woda dziś, cena prądu, zużycie urządzeń. |
| **Ochrona** | Tryb ochrony, okna, wycieki, czad, ruch, kamery, baterie czujników. |
| **Kosze** | Odbiory z integracji [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule), rysowane kosze w kolorach, przypomnienie na ekranie głównym dzień wcześniej. |
| **F1** | Z integracji [F1 Sensor](https://github.com/Nicxe/f1_sensor): odliczanie, plan weekendu w Twoim czasie, podium, klasyfikacje, tor, pogoda na wyścig i tryb na żywo (stan toru, pozycje, dyrekcja wyścigu). Tryb bez spoilerów. |
| **Ustawienia** | Motyw (jasny / ciemny / jak w systemie), włączanie i wyłączanie zakładek (dla administratora, zapis w konfiguracji pulpitu), wejście do ustawień HA. |

## Start bez konfiguracji

Wystarczy `type: custom:aura-domu`. Karta sama buduje pulpit z **obszarów Home Assistanta**:

- **Pokoje** — w każdym obszarze: światła (także przełączniki z „światło / lamp / LED” w nazwie), wentylatory, termostaty, multimedia, okna i drzwi, czujniki zalania, ruchu i czadu, oczyszczacze; temperatura i wilgotność pokoju z czujnika pokojowego. Pomija encje diagnostyczne i ukryte.
- **Ochrona** — okna, wycieki, czad, ruch, alarm i baterie tych czujników.
- **Ogrzewanie** — termostaty grzewcze (bez klimatyzatorów), jeden obieg na pokój, podłogówka osobno; główny termostat rozpoznaje po integracji (np. Nest, Ecobee, Tado).
- **Pogoda**, **Kosze** i **F1** — gdy masz encję pogody, Waste Collection Schedule albo F1 Sensor.

Potem w **Ustawienia → Gotowa konfiguracja** zobaczysz to wszystko jako YAML: **Kopiuj** (do edytora pulpitu) albo **Zapisz w pulpicie** (dwa stuknięcia, tylko administrator). Od tej chwili karta korzysta z Twojej konfiguracji — poprawiasz nazwy, dopisujesz urządzenia (pralka, drukarka, kuweta…), usuwasz, czego nie chcesz.

Gdy wpiszesz własną listę `rooms`, karta pokazuje **tylko te encje**. Zakładka bez danych sama znika z menu.

## Instalacja

### HACS
1. HACS → ⋮ → **Repozytoria niestandardowe** → `https://github.com/krystianokris/aura-domu`, kategoria **Dashboard**.
2. Zainstaluj **Aura domu** i odśwież przeglądarkę.

### Ręcznie
1. Pobierz `dist/aura-domu.js` z [najnowszego wydania](../../releases) i skopiuj do `/config/www/aura-domu.js`.
2. **Ustawienia → Pulpity → ⋮ → Zasoby → Dodaj**: `/local/aura-domu.js?v=0.9.1`, typ **Moduł JavaScript**.
3. Po każdej aktualizacji zmień `?v=` — przeglądarka trzyma pliki z `/local` przez 31 dni.

## Konfiguracja

Utwórz nowy pulpit, dodaj widok w trybie **Panel** i kartę:

```yaml
type: custom:aura-domu
weather_entity: weather.home
climate_entity: climate.salon
rooms:
  - id: salon
    name: Salon
    temperature: sensor.salon_temperatura
    lights:
      - {entity: light.salon_sufit, name: Sufit}
```

Pełny przykład ze wszystkimi zakładkami: [`examples/aura-domu.yaml`](examples/aura-domu.yaml).

### Pulpit na cały ekran
Tak jak na filmiku: zainstaluj [kiosk-mode](https://github.com/NemesisRE/kiosk-mode) i dodaj na górze konfiguracji pulpitu:
```yaml
kiosk_mode:
  kiosk: true
```
Do ustawień HA wchodzisz wtedy z zakładki **Ustawienia** w karcie. Edycja pulpitu: dopisz `?disable_km&edit=1` do adresu (albo przycisk „Edytuj pulpit” w Ustawieniach).

### Najważniejsze opcje

| Opcja | Opis |
|---|---|
| `rooms` | Lista pokoi: `id`, `name`, `subtitle`, `temperature`, `humidity`, `lights`, `climate`, `media`, `sensors`, `devices`. Bez tej listy karta dobiera pokoje sama z obszarów HA (patrz „Start bez konfiguracji”). |
| `lights[].type: fan` | Przełącznik pokazany w Światłach, ale nieliczony jako światło. |
| `sensors[].type` | `window`, `leak`, `motion`, `co`, `battery`, `pm`, `aq` — ikona i ostrzeżenia. |
| `devices[]` | `type` (`washer`, `dryer`, `printer`, `purifier`, `pet_feeder`, `litter_box`), `name`, `status` i dowolne pola z encjami (np. `remaining`, `progress`), `switches`, przyciski (`pause`, `feed`, `clean`…). |
| `weather_entity`, `climate_entity`, `power_entity`, `price_entity` | Encje dla strony Dom. |
| `heating_page`, `energy_page`, `security_page` | Zakładki Ogrzewanie, Energia, Ochrona (przykład w `examples/`). |
| `bins` | `{calendar, sensor, types}` — opcjonalnie, domyślnie wykrywa Waste Collection Schedule. |
| `f1` | Nadpisanie encji F1 Sensor, np. `{led: automation.flagi_f1}`. |
| `hidden_tabs` | Ukryte zakładki: `rooms`, `climate`, `heating`, `weather`, `energy`, `security`, `bins`, `f1`. |
| `scenes` | Lista scen pod kulą. |
| `title`, `name`, `load_font` | Nazwa pulpitu, imię w powitaniu, wyłączenie fontu Inter Tight z Google Fonts. |

## Opinie i propozycje
To pierwsza wersja — napisz, co działa, a co nie: [zgłoś błąd albo zaproponuj zmianę](../../issues/new/choose). Przy błędzie dołącz wersję HA, przeglądarkę i fragment konfiguracji (bez haseł i tokenów).

## Licencja
MIT
