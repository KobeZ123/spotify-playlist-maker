// gets a random integer between zero and max (exclusive)
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// converts a duration (minutes and seconds) to milliseconds 
export function durationToMilliseconds(minutes: number, seconds: number) {
    return (seconds * 1000) + (minutes * 60000);
}

// given the milliseconds, return the lowest ms that rounds to the same second
export function millisecondsLowerBound(milliseconds: number) {
    return milliseconds - 499;
}

// given the milliseconds, return the highest ms that rounds to the same second
export function millisecondsUpperBound(milliseconds: number) {
    return milliseconds + 499;
}

// given the milliseconds, rounds to the nearest convertable seconds 
export function millisecondsRounded(milliseconds: number) {
    if (milliseconds % 1000 < 500) {
        return milliseconds - (milliseconds % 1000);
    } else {
        return milliseconds + (milliseconds - (milliseconds % 1000));
    }
}

// reduces an array of strings to a comma-separated string 
export function reduceStringArray(array: string[]): string {
    return array.reduce((accumulator, item) => {
        if (accumulator === "") {
            return item;
        } else {
            return accumulator + "," + item;
        }
    }, "");
}