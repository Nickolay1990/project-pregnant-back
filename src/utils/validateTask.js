export function validateName(name) {
    if (typeof name !== 'string') return 'name must be a string';
    const n = name.trim();
    if (n.length < 1 || n.length > 96) return 'name length must be 1..96';
    return null;
  }

  export function validateDateStr(dateStr) {
    if (typeof dateStr !== 'string') return "date must be string in 'YYYY-MM-DD'";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return "date must be in 'YYYY-MM-DD' format";

    const today = new Date();
    const todayStr = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      .toISOString()
      .slice(0, 10);
    if (dateStr < todayStr) return 'date must be today or later';
    return null;
  }
