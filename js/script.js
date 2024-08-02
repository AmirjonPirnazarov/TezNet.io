// scripts.js

// Предопределенные пользователи для авторизации
const users = [
    { username: 'agent1', password: 'password1' },
    { username: 'agent2', password: 'password2' },
    { username: 'agent3', password: 'password3' },
    { username: 'agent4', password: 'password4' },
    { username: 'agent5', password: 'password5' },
    { username: 'agent6', password: 'password6' },
    { username: 'admin', password: 'adminpassword' }
];

let currentUser;

function authenticate(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        return true;
    }
    return false;
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticate(username, password)) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('checklist').style.display = 'block';
        if (currentUser.username === 'admin') {
            document.getElementById('admin-button').style.display = 'block';
            document.getElementById('view-data-button').style.display = 'block';
        }
    } else {
        alert('Неправильный логин или пароль');
    }
});

let currentStep = 1;
let entries = [];

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
    entries.push(entry);

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
        agentName: currentUser.username,
        date,
        district,
        house,
        startTime,
        endTime,
        entries
    };

    let allData = JSON.parse(localStorage.getItem('agentData')) || [];
    allData.push(checklist);
    localStorage.setItem('agentData', JSON.stringify(allData));
    
    alert('Обходной лист завершен');
    location.reload();
});

function downloadData() {
    const allData = JSON.parse(localStorage.getItem('agentData')) || [];
    const csvContent = "data:text/csv;charset=utf-8," 
        + allData.map(e => 
            `${e.agentName},${e.date},${e.district},${e.house},${e.startTime},${e.endTime},${e.entries.map(entry => `${entry.apartment},${entry.status},${entry.internet},${entry.comments}`).join(',')}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "agent_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function viewData() {
    document.getElementById('checklist').style.display = 'none';
    document.getElementById('admin-view').style.display = 'block';
    const allData = JSON.parse(localStorage.getItem('agentData')) || [];
    document.getElementById('admin-data').textContent = JSON.stringify(allData, null, 2);
}

function backToChecklist() {
    document.getElementById('admin-view').style.display = 'none';
    document.getElementById('checklist').style.display = 'block';
}
