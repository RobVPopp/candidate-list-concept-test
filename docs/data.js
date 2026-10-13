// Candidate sets for the concept test. All people and employers are invented.
// Every set is in variant-A order (by fit) and has the same criteria pattern per row, so ranks and traps line up:
//   row 1: right to work unknown (#1 in A, #2 in B/C)
//   row 2: not UK-based, fit 90-93 (#2 in A, #7 in B/C)
//   row 6: stale profile (3 years), bookkeeper-type title, fit about 83
// st = states for [role, qual, month, uk, rtw]: m met, n not met, u unknown.
// BC = row indexes (0-based, into the A-ordered list) in B and C order.
(function () {
  var BC = [2, 0, 3, 4, 6, 5, 1, 7, 8, 9];
  var ST = ['mmmmu', 'mmmnu', 'mmmmm', 'mmumm', 'mmmmu', 'nmmmm', 'mmumm', 'mmmnu', 'mumnm', 'nmumm'];

  // t = [matched job title, employer, dates]; q = [qualifying body, year]; m = month-end sentence (with [[month-end]]);
  // not = override text for a not-met criterion; rtw = right-to-work text (with [[keyword]]).
  function build(rows, fits, confs) {
    return rows.map(function (r, i) {
      var st = ST[i], ev = {}, key = ['role', 'qual', 'month', 'uk', 'rtw'];
      var s = function (k) { return { m: 'met', n: 'not', u: 'unk' }[st[k]]; };
      var uk = r.country === 'United Kingdom';
      ev.role = s(0) === 'unk' ? ['unk'] : [s(0), 'CV · Experience', '[[' + r.t[0] + ']], ' + r.t[1] + ', ' + r.t[2] + (s(0) === 'not' ? '. No accountant role listed' : '')];
      ev.qual = s(1) === 'unk' ? ['unk'] : [s(1), 'CV · Qualifications', '[[' + r.q[0] + ']] qualified, ' + r.q[1]];
      ev.month = s(2) === 'unk' ? ['unk'] : [s(2), 'CV · Experience', r.m];
      ev.uk = [s(3), 'Profile · Location', '[[' + r.loc + ']], ' + r.country + (s(3) === 'not' ? '. No UK address on CV' : '')];
      ev.rtw = s(4) === 'unk' ? ['unk'] : [s(4), 'CV · Personal details', r.rtw];
      // Short reason shown in the B drawer for a not-met criterion.
      ev.why = {
        role: 'Current role: ' + r.title,
        month: 'No month-end reporting in the record',
        uk: 'Based in ' + r.loc,
        qual: 'No recognised qualification in the record',
        rtw: 'No right to work in the record'
      };
      return { n: r.n, loc: r.loc, yrs: r.yrs, title: r.title, upd: r.upd, fit: fits[i], conf: confs[i], ev: ev };
    });
  }

  var set1 = build([
    { n: 'Priya Nair', loc: 'Manchester', country: 'United Kingdom', yrs: 7, title: 'Senior Accountant', upd: '2 weeks ago', t: ['Senior Accountant', 'Northern Freight Ltd', '2019 to present'], q: ['ACCA', 2018], m: 'Owned [[month-end]] close and reporting for three entities' },
    { n: 'Tomas Weber', loc: 'Berlin', country: 'Germany', yrs: 9, title: 'Senior Accountant', upd: '1 month ago', t: ['Senior Accountant', 'Brandt Logistik GmbH', '2017 to present'], q: ['ACCA', 2016], m: 'Prepared [[month-end]] reporting packs for group finance' },
    { n: 'Hannah Clarke', loc: 'Leeds', country: 'United Kingdom', yrs: 5, title: 'Financial Accountant', upd: '1 month ago', t: ['Financial Accountant', 'Calder Foods', '2020 to present'], q: ['CIMA', 2020], m: 'Delivered [[month-end]] reporting within five working days', rtw: '[[British citizen]]' },
    { n: 'Samuel Okoye', loc: 'London', country: 'United Kingdom', yrs: 6, title: 'Management Accountant', upd: '3 weeks ago', t: ['Management Accountant', 'Harlow Retail', '2019 to present'], q: ['ACA', 2019], rtw: 'Right to work: [[Settled status]]' },
    { n: 'Aiko Tanaka', loc: 'Bristol', country: 'United Kingdom', yrs: 4, title: 'Accountant', upd: '2 months ago', t: ['Accountant', 'Severn Packaging', '2021 to present'], q: ['ACCA', 2021], m: 'Responsible for [[month-end]] journals and reconciliations' },
    { n: 'Daniel Evans', loc: 'Cardiff', country: 'United Kingdom', yrs: 8, title: 'Bookkeeper', upd: '3 years ago', t: ['Bookkeeper', 'Evans & Co', '2016 to 2023'], q: ['CIMA', 2017], m: 'Prepared [[month-end]] trial balance for small clients', rtw: '[[British citizen]]' },
    { n: 'Meera Shah', loc: 'Birmingham', country: 'United Kingdom', yrs: 3, title: 'Accountant', upd: '1 month ago', t: ['Accountant', 'Midlands Print', '2022 to present'], q: ['ACA', 2022], rtw: 'Right to work: [[Indefinite leave to remain]]' },
    { n: 'Lucas Martin', loc: 'Madrid', country: 'Spain', yrs: 6, title: 'Accountant', upd: '2 months ago', t: ['Accountant', 'Iberia Textiles SL', '2019 to present'], q: ['ACCA', 2018], m: 'Ran [[month-end]] close for two subsidiaries' },
    { n: 'Chloe Bennett', loc: 'Edinburgh', country: 'United Kingdom', yrs: 2, title: 'Junior Accountant', upd: '1 month ago', t: ['Junior Accountant', 'Forth Estates', '2023 to present'], m: 'Duties listed are [[accounts payable]] and expenses. No month-end reporting', rtw: '[[British citizen]]' },
    { n: 'Rahul Verma', loc: 'Glasgow', country: 'United Kingdom', yrs: 10, title: 'Payroll Officer', upd: '4 months ago', t: ['Payroll Officer', 'Clyde Services', '2015 to present'], q: ['CIMA', 2014], rtw: '[[British citizen]]' }
  ], [94, 92, 91, 89, 86, 83, 80, 78, 70, 64], [71, 68, 88, 76, 72, 61, 74, 66, 55, 52]);

  var set2 = build([
    { n: 'Fatima Rahman', loc: 'Sheffield', country: 'United Kingdom', yrs: 7, title: 'Senior Financial Accountant', upd: '3 weeks ago', t: ['Senior Financial Accountant', 'Don Valley Steel Ltd', '2018 to present'], q: ['ACA', 2017], m: 'Led [[month-end]] close and reporting across four cost centres' },
    { n: 'Julien Moreau', loc: 'Paris', country: 'France', yrs: 9, title: 'Group Accountant', upd: '1 month ago', t: ['Group Accountant', 'Maison Verrier SA', '2016 to present'], q: ['ACCA', 2015], m: 'Produced [[month-end]] consolidation packs for the group' },
    { n: 'Grace Adeyemi', loc: 'Nottingham', country: 'United Kingdom', yrs: 5, title: 'Financial Accountant', upd: '1 month ago', t: ['Financial Accountant', 'Trent Dairy Co-op', '2020 to present'], q: ['CIMA', 2019], m: 'Delivered [[month-end]] reporting by working day four', rtw: '[[British citizen]]' },
    { n: 'Callum Reid', loc: 'Reading', country: 'United Kingdom', yrs: 6, title: 'Commercial Accountant', upd: '3 weeks ago', t: ['Commercial Accountant', 'Thames Valley Telecom', '2019 to present'], q: ['ACA', 2018], rtw: 'Right to work: [[Settled status]]' },
    { n: 'Ines Duarte', loc: 'Southampton', country: 'United Kingdom', yrs: 4, title: 'Reporting Accountant', upd: '2 months ago', t: ['Reporting Accountant', 'Solent Marine Group', '2021 to present'], q: ['ACCA', 2020], m: 'Prepared [[month-end]] accruals and balance sheet reconciliations' },
    { n: 'Martin Hughes', loc: 'Swansea', country: 'United Kingdom', yrs: 8, title: 'Accounts Bookkeeper', upd: '3 years ago', t: ['Accounts Bookkeeper', 'Hughes Builders Merchants', '2015 to 2023'], q: ['CIMA', 2016], m: 'Posted [[month-end]] journals and a trial balance for small clients', rtw: '[[British citizen]]' },
    { n: 'Anjali Menon', loc: 'Coventry', country: 'United Kingdom', yrs: 3, title: 'Project Accountant', upd: '1 month ago', t: ['Project Accountant', 'Warwick Engineering Group', '2022 to present'], q: ['ACA', 2022], rtw: 'Right to work: [[Indefinite leave to remain]]' },
    { n: 'Piotr Nowak', loc: 'Warsaw', country: 'Poland', yrs: 6, title: 'Finance Accountant', upd: '2 months ago', t: ['Finance Accountant', 'Wisla Packaging sp. z o.o.', '2019 to present'], q: ['ACCA', 2018], m: 'Closed the books each [[month-end]] for two entities' },
    { n: 'Ruth Gallagher', loc: 'Aberdeen', country: 'United Kingdom', yrs: 2, title: 'Graduate Accountant', upd: '1 month ago', t: ['Graduate Accountant', 'Granite Offshore Services', '2023 to present'], m: 'Duties listed are [[purchase ledger]] and expenses. No month-end reporting', rtw: '[[British citizen]]' },
    { n: 'Oluwaseun Bello', loc: 'Newcastle', country: 'United Kingdom', yrs: 10, title: 'Payroll Administrator', upd: '4 months ago', t: ['Payroll Administrator', 'Tyne Care Group', '2015 to present'], q: ['CIMA', 2014], rtw: '[[British citizen]]' }
  ], [93, 91, 90, 88, 85, 83, 81, 79, 71, 65], [73, 66, 86, 78, 70, 59, 72, 64, 57, 50]);

  var set3 = build([
    { n: 'Zainab Qureshi', loc: 'Liverpool', country: 'United Kingdom', yrs: 8, title: 'Lead Accountant', upd: '2 weeks ago', t: ['Lead Accountant', 'Mersey Port Logistics', '2018 to present'], q: ['ACCA', 2017], m: 'Managed [[month-end]] close and reporting for three subsidiaries' },
    { n: 'Mateusz Kowalski', loc: 'Warsaw', country: 'Poland', yrs: 9, title: 'Senior Finance Accountant', upd: '1 month ago', t: ['Senior Finance Accountant', 'Baltic Freight sp. z o.o.', '2017 to present'], q: ['ACCA', 2016], m: 'Prepared [[month-end]] reporting packs for head office' },
    { n: 'Eleanor Whitfield', loc: 'Bath', country: 'United Kingdom', yrs: 5, title: 'Financial Reporting Accountant', upd: '1 month ago', t: ['Financial Reporting Accountant', 'Avon Furniture Group', '2020 to present'], q: ['CIMA', 2020], m: 'Delivered [[month-end]] reporting within four working days', rtw: '[[British citizen]]' },
    { n: 'Dev Patel', loc: 'Leicester', country: 'United Kingdom', yrs: 6, title: 'Finance Business Partner', upd: '3 weeks ago', t: ['Finance Business Partner', 'Soar Valley Foods', '2019 to present'], q: ['ACA', 2019], rtw: 'Right to work: [[Settled status]]' },
    { n: 'Chen Wei', loc: 'Norwich', country: 'United Kingdom', yrs: 4, title: 'Statutory Accountant', upd: '2 months ago', t: ['Statutory Accountant', 'Broadland Insurance Services', '2021 to present'], q: ['ACCA', 2021], m: 'Responsible for [[month-end]] journals and bank reconciliations' },
    { n: 'Gareth Pryce', loc: 'Wrexham', country: 'United Kingdom', yrs: 7, title: 'Senior Bookkeeper', upd: '3 years ago', t: ['Senior Bookkeeper', 'Pryce & Daughters', '2016 to 2023'], q: ['CIMA', 2017], m: 'Prepared [[month-end]] trial balance and VAT returns for small clients', rtw: '[[British citizen]]' },
    { n: 'Isabel Fernandes', loc: 'Cambridge', country: 'United Kingdom', yrs: 3, title: 'Cost Accountant', upd: '1 month ago', t: ['Cost Accountant', 'Fenland Biotech', '2022 to present'], q: ['ACA', 2022], rtw: 'Right to work: [[Indefinite leave to remain]]' },
    { n: 'Henrik Larsen', loc: 'Amsterdam', country: 'Netherlands', yrs: 6, title: 'Accountant', upd: '2 months ago', t: ['Accountant', 'Noordzee Trading BV', '2019 to present'], q: ['ACCA', 2018], m: 'Ran [[month-end]] close for two group companies' },
    { n: 'Amara Okafor', loc: 'Dundee', country: 'United Kingdom', yrs: 2, title: 'Trainee Accountant', upd: '1 month ago', t: ['Trainee Accountant', 'Tay Estates', '2023 to present'], m: 'Duties listed are [[sales ledger]] and credit control. No month-end reporting', rtw: '[[British citizen]]' },
    { n: 'Vikram Singh', loc: 'Wolverhampton', country: 'United Kingdom', yrs: 11, title: 'Payroll and Benefits Officer', upd: '4 months ago', t: ['Payroll and Benefits Officer', 'Black Country Housing', '2014 to present'], q: ['CIMA', 2013], rtw: '[[British citizen]]' }
  ], [95, 93, 92, 89, 87, 84, 80, 77, 72, 63], [74, 69, 90, 75, 73, 62, 75, 65, 54, 51]);

  window.SETS = { 1: set1, 2: set2, 3: set3 };
  window.BC_ORDER = BC;
})();
