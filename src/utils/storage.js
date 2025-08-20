export function saveUrls(urls) {
localStorage.setItem("shortenedUrls", JSON.stringify(urls));
}
export function loadUrls() {
const saved = localStorage.getItem("shortenedUrls");
if (!saved) return [];
return JSON.parse(saved).filter(u => new Date(u.expiryDate) > new Date());
}
export function saveClicks(clicks) {
localStorage.setItem("clickLogs", JSON.stringify(clicks));
}
export function loadClicks() {
const saved = localStorage.getItem("clickLogs");
return saved ? JSON.parse(saved) : [];
}
export function cleanupExpired() {
const urls = loadUrls();
const active = urls.filter(u => new Date(u.expiryDate) > new Date());
saveUrls(active);
}