
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//TODO: make it not modify original
export function removeItem<K>(Array: K[], item: K): K[] {
    const index = Array.indexOf(item, 0);
    if (index > -1) {
        Array.splice(index, 1);
    }
    return Array
}