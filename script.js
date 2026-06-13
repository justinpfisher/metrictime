// Metric Calendar converter
// Attribution: J. Fisher / MetricCalendar.org

(function(){
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function pad2(n){ return String(n).padStart(2, "0"); }

  function isLeapYear(year){
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function monthLengths(year){
    return [36,37,36,37,36,37,36,37,36,isLeapYear(year) ? 38 : 37];
  }

  function dayOfYearFromGregorian(year, month, day){
    const start = Date.UTC(year, 0, 1);
    const current = Date.UTC(year, month - 1, day);
    return Math.floor((current - start) / MS_PER_DAY) + 1;
  }

  function gregorianFromDayOfYear(year, doy){
    const date = new Date(Date.UTC(year, 0, doy));
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    };
  }

  function metricFromDayOfYear(year, doy){
    const lengths = monthLengths(year);
    let remaining = doy;
    for(let i = 0; i < lengths.length; i++){
      if(remaining <= lengths[i]){
        return { year, month: i + 1, day: remaining };
      }
      remaining -= lengths[i];
    }
    throw new Error("Day of year is outside the Metric Calendar year.");
  }

  function dayOfYearFromMetric(year, month, day){
    const lengths = monthLengths(year);
    if(!Number.isInteger(year) || year < 1) throw new Error("Enter a valid Metric year.");
    if(!Number.isInteger(month) || month < 1 || month > 10) throw new Error("Metric month must be 01 through 10.");
    const max = lengths[month - 1];
    if(!Number.isInteger(day) || day < 1 || day > max){
      throw new Error(`Metric month ${pad2(month)} has ${max} days in ${year}.`);
    }
    return lengths.slice(0, month - 1).reduce((a,b) => a + b, 0) + day;
  }

  function classifyMetricDate(year, month, day){
    const leap = isLeapYear(year);
    const isEvenMonth = month % 2 === 0;
    const length = monthLengths(year)[month - 1];

    if(month === 10 && leap && day === 38){
      return {
        type: "leap",
        title: "Leap Day / New Year’s Eve",
        weekInMonth: null,
        weekInYear: null,
        metricDay: null
      };
    }

    if(isEvenMonth && day === 37){
      const final = month === 10 && !leap;
      return {
        type: "bonus",
        title: final ? "Bonus Rest Day / New Year’s Eve" : "Bonus Rest Day",
        weekInMonth: null,
        weekInYear: null,
        metricDay: null
      };
    }

    if(day > 36 && day <= length){
      return {
        type: "bonus",
        title: "Bonus Rest Day",
        weekInMonth: null,
        weekInYear: null,
        metricDay: null
      };
    }

    const metricDay = ((day - 1) % 6) + 1;
    const weekInMonth = Math.floor((day - 1) / 6) + 1;
    const weekInYear = (month - 1) * 6 + weekInMonth;
    const focus = metricDay >= 1 && metricDay <= 4;

    return {
      type: focus ? "focus" : "rest",
      title: focus ? `Focus Day ${metricDay}` : `Rest Day ${metricDay - 4}`,
      weekInMonth,
      weekInYear,
      metricDay
    };
  }

  function formatMetric(obj){ return `${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }
  function formatGregorian(obj){ return `g${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }

  function convertGregorianToMetric(year, month, day){
    const doy = dayOfYearFromGregorian(year, month, day);
    const metric = metricFromDayOfYear(year, doy);
    const status = classifyMetricDate(metric.year, metric.month, metric.day);
    return {
      gregorian: { year, month, day },
      metric,
      dayOfYear: doy,
      status,
      leap: isLeapYear(year)
    };
  }

  function convertMetricToGregorian(year, month, day){
    const doy = dayOfYearFromMetric(year, month, day);
    const gregorian = gregorianFromDayOfYear(year, doy);
    const metric = { year, month, day };
    const status = classifyMetricDate(year, month, day);
    return {
      gregorian,
      metric,
      dayOfYear: doy,
      status,
      leap: isLeapYear(year)
    };
  }

  function renderResult(target, data, mode){
    if(!target) return;
    target.className = "result-box success";
    const primary = mode === "metricToGregorian" ? formatGregorian(data.gregorian) : formatMetric(data.metric);
    const secondaryLabel = mode === "metricToGregorian" ? "Metric date" : "Gregorian";
    const secondary = mode === "metricToGregorian" ? formatMetric(data.metric) : formatGregorian(data.gregorian);

    target.innerHTML = `
      <div class="result-title">Converted date</div>
      <div class="result-date">${primary}</div>
      <div class="result-secondary">${secondaryLabel}: <strong>${secondary}</strong></div>
    `;
  }

  function renderError(target, message){
    if(!target) return;
    target.className = "result-box error";
    target.innerHTML = `<div class="result-title">Check the date</div><p><strong>${message}</strong></p>`;
  }

  function setTodayBlocks(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    let data;
    try { data = convertGregorianToMetric(year, month, day); } catch(e) { return; }

    document.querySelectorAll("[data-today-metric]").forEach(el => el.textContent = formatMetric(data.metric));
    document.querySelectorAll("[data-today-gregorian]").forEach(el => el.textContent = formatGregorian(data.gregorian));
    document.querySelectorAll("[data-today-status]").forEach(el => el.textContent = data.status.title);
    document.querySelectorAll("[data-today-month]").forEach(el => el.textContent = `Metric month ${pad2(data.metric.month)}`);
    document.querySelectorAll("[data-today-week]").forEach(el => el.textContent = data.status.weekInMonth ? `Metric week ${pad2(data.status.weekInMonth)}` : "Outside metric week");
    document.querySelectorAll("[data-today-day]").forEach(el => el.textContent = data.status.metricDay ? `Metric day ${data.status.metricDay}` : "—");
  }

  function initConverter(){
    const toggleButtons = document.querySelectorAll("[data-converter-mode]");
    const gregorianPanel = document.querySelector("[data-panel-gregorian]");
    const metricPanel = document.querySelector("[data-panel-metric]");
    const result = document.querySelector("[data-converter-result]");

    let mode = "gregorianToMetric";

    function setMode(nextMode){
      mode = nextMode;
      toggleButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.converterMode === mode));
      if(gregorianPanel) gregorianPanel.classList.toggle("hidden", mode !== "gregorianToMetric");
      if(metricPanel) metricPanel.classList.toggle("hidden", mode !== "metricToGregorian");
      if(result){
        result.className = "result-box";
        result.innerHTML = `<div class="result-title">Ready</div><p>Enter a date and select convert.</p>`;
      }
    }

    toggleButtons.forEach(btn => btn.addEventListener("click", () => setMode(btn.dataset.converterMode)));

    const gForm = document.querySelector("[data-gregorian-form]");
    const gInput = document.querySelector("[data-gregorian-input]");

    if(gInput){
      const now = new Date();
      gInput.value = `${now.getFullYear()}-${pad2(now.getMonth()+1)}-${pad2(now.getDate())}`;
    }

    if(gForm){
      gForm.addEventListener("submit", function(event){
        event.preventDefault();
        try{
          const value = gInput.value;
          if(!value) throw new Error("Choose a Gregorian date.");
          const [year, month, day] = value.split("-").map(Number);
          renderResult(result, convertGregorianToMetric(year, month, day), "gregorianToMetric");
        }catch(e){ renderError(result, e.message); }
      });
    }

    const mForm = document.querySelector("[data-metric-form]");
    const yearInput = document.querySelector("[data-metric-year]");
    const monthInput = document.querySelector("[data-metric-month]");
    const dayInput = document.querySelector("[data-metric-day]");

    if(yearInput){ yearInput.value = new Date().getFullYear(); }

    if(mForm){
      mForm.addEventListener("submit", function(event){
        event.preventDefault();
        try{
          const year = Number(yearInput.value);
          const month = Number(monthInput.value);
          const day = Number(dayInput.value);
          renderResult(result, convertMetricToGregorian(year, month, day), "metricToGregorian");
        }catch(e){ renderError(result, e.message); }
      });
    }

    setMode(mode);
  }

  function initYearExample(){
    const yearEl = document.querySelector("[data-year-example]");
    const output = document.querySelector("[data-year-example-output]");
    if(!yearEl || !output) return;

    function update(){
      const year = Number(yearEl.value || new Date().getFullYear());
      const leap = isLeapYear(year);
      const finalMetric = { year, month:10, day: leap ? 38 : 37 };
      const finalGreg = gregorianFromDayOfYear(year, leap ? 366 : 365);
      output.innerHTML = `
        <strong>${year} is a ${leap ? "leap" : "standard"} year.</strong><br>
        Final Gregorian day: ${formatGregorian(finalGreg)}<br>
        Final Metric day: ${formatMetric(finalMetric)}
      `;
    }
    yearEl.value = new Date().getFullYear();
    yearEl.addEventListener("input", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTodayBlocks();
    initConverter();
    initYearExample();
  });

  window.MetricCalendar = {
    isLeapYear,
    monthLengths,
    convertGregorianToMetric,
    convertMetricToGregorian,
    formatMetric,
    formatGregorian,
    classifyMetricDate
  };
})();
