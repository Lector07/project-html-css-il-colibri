/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje nasłuchiwacz zdarzeń do przycisku rezerwacji stolika.
 */
document.addEventListener('DOMContentLoaded', () => {
    var reserveButton = document.getElementById('reserve-table');
    if (reserveButton) {
        reserveButton.addEventListener('click', () => {
            if (validateForm()) rezerwujStolik();
        });
    }
});

/**
 * Waliduje formularz rezerwacji.
 * @returns {boolean} - Zwraca true, jeśli formularz jest poprawny, w przeciwnym razie false.
 */
function validateForm() {
    var date = document.getElementById('date').value,
        table = document.getElementById('table').value,
        time = document.getElementById('time').value,
        name = document.getElementById('name').value,
        email = document.getElementById('email').value,
        phone = document.getElementById('phone').value,
        newsletterEmail = document.getElementById('newsletter-email').value;
    if (!date || !table || !time || !name || !email || !phone) {
        alert('Proszę wypełnić wszystkie pola formularza.');
        return false;
    }
    if (!validateDate(date)) {
        alert('Proszę wybrać datę od dzisiaj do 2 tygodni, od wtorku do niedzieli.');
        return false;
    }
    if (!validateTime(time)) {
        alert('Proszę wybrać godzinę od 10:00 do 21:00.');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Proszę podać prawidłowy adres email.');
        return false;
    }
    if (!validatePhone(phone)) {
        alert('Proszę podać prawidłowy numer telefonu (9 cyfr).');
        return false;
    }
    if (newsletterEmail && !validateEmail(newsletterEmail)) {
        alert('Proszę podać prawidłowy adres email do newslettera.');
        return false;
    }
    return true;
}

/**
 * Waliduje datę rezerwacji.
 * @param {string} date - Data rezerwacji.
 * @returns {boolean} - Zwraca true, jeśli data jest poprawna, w przeciwnym razie false.
 */
function validateDate(date) {
    const today = new Date(),
        selectedDate = new Date(date),
        twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    const dayOfWeek = selectedDate.getUTCDay(),
        isValidDay = dayOfWeek >= 2 && dayOfWeek <= 7;
    return selectedDate >= today && selectedDate <= twoWeeksFromNow && isValidDay;
}

/**
 * Waliduje godzinę rezerwacji.
 * @param {string} time - Godzina rezerwacji.
 * @returns {boolean} - Zwraca true, jeśli godzina jest poprawna, w przeciwnym razie false.
 */
function validateTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 10 && hours <= 21 && (hours !== 21 || minutes === 0);
}

/**
 * Waliduje adres email.
 * @param {string} email - Adres email.
 * @returns {boolean} - Zwraca true, jeśli adres email jest poprawny, w przeciwnym razie false.
 */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Waliduje adres email do newslettera.
 * @param {string} newsletterEmail - Adres email do newslettera.
 * @returns {boolean} - Zwraca true, jeśli adres email jest poprawny, w przeciwnym razie false.
 */
function validateEmail2(newsletterEmail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail);
}

/**
 * Waliduje numer telefonu.
 * @param {string} phone - Numer telefonu.
 * @returns {boolean} - Zwraca true, jeśli numer telefonu jest poprawny, w przeciwnym razie false.
 */
function validatePhone(phone) {
    return /^\d{9}$/.test(phone);
}

/**
 * Przetwarza rezerwację stolika.
 */
function rezerwujStolik() {
    var date = document.getElementById('date').value;
    var table = document.getElementById('table').value;
    var time = document.getElementById('time').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    alert(`Szczegóły rezerwacji:\nData: ${date}\nStolik: ${table}\nGodzina: ${time}\nImię i nazwisko: ${name}\nEmail: ${email}\nTelefon: ${phone}`);
    window.location.href = 'il-colibri.html';
}

/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje nasłuchiwacz zdarzeń do przycisku zapisu do newslettera.
 */
document.addEventListener('DOMContentLoaded', () => {
    var newsletterButton = document.querySelector('.newsletter-form button');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', event => {
            event.preventDefault();
            var newsletterEmail = document.querySelector('.newsletter-form input[type="email"]').value;
            if (validateEmail2(newsletterEmail)) {
                alert('Zostałeś zapisany do newslettera!');
            } else {
                alert('Proszę podać prawidłowy adres email do newslettera.');
            }
        });
    }
});

/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje animacje do elementów na stronie.
 */
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.reservation-content img, .dish-menu-primi h3, .about-content img, .wine-content h3, .dish-menu-secondi img'),
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.isIntersecting ? entry.target.classList.add('animate') : entry.target.classList.remove('animate');
            });
        });
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje płynne przewijanie do linków w menu.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav .menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        });
    });
});

/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje klasę 'visible' do stopki, gdy sekcja newslettera jest widoczna.
 */
document.addEventListener('DOMContentLoaded', () => {
    var footer = document.querySelector('footer'),
        aboutSection = document.querySelector('.newsletter'),
        endOfPage = document.querySelector('body');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? footer.classList.add('visible') : footer.classList.remove('visible');
        });
    }, {threshold: 0});
    observer.observe(aboutSection);
});

/**
 * Funkcja uruchamiana po załadowaniu DOM.
 * Dodaje funkcjonalność hamburger menu.
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu');
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

/**
 * Dodaje klasę 'active' do klikniętych kafelków.
 */
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        tile.classList.toggle('active');
    });
});