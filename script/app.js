const log = console.log;

$items = Array.from(document.querySelectorAll('.items'));
$btnTime = Array.from(document.querySelectorAll('.btnTime'));
$btnList = Array.from(document.querySelectorAll('.btnTime'));

async function obtainData () {
  const response = await fetch('http://127.0.0.1:5500/data.json'),
        json = await response.json();

  return json;
}

function renderTime (arrTime) {
  let timesCurr = Array.from(document.querySelectorAll('.timeCurrent')),
      timesPrev = Array.from(document.querySelectorAll('.timePrevious'));

  timesCurr.forEach( (timeCurr, index) => {
    timeCurr.innerHTML = `${arrTime[index].current}hrs`;
  });

  timesPrev.forEach( (timePrev, index) => {
    timePrev.innerHTML = `Last Week - ${arrTime[index].previous}hrs`;
  });

}

async function changeTime (e) {
  let dataTimeBtn = e.target.getAttribute('data-time'),
      objJSON = await obtainData(),
      objectTime = [];

  objJSON.forEach( obj => {
    if(dataTimeBtn == "daily") objectTime.push(obj.timeframes.daily);
    else if(dataTimeBtn == "weekly") objectTime.push(obj.timeframes.weekly);
    else if(dataTimeBtn == "monthly") objectTime.push(obj.timeframes.monthly);
  });

  // show int the DOM The time
  renderTime(objectTime);
}

$btnTime.forEach(btn => {
  btn.addEventListener('click', changeTime);
});

$btnTime.forEach(btn => {
  btn.addEventListener('click', () => {
    // reset active buttons
    document.querySelectorAll('li.active').forEach( listActive => {
      listActive.classList.remove('active');
    });

    btn.classList.add('active');
  });
})
