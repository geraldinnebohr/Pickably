import React from 'react';

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];
class Pruebas extends React.Component {	
    render() {
      const options = {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "Apple",  y: 10  },
                      { label: "Orange", y: 15  },
                      { label: "Banana", y: 25  },
                      { label: "Mango",  y: 30  },
                      { label: "Grape",  y: 28  }
                  ]
         }]
     }
          
     return (
        <div>
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
      );
    }
  }


//     render() {	
//         const options = {
//             theme: "light2",
//             title: {
//                 text: "Stock Price of NIFTY 50"
//             },
//             axisY: {
//                 title: "Price in USD",
//                 prefix: "$",
//                 includeZero: false
//             },
//             data: [{
//                 type: "line",
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "$#,##0.00",
//                 dataPoints: dataPoints
//             }]
//         }
//         return (
//         <div>
//             <CanvasJSChart options = {options} 
//             />
//             {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//         </div>
//         );
//     }

//     componentDidMount(){
//         var chart = this.chart;
//         fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             for (var i = 0; i < data.length; i++) {
//                 dataPoints.push({
//                     x: new Date(data[i].x),
//                     y: data[i].y
//                 });
//             }
//             chart.render();
//         });
//     }
// }


export default Pruebas;
