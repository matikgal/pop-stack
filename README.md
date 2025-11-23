# PopStack // MEDIA_TRACKING_PLATFORM

Platforma społecznościowa dla entuzjastów filmów, seriali i gier wideo. **Oceniaj, recenzuj** i dziel się swoją rozrywkową podróżą ze znajomymi.

## Quick Start

### Tryb Demo (Bez Backendu)

Idealny do prezentacji w portfolio:

1.  Zainstaluj zależności:
    ```bash
    npm install
    ```
2.  Uruchom w trybie demo:
    ```bash
    npm run demo  # Włącza tryb demo
    npm run dev
    ```

### Pełna Wersja (Z Supabase)

Do użytku produkcyjnego:

1.  Zainstaluj zależności:
    ```bash
    npm install
    ```
2.  Skopiuj plik środowiskowy i wypełnij klucze:
    ```bash
    cp .env.example .env.local
    # Wypełnij klucze Supabase i API w .env.local
    ```
3.  Uruchom aplikację:
    ```bash
    npm run dev
    ```

## Funkcje

* **Discover**: Przeglądaj tysiące filmów, seriali i gier.
* **Rate & Review**: System 10-gwiazdkowych ocen z recenzjami tekstowymi.
* **Watchlist**: Śledź, co chcesz obejrzeć/zagrać.
* **Collections**: Twórz własne kolekcje i foldery.
* **Social**: System znajomych i kanał aktywności (**activity feed**).
* **Stats**: Śledź swoje nawyki oglądania/grania.
* **i18n**: Wsparcie dla języka **Polskiego** i **Angielskiego**.
* **Themes**:
    * **Dark** (Ciemny): Nowoczesny, głęboki motyw.
    * **Light** (Jasny): Klasyczny, jasny interfejs.
* **Responsive**: Działa poprawnie na wszystkich urządzeniach.

## Tech Stack

Projekt został zbudowany przy użyciu nowoczesnych technologii:

* **Frontend**: **React 18**, **TypeScript**, **TailwindCSS**.
* **Backend**: **Supabase** (PostgreSQL, Auth, RLS).
* **APIs**: **TMDB** (filmy/seriale), **RAWG** (gry).
* **State**: React Query, Context API.
* **UI**: Radix UI, Custom components.

## Demo Mode vs Pełna Wersja

| Funkcja | Demo Mode | Pełna Wersja |
| :--- | :--- | :--- |
| **Backend** | ❌ Niepotrzebny | ✅ Supabase |
| **Autoryzacja** | ❌ Mock user | ✅ Realna autoryzacja |
| **Dane** | 📦 Przykładowe dane | 💾 Rzeczywista baza danych |
| **Koszt** | 💰 $0 | 💰 $0 (darmowy plan) |
| **Zastosowanie** | 🎨 Portfolio | 🚀 Produkcja |

## Deployment

### Vercel (Rekomendowane)

1.  Build:
    ```bash
    npm run build
    ```
2.  Deploy:
    ```bash
    vercel --prod
    ```

### Wersja Demo

1.  Build:
    ```bash
    npm run build:demo
    ```
2.  Deploy:
    ```bash
    vercel --prod
    ```
> **Uwaga**: Ustaw zmienną środowiskową **VITE\_DEMO\_MODE=true** w konfiguracji Vercel.

---
*Code & Design by [matikgal](https://github.com/matikgal)*
