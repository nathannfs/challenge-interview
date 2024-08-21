export function convertPrice(price?: string) {
  if (!price) {
    return
  }

  price = price.replace(',', '.')

  return price
}
