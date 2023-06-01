export function sendErrorLog(error: Error) {
  fetch('api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: error.message, error: error }),
  });
}
