Hooks.on('render', (app, html) => {
    // Wyszukiwanie wszystkich inputów z placeholderem "Szukaj undefined"
    html.find('input[placeholder="Szukaj undefined"]').each(function() {
        // Zmiana placeholdera na "Szukaj niezdefiniowane"
        $(this).attr('placeholder', 'Szukaj');
    });
});

// Alternatywne rozwiązanie, jeśli inputy pojawiają się później w DOM
Hooks.on('ready', () => {
    // Szuka wszystkich inputów, które mają placeholder "Szukaj undefined"
    $('input[placeholder="Szukaj undefined"]').attr('placeholder', 'Szukaj');
});

// Dodajemy listener na zmiany w DOM (np. dynamicznie dodane elementy)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            $('input[placeholder="Szukaj undefined"]').attr('placeholder', 'Szukaj');
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
