import { timeNow } from "../controllers/KeyPopupController";

export default function compare(a, b) {
  let beginA = a.begin;
  let beginB = b.begin;

  beginA = beginA.split("h");
  beginB = beginB.split("h");

  let timeUTC = timeNow();
  timeUTC = timeUTC.split("h");

  let sumA = parseInt(beginA[0]) * 60;
  sumA += parseInt(beginA[1]);

  let sumB = parseInt(beginB[0]) * 60;
  sumB += parseInt(beginB[1]);

  let sumUTC = parseInt(timeUTC[0]) * 60;
  sumUTC += parseInt(timeUTC[1]);

  let hourDiferenceA = sumA - sumUTC;
  let hourDiferenceB = sumB - sumUTC;

  if (hourDiferenceA < 0) hourDiferenceA *= -1;
  if (hourDiferenceB < 0) hourDiferenceB *= -1;

  let comparison = 0;

  if (hourDiferenceA > hourDiferenceB) comparison = 1;
  else if (hourDiferenceA < hourDiferenceB) comparison = -1;

  return comparison;
}
