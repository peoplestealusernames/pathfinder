export type validState = "empty" | "checked" | "qued" | "wall"

export const SwapTable: { [k in validState]: string } = {
    "empty": "grey",
    "wall": "red",
    "checked": "blue",
    "qued": "cyan"
}