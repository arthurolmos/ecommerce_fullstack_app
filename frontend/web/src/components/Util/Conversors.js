

export const floatToCurrencyString = (value) => {
    const fixed = value ? value.toFixed(2) : 0
    
    let format = fixed.toString()
    format = format.replace('.', ',')

    return 'R$ ' + format
}
