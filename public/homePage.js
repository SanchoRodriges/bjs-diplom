// Выход из личного кабинета
const logout = new LogoutButton();

logout.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

// Получение информации о пользователе
ApiConnector.current(user => {
    if (user.success) {
        ProfileWidget.showProfile(user.data);
    }
});

// Получение текущих курсов валюты
const rates = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(stocks => {
        if (stocks.success) {
            rates.clearTable();
            rates.fillTable(stocks.data);
        }
    });
}

getRates();

setInterval( getRates(), 60000);
