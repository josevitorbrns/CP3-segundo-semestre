export const sum = (a, b) => {
    return a + b
}

export const divide = (a, b) => {
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

export const betterSum = (numbers) => {
    let total = 0;
    numbers.forEach(num => {
        total += num;
    })
}

export const power = (a, b) => {
    let total = 1;

    if (b > 0) {
        for(let i = 0; i < a; i++){
            total *= a;
        }
    }

    if (b < 0) {
        for(let i = 0; i > a; i--){
            total /= a;
        }
    }

    return total
}

export const betterDivide = (a, b) => {
    if (b === 0) {
        throw new Error('NÃO DIVIDIRÁS POR ZERO')
    }
    return a / b;
}