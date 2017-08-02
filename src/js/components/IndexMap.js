import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactHighcharts from 'react-highcharts'
import ReactHighmaps from 'react-highcharts/ReactHighmaps'

export default class IndexMap extends Component {
    constructor(props){
        super(props)
        this.state = {config: {}}
    }

    componentDidMount() {
        $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/us-counties-unemployment.json&callback=?', function (data) {
            /**
             * Data parsed from http://www.bls.gov/lau/#tables
             *
             * 1. Go to http://www.bls.gov/lau/laucntycur14.txt (or similar, updated datasets)
             * 2. In the Chrome Developer tools console, run this code:
             * copy(JSON.stringify(document.body.innerHTML.split('\n').filter(function (s) { return s.indexOf('<PUT DATE HERE IN FORMAT e.g. Feb-14>') !== -1; }).map(function (row) { row = row.split('|'); return { code: 'us-' + row[3].trim().slice(-2).toLowerCase() + '-' + row[2].trim(), name: row[3].trim(), value: parseFloat(row[8]) }; })))
             * 3. The data is now on your clipboard, paste it below
             */
             // https://img.hcharts.cn/mapdata/countries/us/us-all-all.js
            $.getScript('https://img.hcharts.cn/mapdata/custom/asia.js', function(){
                let countiesMap = Highcharts.geojson(Highcharts.maps['custom/asia']),
                options;

                // Add state acronym for tooltip
                Highcharts.each(countiesMap, function (mapPoint, i) {
                    mapPoint.drilldown = mapPoint.properties['hc-key'];
                    mapPoint.value = i;
                });
                options = {
                    chart: {
                        borderWidth: 1,
                        marginRight: 50,// for the legend
                        events: {
                            drilldown: function(e) {
                                if (!e.seriesOptions) {
                                    var chart = this,
                                        mapKey = 'countries/' + e.point.drilldown + '/' + e.point.drilldown + '-all',
                                        // Handle error, the timeout is cleared on success
                                        fail = setTimeout(function () {
                                            if (!Highcharts.maps[mapKey]) {
                                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                                fail = setTimeout(function () {
                                                    chart.hideLoading();
                                                }, 1000);
                                            }
                                        }, 5000);
                                    // Show the spinner
                                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner
                                    // Load the drilldown map
                                    $.getScript('https://img.hcharts.cn/mapdata/' + mapKey + '.js', function () {
                                        data = Highcharts.geojson(Highcharts.maps[mapKey]);
                                        // Set a non-random bogus value
                                        $.each(data, function (i) {
                                            this.value = i;
                                        });
                                        // Hide loading and add series
                                        chart.hideLoading();
                                        clearTimeout(fail);
                                        chart.addSeriesAsDrilldown(e.point, {
                                            name: e.point.name,
                                            data: data,
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}'
                                            }
                                        });
                                    });
                                }
                                this.setTitle(null, { text: e.point.name });
                            },
                            drillup: function() {
                                this.setTitle(null, {text: 'Asia Country Population Proportion'})
                            }
                        }
                    },
                    title: {
                        text: 'Asia Country Population Proportion'
                    },
                    legend: {
                        title: {
                            text: 'Population Proportion',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            }
                        },
                        layout: 'vertical',
                        align: 'left',
                        floating: true,
                        valueDecimals: 0,
                        valueSuffix: '%',
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                        symbolRadius: 0,
                        symbolHeight: 14
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: "bottom"
                        }
                    },
                    colorAxis: {
                        dataClasses: [{
                            from: 0,
                            to: 5,
                            color: '#F1EEF6'
                        },
                        {
                            from: 5,
                            to: 10,
                            color: '#D4B9DA'
                        },
                        {
                            from: 10,
                            to: 15,
                            color: '#C994C7'
                        },
                        {
                            from: 15,
                            to: 20,
                            color: '#DF65B0'
                        },
                        {
                            from: 20,
                            color: '#DD1C77'
                        }]
                    },
                    plotOptions: {
                        map: {
                            states: {
                                hover: "#EEDD66"
                            }
                        }
                    },
                    series: [{
                        data: countiesMap,
                        name: 'Population proportion',
                        tooltip: {
                            valueSuffix: '%'
                        },
                        borderWidth: 0.5,
                        states: {
                            hover: {
                                color: '#bada55'
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }],
                    drilldown: {
                        activeDataLabelStyle: {
                            color: '#ffffff',
                            textDecoration: 'none',
                            textShadow: '0 0 3px #000000'
                        },
                        drillUpButton: {
                            relativeTo: 'spacingBox',
                            position: {
                                x: 0,
                                y: 20
                            }
                        }
                    }
                };
                this.setState({config: options})
            }.bind(this))
        }.bind(this));
    }

    render() {
        return (
            <ReactHighmaps config={this.state.config}/>
        )
    }
}