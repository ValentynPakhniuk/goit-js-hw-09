import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = Number(e.target.elements.amount.value);
  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  for (let i = 0; i < amount; i++) {
    let newDelay = delay + (step * i);
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{
    timeout: 10000,
  },);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`,{
    timeout: 10000,
  },);
      });
  }
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}
