# RN Registration App

Мобильный прототип процесса регистрации пользователя (заказчик / перевозчик) на React Native CLI.

---

## Запуск (Android)

```bash
# 1. Установить зависимости
npm install

# 2. Запустить Metro
npx react-native start

# 3. В отдельном терминале — запустить на Android
npx react-native run-android
```

> **Требования:** Node 20+, Android SDK, Java 17+, подключённый Android-эмулятор или устройство.

---

## Экраны

| # | Экран | Описание |
|---|---|---|
| 1 | **PhoneInput** | Ввод телефона с маской `+7 (___) ___-__-__`, переключатель языка RU/EN |
| 2 | **RoleSelect** | Выбор роли: Заказчик / Перевозчик |
| 3 | **OTP** | 6-значный код (тестовый: `123456`), таймер 60 сек, кнопка «Отправить повторно» |
| 4 | **Registration** | Форма с валидацией, сохранение черновика, доп. поля для роли Перевозчик |
| 5 | **Profile** | Просмотр данных, кнопки «Редактировать» и «Выйти» |

---

## Зависимости

```
@react-navigation/native
@react-navigation/native-stack
react-native-screens
react-native-gesture-handler
react-hook-form
zod
@hookform/resolvers
react-i18next
i18next
@react-native-async-storage/async-storage
react-native-mask-text
@react-native-community/datetimepicker
@react-native-picker/picker
```

---

## Логика при запуске

- Есть сохранённый профиль → открывается экран **Profile**
- Есть незавершённый черновик → открывается экран **Registration** с восстановленными данными
- Иначе → начальный экран **PhoneInput**

---

## Известные ограничения

- Бэкенд отсутствует, все данные хранятся локально через AsyncStorage
- OTP-код всегда `123456`
- iOS не тестировался (сборка ориентирована на Android)
- Алгоритм проверки ИИН — стандартный казахстанский (контрольная сумма)
