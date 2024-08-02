// scripts.js

// Предопределенные пользователи для авторизации
const users = [
    { username: 'Amir', password: '12345' },
    { username: 'agent2', password: 'password2' },
    { username: 'agent3', password: 'password3' },
    { username: 'agent4', password: 'password4' },
    { username: 'agent5', password: 'password5' },
    { username: 'agent6', password: 'password6' },
];

function authenticate(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticate(username, password)) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('checklist').style.display = 'block';
    } else {
        alert('Неправильный логин или пароль');
    }
});

let currentStep = 1;

function nextStep() {
    if (currentStep === 1) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        currentStep = 2;
    } else if (currentStep === 2) {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        currentStep = 3;
    }
}

function cancelEntry() {
    document.getElementById('apartment').value = '';
    document.getElementById('status').value = '';
    document.getElementById('internet').value = '';
    document.getElementById('comments').value = '';
}

function saveEntry() {
    const apartment = document.getElementById('apartment').value;
    const status = document.getElementById('status').value;
    const internet = document.getElementById('internet').value;
    const comments = document.getElementById('comments').value;

    const entry = { apartment, status, internet, comments };
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    alert('Данные сохранены');
    cancelEntry();
}

document.getElementById('checklist-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const district = document.getElementById('district').value;
    const house = document.getElementById('house').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    const checklist = {
        date,
        district,
        house,
        startTime,
        endTime,
        entries: JSON.parse(localStorage.getItem('entries')) || []
    };

    console.log('Обходной лист:', checklist);
    alert('Обход завершен');

    // Очистка данных
    localStorage.removeItem('entries');
    location.reload();
});
