import React from 'react';
import { Bar as BarChart } from 'react-chartjs';

const BOOKINGS_BUCKETS = {
    'Cheap':  {
        min: 0,
        max: 100
    },
    'Normal': {
        min: 100,
        max: 200
    },
    'Expensive': {
        min: 200,
        max: 100000000
    },
}

const bookingChart = props => {
    const chartData = { labels: [], datasets: [] };
    let values = [];
    for (const bucket in BOOKINGS_BUCKETS) {
      const filteredBookingsCount = props.bookings.reduce((prev, current) => {
        if (
          current.event.price > BOOKINGS_BUCKETS[bucket].min &&
          current.event.price < BOOKINGS_BUCKETS[bucket].max
        ) {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      values.push(filteredBookingsCount);
      chartData.labels.push(bucket);
      chartData.datasets.push({
        fillColor: '#429a6d',
        strokeColor: '#2b8557',
        highlightFill: '#71c99c',
        highlightStroke: '#2b8557',
        data: values
      });
      values = [...values];
      values[values.length - 1] = 0;
    }
  
    return (
      <div style={{ textAlign: 'center' }}>
        <BarChart data={chartData} />
      </div>
    );
  };

export default bookingChart;