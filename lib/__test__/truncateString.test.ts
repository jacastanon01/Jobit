import { expect, test } from 'vitest';
import { truncateString } from '../utils';

test('truncateString: 257 lorem ipsum with 100 as the num parameters should be truncated to the first 100 caracters with ... at the end', () => {
  expect(
    truncateString(
      'Supercilia patens laeva fragoribus cognomentum Alexandri in Seleucus Alexandri Seleucus inpetrabilis Seleucus regna Alexandri patens successorio protentus gentibus teneret Saracenis vero teneret magnum dextra gentibus teneret Seleucus inpetrabilis ab ripis.',
      100,
    ),
  ).toBe(
    'Supercilia patens laeva fragoribus cognomentum Alexandri in Seleucus Alexandri Seleucus inpetrabilis...',
  );
});
