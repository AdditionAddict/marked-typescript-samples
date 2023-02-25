import { delay, firstValueFrom, of } from 'rxjs';

export const mockApi = {
  get: () => {
    return firstValueFrom(
      // mocking of an api call
      of({
        chtml:
          '<mrow><msup><mfenced><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfenced><mn>2</mn></msup></mrow>',
      }).pipe(delay(400))
    );
  },
};
