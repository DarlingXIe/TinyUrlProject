/**
 * Created by DalinXie on 17/5/28.
 */
/**
 * Created by DalinXie on 17/5/26.
 */
import { Component, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../services/url.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

var path = require('path');
@Component({
  selector: 'app-url',
  templateUrl: './url.component.html'
})
export class UrlComponent {
  //title = 'app works!';
  longUrl: string;
  shortUrl: string;
  totalClicks: number;
  time: string;
  shortUrlToShow: string;
  lineChartData = [];
  lineChartLabels = [];
  lineChartType = 'line';

  @ViewChildren (BaseChartDirective) charts: QueryList<BaseChartDirective>;

  constructor(private route: ActivatedRoute, private urlService: UrlService, private router: Router) {

  }
  //Todo: deal with long Url which is null
  // ngOnInit() {
  //   this.route.params.subscribe(
  //     params => {
  //       this.shortUrl = params['shortUrl'];
  //       this.urlService.getLongUrl(this.shortUrl).subscribe(
  //         result => {
  //           this.longUrl = result.longUrl;
  //           if (result.longUrl) {
  //           this.urlService.getStatsInfo(this.shortUrl, 'totalClicks').subscribe(
  //               result => {
  //                 this.totalClicks = result;
  //               },
  //               error => console.log(error)
  //             );
  //             // render 4 charts
  //             this.renderChart(this.shortUrl, 'referer', 'pie');
  //             this.renderChart(this.shortUrl, 'countryOrRegion', 'doughnut');
  //             this.renderChart(this.shortUrl, 'platform', 'polarArea');
  //             this.renderChart(this.shortUrl, 'browser', 'radar');
  //             this.getTime('hour');
  //             } else {
  //              this.router.navigateByUrl('client/404');
  //            }
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //       // get total clicks;
  //       // this.urlService.getStatsInfo(this.shortUrl, 'totalClicks').subscribe(
  //       //   result => {
  //       //     this.totalClicks = result;
  //       //   },
  //       //   error => console.log(error)
  //       // );
  //       // // render 4 charts
  //       // this.renderChart(this.shortUrl, 'referer', 'pie');
  //       // this.renderChart(this.shortUrl, 'countryOrRegion', 'doughnut');
  //       // this.renderChart(this.shortUrl, 'platform', 'polarArea');
  //       // this.renderChart(this.shortUrl, 'browser', 'radar');
  //       // this.getTime('hour');
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.shortUrl = params['shortUrl'];
        this.shortUrlToShow = "http://localhost:3000/" + this.shortUrl;
        this.urlService.getLongUrl(this.shortUrl).subscribe(
          result => {
            this.longUrl = result.longUrl;
          },
          error => {
            console.log(error);
          }
        );
        // get total clicks;
        this.urlService.getStatsInfo(this.shortUrl, 'totalClicks').subscribe(
          result => {
            this.totalClicks = result;
          },
          error => console.log(error)
        );
        //render 4 charts
        this.renderChart(this.shortUrl, 'referer', 'pie');
        this.renderChart(this.shortUrl, 'countryOrRegion', 'doughnut');
        this.renderChart(this.shortUrl, 'platform', 'polarArea');
        this.renderChart(this.shortUrl, 'browser', 'radar');
        this.getTime('hour');
        // this.getTime('day');
        // this.getTime('month');
      },
      error => {
        console.log(error);
      }
    );
  }
  renderChart(shortUrl: string, info: string, chartType: string) {
    this[chartType + 'ChartLabels'] = [];
    this[chartType + 'ChartData'] = [];
    this[chartType + 'ChartType'] = chartType;

    const that = this;
    this.urlService.getStatsInfo(shortUrl, info).subscribe (
      results => {
        results.forEach(function(item) {
          that[chartType + 'ChartLabels'].push(item._id);
          that[chartType + 'ChartData'].push(item.count);
        });
        that.updateChart();
      },
      error => console.log(error)
    );
  }
  getTime(time: string): void {
    this.time = time;
    this.lineChartData = [];
    this.lineChartLabels = [];

    const that = this;
    this.urlService.getStatsInfo(this.shortUrl, time).subscribe(
      results => {
        results.forEach(function (info) {
          let legend = '';
          if (time === 'hour') {
            if (info._id.minutes < 10) {
              info._id.minutes = '0' + info._id.minutes;
            }
            legend = info._id.hour + ':' + info._id.minutes;
          }
          if (time === 'day') {
            legend = info._id.hour + ':00';
          }
          if (time === 'month') {
            legend = info._id.month + '/' + info._id.day;
          }
          that.lineChartLabels.push(legend);
          that.lineChartData.push(info.count);
        });
        that.updateChart();
      },
      error => console.log(error)
    );
  }
  private updateChart(): void {
    this.charts.forEach(chart => {
      chart.ngOnChanges({});
    });
  }
}
