// Нормалізація та валідація
export function normalizeTitle(value) {
  if (typeof value !== "string") return "";
  return value.trim().replaceAll(/\s+/g, " ");
}

export function validateList(list) {
  const errors = [];
  const title = normalizeTitle(list.title || "");
  
  if (title.length < 3 || title.length > 60) {
    errors.push("Назва має бути від 3 до 60 символів.");
  }
  
  if (!Number.isFinite(list.dailyGoal) || list.dailyGoal < 1 || list.dailyGoal > 50) {
    errors.push("Денна ціль має бути від 1 до 50 слів.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Пошук, фільтрація та агрегація
export function getListById(lists, id) {
  return lists.find((list) => list.id === id);
}

export function getListsByCategory(lists, category) {
  return lists.filter((list) => list.category === category);
}

export function getShortLabels(lists) {
  return lists.map((list) => `${normalizeTitle(list.title)} (${list.progress}%)`);
}

export function getTotalDailyGoal(lists) {
  return lists.reduce((total, list) => total + (list.dailyGoal || 0), 0);
}

export function hasCompletedLists(lists) {
  return lists.some((list) => list.progress === 100);
}

export function sortListsByTitle(lists) {
  return [...lists].sort((a, b) => {
    const titleA = normalizeTitle(a.title);
    const titleB = normalizeTitle(b.title);
    return titleA.localeCompare(titleB, "uk");
  });
}

export function sortListsByProgress(lists) {
  return [...lists].sort((a, b) => b.progress - a.progress);
}

// Незмінювані CRUD-операції
export function addList(lists, newList) {
  return [...lists, newList];
}

export function updateList(lists, targetId, changes) {
  return lists.map((list) => {
    if (list.id !== targetId) return list;
    // Забороняємо змінювати id через changes
    const updated = { ...list, ...changes };
    updated.id = list.id; 
    return updated;
  });
}

export function removeList(lists, targetId) {
  return lists.filter((list) => list.id !== targetId);
}