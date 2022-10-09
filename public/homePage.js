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

// Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (responce) => {
        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Счёт пополнен");
        } else {
            moneyManager.setMessage(false, responce.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (responce) => {
        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Конвертация выполнена");
        } else {
            moneyManager.setMessage(false, responce.error);
        }       
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (responce) => {
        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(true, "Перевод выполнен");
        } else {
            moneyManager.setMessage(false, responce.error);
        }    
    });
}

// Работа с избранным
const favorite = new FavoritesWidget();

ApiConnector.getFavorites( (data) => {
    if (data.success) {
        favorite.clearTable();
        favorite.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
    }
})

favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (responce) => {
        if (responce.success) {
            favorite.clearTable();
            favorite.fillTable(responce.data);
            favorite.setMessage(true, "Пользователь добавлен в избранное");
        } else {
            favorite.setMessage(false, responce.error);
        }
    })
}

favorite.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (responce) => {
        if (responce.success) {
            favorite.clearTable();
            favorite.fillTable(responce.data);
            favorite.setMessage(true, "Пользователь удалён из избранного");
        } else {
            favorite.setMessage(false, responce.error);
        }

    })
}