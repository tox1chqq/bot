export function toTwoDimensionalArray(array, rows, columns) {
    let result = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(array[i * columns + j]);
        }
        result.push(row);
    }
    return result;
}
