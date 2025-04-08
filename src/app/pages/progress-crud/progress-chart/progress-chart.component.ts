import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';
import { IProgress } from '../../../core/interfaces/progress.interface.js';

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css',
})
export class ProgressChartComponent implements AfterViewInit, OnChanges {
  @Input() progresses: IProgress[] = [];
  public weightChart: Chart | null = null;
  public fatPercentajeChart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.makeCharts();
  }

  ngAfterViewInit(): void {
    this.makeCharts();
  }

  makeCharts() {
    const weightChartCanvas = document.getElementById(
      'weightCanvas'
    ) as HTMLCanvasElement;
    const fatPercentageChartCanvas = document.getElementById(
      'fatPercentageCanvas'
    ) as HTMLCanvasElement;
    if (!weightChartCanvas || !fatPercentageChartCanvas) return;

    this.weightChart?.destroy();
    this.fatPercentajeChart?.destroy();
    const weightData = this.progresses.map((p) => p.weight);
    const weightLabels = this.progresses.map((p) =>
      format(p.date.toString(), 'dd/MM/yyyy')
    );
    const fatPercentageData = this.progresses.map((p) => p.fatPercentage);
    const fatPercentageLabels = this.progresses.map((p) =>
      format(p.date.toString(), 'dd/MM/yyyy')
    );
    this.weightChart = this.makeLineChart(
      weightChartCanvas,
      weightLabels,
      weightData,
      'Peso',
      'rgba(255, 99, 132, 1)'
    );
    this.fatPercentajeChart = this.makeLineChart(
      fatPercentageChartCanvas,
      fatPercentageLabels,
      fatPercentageData,
      'Grasa corporal',
      'rgba(0, 195, 255, 1)'
    );
  }

  makeLineChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    label: string,
    borderColor: string
  ): Chart {
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
