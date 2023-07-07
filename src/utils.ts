export function generateToken(e: number) {
    for (var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""), n = [], i = 0; i < e; i++) {
        var r = (Math.random() * (t.length - 1)).toFixed(0);
        n[i] = t[r]
    }
    return n.join("")
}