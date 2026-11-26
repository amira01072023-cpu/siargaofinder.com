/** True only for the most recently started client-side listing request. */
export function isCurrentSearchRequest(currentRequestId: number, responseRequestId: number) {
  return currentRequestId === responseRequestId;
}
