
const filterButton = document.getElementById('filter-button')
filterButton.onclick = () => {
    if(fromDate.value && toDate.value) {
        const coindeskUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}&currency=${currency.value}`
        getDateFromApi(coindeskUrl);
        
    }
}

const getDateFromApi = (url) => {
    axios.get(url)
        .then(response => printResult(response.data.bpi))
        .catch(error => console.log(error));
}

const printResult = (bpiData) => {
    const bpiDates = Object.keys(bpiData);
    const bpiValues = Object.values(bpiData);

    const bpiNumbers = bpiValues.map(num => Number(num))
    const maxBpi = Math.max(...bpiNumbers)
    const minBpi = Math.min(...bpiNumbers)

    maxPrice.innerText = `Max: ${maxBpi} ${currency.value}`
    minPrice.innerText = `Min: ${minBpi} ${currency.value}`

    const ctx = document.getElementById('canvas').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bpiDates,
            datasets: [
                {
                    label: 'Bitcoin Price Index',
                    backgroundColor: 'gray',
                    borderColor: 'gray',
                    data: bpiValues,
                    fill: false,
                    tension: 0.01
                }
            ]
        }
    });
}