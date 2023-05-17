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
