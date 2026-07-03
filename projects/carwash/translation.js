// Переводы страницы проекта: Carwash.
window.PAGE_I18N = {
    ru: {
        "doc.title": "Carwash",
        "project.title": "Терминал самообслуживания для автомойки",
        "overview.title": "Обзор Проекта",
        "overview.text": "Решение «под ключ» для автоматизации поста самообслуживания на автомойке: приём любых видов оплаты, управление оборудованием и учёт выручки — без кассира и круглосуточно. Сердце системы — надёжный терминал на базе Raspberry Pi с ПО на Python: многопроцессная архитектура изолирует каждый узел, а автозапуск через systemd обеспечивает бесперебойную работу 24/7.",
        "feature.title": "Возможности",
        "point1": "Принимает все популярные способы оплаты — монеты, купюры и банковские карты (эквайринг).",
        "point2": "Собственная программа лояльности с картами клиентов повышает возвращаемость и средний чек.",
        "point3": "Интуитивный выбор программы мойки одной кнопкой и честное посекундное списание баланса.",
        "point4": "Прямое управление всем оборудованием мойки через плату реле — от воды до пены и воска.",
        "point5": "Яркая светодиодная матрица и TFT-дисплей всегда показывают клиенту баланс и текущий режим.",
        "point6": "Полная бизнес-аналитика: смены, выручка и популярность программ сохраняются в базе данных.",
        "point7": "Самодиагностика узлов и мгновенная реакция на сбои сводят простои к минимуму.",
        "point8": "Управление из любой точки: веб-панель администратора и удалённое обновление прошивки без выезда на объект.",
        "cardreader.title": "Считыватель карт лояльности",
        "cardreader.text": "Компактное устройство на базе микроконтроллера STM32, разработанное специально под программу лояльности. Подключается к терминалу по UART и мгновенно распознаёт карту клиента по простому текстовому протоколу — быстрое и надёжное начисление и списание бонусов."
    },
    en: {
        "doc.title": "Carwash",
        "project.title": "Self-service car wash terminal",
        "overview.title": "Project Overview",
        "overview.text": "A turnkey solution for automating a self-service car wash bay: it accepts every kind of payment, controls the equipment, and tracks revenue — with no cashier, around the clock. At the heart of the system is a rugged Raspberry Pi-based terminal running Python firmware: a multi-process architecture isolates each subsystem, and systemd auto-start keeps it running 24/7.",
        "feature.title": "Highlights",
        "point1": "Accepts every popular payment method — coins, banknotes, and bank cards (acquiring).",
        "point2": "A built-in loyalty program with customer cards boosts retention and average spend.",
        "point3": "Intuitive one-button wash program selection with fair, per-second balance deduction.",
        "point4": "Direct control of all wash equipment through a relay board — from water to foam and wax.",
        "point5": "A bright LED matrix and a TFT display always show the customer their balance and the current mode.",
        "point6": "Full business analytics: shifts, revenue, and program popularity are all stored in a database.",
        "point7": "Subsystem self-diagnostics and instant fault response keep downtime to a minimum.",
        "point8": "Manage it from anywhere: an admin web panel and remote firmware updates with no site visit required.",
        "cardreader.title": "Loyalty Card Reader",
        "cardreader.text": "A compact STM32-based device built specifically for the loyalty program. It connects to the terminal over UART and instantly recognizes the customer's card via a simple text protocol — fast, reliable bonus crediting and redemption."
    }
};
