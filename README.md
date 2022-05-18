## Symulator Intel 8086

Symulator został napisany w języku TypeScript przy pomocy Webpacka na Node.js. Pozwala na edycję rejestru, pamięci oraz stosu. Obsługuje następujące komendy:

- `MOV` - Przenosi dane z rejestru do rejestru, rejestru do pamięci, pamięć do rejestru itp.
- `XCHG` - Zamienia rejestr zawartości z zawartością określonego rejestru lub lokalizacji pamięci.
- `POP` - Odczytuje dwa bajty ze szczytu stosu i przechowuje je w określonym rejestrze lub lokalizacji pamięci.
- `PUSH` - Odkłada (wysyła, zapisuje lub przenosi) zawartość określonego rejestru lub lokalizacji pamięci na wierzch stosu.

### Przykładowe operacje

|Komenda|Opis|
|-|-|
|`MOV AX, BX`| Kopiuje wartość z rejestru BX do AX|
|`MOV BP, FF`| Wprowadza wartość 255 do rejestru BP|
|`XCHG AX, DX`| Zamienia wartości pomiedzy rejestrami AX i DX|
|`PUSH AX`|Zapisuje wartość rejestru AX na stosie|
|`PUSH 80`| Zapisuje wartość 128 na stosie|
|`MOV [BP], CX`| Kopiuje wartość z rejestru CX do adresu pamięci trzymanego<br/>w rejestrze CX|
|`POP SI`| Odczytuje wartość ze stosu do rejestru SI|

Wersja demonstracyjna: [Emulator 8086 (kalucky0.xyz)](https://kalucky0.xyz/8086/)