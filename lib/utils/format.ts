export const formatPrice = (price: number, currency = "XOF", locale = "fr-FR"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price)
}

export const formatDate = (dateString: string, locale = "fr-FR"): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
