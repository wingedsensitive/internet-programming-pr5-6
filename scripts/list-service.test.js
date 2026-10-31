import { lists } from "./data.js";
import {
  normalizeTitle,
  validateList,
  getListById,
  getListsByCategory,
  getShortLabels,
  getTotalDailyGoal,
  hasCompletedLists,
  addList,
  updateList,
  removeList,
  sortListsByTitle
} from "./list-service.js";

// Функція для перевірок
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`❌ ${message}: очікувалося ${expected}, отримано ${actual}`);
  }
  console.log(`✅ ${message}`);
}

console.log("--- Запуск тестів (Word Lists) ---\n");

// 1. Нормалізація пробілів
assertEqual(normalizeTitle("  Слова   IT "), "Слова IT", "Нормалізація назви");

// 2. Успішна валідація
const validCheck = validateList({ title: "Ідіоми", dailyGoal: 10 });
assertEqual(validCheck.isValid, true, "Успішна валідація коректного списку");

// 3. Неуспішна валідація (граничне значення)
const invalidCheck = validateList({ title: "То", dailyGoal: 100 });
assertEqual(invalidCheck.isValid, false, "Неуспішна валідація некоректного списку");

// 4. Пошук існуючого id
const foundList = getListById(lists, 2);
assertEqual(foundList.title, "Комп'ютерне обладнання", "Знайдено список за id 2");

// 5. Пошук відсутнього id
const notFoundList = getListById(lists, 999);
assertEqual(notFoundList, undefined, "Відсутній id повертає undefined");

// 6. Фільтрація за категорією
const techLists = getListsByCategory(lists, "tech");
assertEqual(techLists.length, 2, "Знайдено 2 списки в категорії 'tech'");

// 7. Агрегація для звичайного масиву
const totalGoal = getTotalDailyGoal(lists);
assertEqual(totalGoal, 110, "Загальна денна ціль правильно підрахована");

// 8. Агрегація для порожнього масиву
const emptyTotalGoal = getTotalDailyGoal([]);
assertEqual(emptyTotalGoal, 0, "Агрегація порожнього масиву повертає 0");

// 9. Відсутність мутації при додаванні
const newList = { id: 9, title: "Новий список", category: "general", dailyGoal: 5, progress: 0, isFavorite: false };
const listsAfterAdd = addList(lists, newList);
assertEqual(lists.length, 8, "Оригінальний масив не змінився після addList");
assertEqual(listsAfterAdd.length, 9, "Новий масив містить доданий елемент");

// 10. Відсутність мутації при оновленні
const listsAfterUpdate = updateList(lists, 1, { progress: 50 });
assertEqual(lists[0].progress, 30, "Оригінальний об'єкт не змінився після updateList");
assertEqual(listsAfterUpdate[0].progress, 50, "Оновлений масив містить нове значення");

// 11. Сортування українських назв
const sorted = sortListsByTitle(lists);
assertEqual(sorted[0].title, "Бізнес та фінанси", "Правильне алфавітне сортування");

console.log("\n--- Демонстраційний звіт ---");
console.log(`Загальна кількість списків: ${lists.length}`);
console.log(`Загальна ціль вивчення: ${getTotalDailyGoal(lists)} слів на день`);
console.log("Чи є завершені списки (100%):", hasCompletedLists(lists) ? "Так" : "Ні");
console.log("\nКороткі представлення списків (Labels):");
console.log(getShortLabels(lists).join("\n"));