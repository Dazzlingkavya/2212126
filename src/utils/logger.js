const logs = [];


export function logEvent(type, message, details = {}) {
const entry = {
timestamp: new Date().toISOString(),
type,
message,
details,
};
logs.push(entry);
}


export function getLogs() {
return logs;
}