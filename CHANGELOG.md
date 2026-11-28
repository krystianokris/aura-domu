# Changelog

## 0.12.1 — poprawka menu zakładek

- Naprawione „zawieszanie się” menu: bez kiosk-mode, po pierwszej zmianie zakładki karta przewijała się pod pasek Home Assistanta i nie dało się kliknąć kolejnej zakładki. Teraz karta zatrzymuje się pod paskiem HA.
- Fixed tabs getting "stuck": without kiosk-mode, switching tabs scrolled the card under the Home Assistant header, so the next tab could not be clicked.

## 0.12.0 — kamery w pokojach

- Kamery w pokojach: podgląd z kamery (odświeżany co 30 s), stuknięcie otwiera obraz na żywo w HA. W trybie automatycznym kamery z obszarów pojawiają się same, w pokoju i na zakładce Ochrona; we własnej konfiguracji lista `cameras` w pokoju albo `entity` w `security_page.cameras`.
- Cameras in rooms: live snapshot tiles (refreshed every 30 s), tap for the live view. In zero-config mode cameras from your areas show up automatically in their room and on Security; in your own config use `cameras` in a room or `entity` in `security_page.cameras`.
- Demo: dwie przykładowe kamery.

## 0.11.0 — kosze bez integracji

- Własny harmonogram odbioru odpadów: `bins.schedule` z kolorem, rodzajem, pierwszym odbiorem i co ile dni (`every` / `weeks`) albo listą dat. Działa bez Waste Collection Schedule i bez API gminy; można łączyć z integracją. Przykład: `examples/bins.yaml`.
- Own bin schedule without any integration or council API: `bins.schedule` with colour, type, first date and `every` N days / `weeks`, or one-off `dates`.
- Kolory koszy także po polsku (czarny, żółty, niebieski…) i nowy kolor żółty (metale i tworzywa).

## 0.10.1 — przełącznik języka

- **Ustawienia → Język**: jak w Home Assistant, polski albo angielski. Wybór zapamiętuje urządzenie (jak motyw) i ma pierwszeństwo przed `language` z konfiguracji.
- **Settings → Language**: same as Home Assistant, Polski or English, remembered per device like the theme.
- Demo w całości po angielsku: wymyślony dom (pokoje, urządzenia, sceny, ochrona) zmienia język razem z kartą.

## 0.10.0 — English / po angielsku

- Interfejs po angielsku i po polsku. Karta bierze język z profilu użytkownika Home Assistanta (polski → polski, każdy inny → angielski); opcja `language: en` albo `pl` wymusza język. Daty, godziny i liczby w formacie wybranego języka.
- The card is now available in English. It follows the language of your Home Assistant profile (Polish → Polish, anything else → English); set `language: en` or `pl` to force one.
- Demo: `?lang=en` albo `?lang=pl` w adresie.
- Poprawne liczby mnogie („1 słaba bateria”, „22 światła”).

## 0.9.3 — poprawki z przeglądu HACS

- Karta nie zapisuje już konfiguracji pulpitu: zniknął przycisk „Zapisz w pulpicie”. Gotową konfigurację kopiujesz przyciskiem **Kopiuj** i wklejasz w edytorze pulpitu.
- Widoczność zakładek zapamiętuje przeglądarka na danym urządzeniu (jak motyw), dla każdego użytkownika. `hidden_tabs` w konfiguracji karty ustawia domyślne ukrycie dla wszystkich urządzeń.
- Jednostki i wartości z encji są zawsze bezpiecznie wstawiane do HTML (moc, temperatura podłogi, opady).

## 0.9.2 — dokumentacja i demo

- README po polsku i angielsku ze zrzutami każdej zakładki, opisem wszystkich opcji i FAQ.
- Demo w przeglądarce: https://krystianokris.github.io/aura-domu/demo/
- Nowe przykłady: `minimal.yaml`, `rooms-and-devices.yaml`, `tabs.yaml`.
- Walidacja HACS i sprawdzanie karty w GitHub Actions.

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
