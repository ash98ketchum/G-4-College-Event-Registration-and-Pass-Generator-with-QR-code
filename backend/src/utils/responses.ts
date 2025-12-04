export const ok = (data: any) => ({ status: 'ok', data });
export const err = (message: string) => ({ status: 'error', message });
