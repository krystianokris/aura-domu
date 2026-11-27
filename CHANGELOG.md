# Changelog

## 0.9.1 — start bez konfiguracji

- Tryb automatyczny: bez listy `rooms` karta buduje pokoje z obszarów HA (światła, wentylatory, termostaty, multimedia, okna, wycieki, ruch, czad, oczyszczacze, temperatura i wilgotność z czujnika pokojowego); pomija encje diagnostyczne i ukryte.
- Automatyczna Ochrona (z bateriami czujników) i Ogrzewanie (termostaty grzewcze bez klimatyzatorów, jeden obieg na pokój, podłogówka osobno, główny termostat rozpoznany po integracji).
- Ustawienia → Gotowa konfiguracja: podgląd YAML, Kopiuj, Zapisz w pulpicie (administrator, potwierdzenie drugim stuknięciem).
- Temperatura pokoju nie jest brana z czujników drukarek, lodówek, podłogówek itp.

## 0.9.0 — pierwsze publiczne wydanie (beta)

- Zakładki: Dom, Pokoje, Klimat, Ogrzewanie, Pogoda, Energia, Ochrona, Kosze, F1, Ustawienia.
- Pokoje tylko z encji wpisanych w konfiguracji (`rooms`), z sekcjami Światła, Klimat, Multimedia, Czujniki, Urządzenia; tryb zapasowy z obszarów HA.
- Ogrzewanie: kocioł, obiegi, podłogówka, tryby Auto / Komfort / Eco / Boost z potwierdzeniem, czas pracy kotła z historii.
- Pogoda: animowana rysowana scena, prognoza godzinowa i dzienna; opady z prognozy na bieżącą godzinę, gdy stan główny ich nie pokazuje.
- Kosze: Waste Collection Schedule, kolory koszy, przypomnienie dzień przed odbiorem.
- F1: F1 Sensor, odliczanie, plan weekendu, podium, klasyfikacje, tor, pogoda, tryb na żywo, tryb bez spoilerów.
- Ustawienia: motyw, włączanie i wyłączanie zakładek (`hidden_tabs`), wyjście do ustawień HA (działa z kiosk-mode).
- Efekt wejścia: kafelki wyłaniają się z wklęsłych dołków; wyłączony przy „ogranicz animacje” w systemie.
- Pasek zakładek przewija się na wąskich ekranach.
