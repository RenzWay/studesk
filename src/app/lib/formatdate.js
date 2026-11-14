function formatDate(value, locale = "en-US") {
    const isIndonesian = locale.startsWith("id");
    const noDueDate = isIndonesian ? "Tidak ada tenggat" : "No due date";
    const invalidDate = isIndonesian ? "Tanggal tidak valid" : "Invalid date";
    if (!value) return noDueDate;

    if (typeof value.toDate === "function") {
        const d = value.toDate();
        return isNaN(d.getTime()) ? invalidDate : d.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (value instanceof Date) {
        return isNaN(value.getTime()) ? invalidDate : value.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (typeof value === "string") {
        const d = new Date(value);
        return isNaN(d.getTime()) ? invalidDate : d.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (typeof value === "number") {
        const d = new Date(value);
        return isNaN(d.getTime()) ? invalidDate : d.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return invalidDate;
}

export {formatDate}