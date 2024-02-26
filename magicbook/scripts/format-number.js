function formatNumber(isDecimal, decimalNumber, romanNumber) {
  return isDecimal === '1' ? decimalNumber : romanNumber;
}

Prince.addScriptFunc('format-number', formatNumber);
