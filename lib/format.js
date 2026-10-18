// 18000 -> "18.000"
export function formatNumber(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
