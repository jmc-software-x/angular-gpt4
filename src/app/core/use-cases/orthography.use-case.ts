import type { OrthographyResponse } from '@interfaces/orthography.response';
import { environment } from 'environments/environment';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('No se pudo realizar la corrección');
    const data = (await resp.json()) as OrthographyResponse;

    return {
      of: true,
      ...data
    }
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizarr la corrección',
    };
  }
};
