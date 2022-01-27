import SmartView from './smart-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { typeName } from '../mock/mockData';

const changeArrayName = typeName.map((element) => element.toUpperCase());

const renderColorsChart = (colorsCtx) => {
  new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...changeArrayName],
      datasets: [{
        data: [400, 300, 200, 160, 150, 100],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderDaysChart = (typeCtx) => {
  new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...changeArrayName],
      datasets: [{
        data: [4, 3, 2, 1, 1, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx) => (
  new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...changeArrayName],
      datasets: [{
        data: [4, 3, 2, 1, 1, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const createSiteTripInfoTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="money" width="900"></canvas>
      </div>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="type" width="900"></canvas>
      </div>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="time" width="900"></canvas>
      </div>
  </section>`
);


export default class StatisticsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(tasks) {
    super();

    this._data = tasks;

    this.#setCharts();
  }

  get template() {
    return createSiteTripInfoTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    // if (this.#datepicker) {
    //   this.#datepicker.destroy();
    //   this.#datepicker = null;
    // }

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }


  restoreHandlers = () => {
    this.#setCharts();
    // this.#setDatepicker();
  }

  #dateChangeHandler = ([dateFrom, dateTo]) => {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateData({
      dateFrom,
      dateTo,
    });
  }

  #setCharts = () => {
    // Нужно отрисовать два графика
    const colorsCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyChart = renderColorsChart(colorsCtx, this._data);
    this.#typeChart = renderDaysChart(typeCtx, this._data);
    this.#timeChart = renderTimeChart(timeCtx, this._data);
  }
}
