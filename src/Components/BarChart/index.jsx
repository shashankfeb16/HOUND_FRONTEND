import React, { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

function BarChart({ contData, handleDateChange, selectedDate }) {
  const chartContainer = useRef(null);
  useEffect(() => {
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const likesData = Array.from({ length: daysInMonth }, (_, day) => ({
      x: day,
      y: Math.random() * 1000,
    }));
    const commentsData = Array.from({ length: daysInMonth }, (_, day) => ({
        x: day,
        y: Math.random() * 1000,
      }));
    // const contributionData = contData.map((dataPoint, day) => ({
    //   x: Number(dataPoint.name),
    //   y: dataPoint.y,
    // }));
    // let contributionData;

    // if (contData.length > 0) {
    //   contributionData = contData.map((dataPoint, day) => ({
    //     x: Number(dataPoint.name),
    //     y: dataPoint.y,
    //     z: dataPoint.receiptCount || 0,
    //   }));
    // }
    // else {
    //   contributionData = Array.from({ length: daysInMonth }, (_, day) => ({
    //     x: day,
    //     y: Math.random() * 1000,
    //     z: 0,
    //   }));
    // }
    // console.log(contributionData);
    // Create the chart
    Highcharts.chart(chartContainer.current, {
      chart: {
        type: "column",
      },
      title: {
        text: null,
        align: "left",
        margin: 80,
        style: {
          color: "#585858",
        },
      },
      subtitle: {
        text: null,
        align: "left",
        style: {
          color: "#444",
        },
      },
      xAxis: {
        categories: Array.from({ length: daysInMonth }, (_, day) =>
          day.toString(),
        ),
        title: {
          text: "Days",
        },
      },
      yAxis: {
        title: {
          text: "Likes and Comments ",
        },
      },
    //   tooltip: {
    //     formatter() {
    //       return `Day: <b>${Math.round(
    //         this.x,
    //       )}</b><br/>Contribution Amount: <b> ₹ ${Math.round(
    //         this.y,
    //       )?.toLocaleString(
    //         "en-IN",
    //       )}</b><br/>Number of Receipts: <b>${this.point.z?.toLocaleString(
    //         "en-IN",
    //       )}`;
    //     },
    //   },

      series: [
        {
          name: "Likes",
          data: likesData,
          
        //   color: {
        //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //     stops: [
        //       [0, "#A63EB6"],
        //       [1, "#B33F99"],
        //     ],
        //   },
        },
        {
            name: 'Comments',
            data: commentsData,
        }
      ],
    });
  }, [contData]);

  return (
    <div
      style={{
        background: "#fff",
        paddingTop: "24px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <div style={{ paddingLeft: "24px" }}>
        <Typography
          style={{ fontSize: "24px", fontWeight: 500, color: "#444" }}
        >
          Monthly Likes and Comments
        </Typography>
        <Typography
          style={{ fontSize: "14px", fontWeight: 500, color: "#444" }}
        >
          {/* National Level */}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Align items to the right
          paddingRight: "24px",
          marginBottom: "24px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Month"
            value={selectedDate}
            openTo="month"
            onChange={(newDate) => handleDateChange(newDate)}
            disableFuture
            renderInput={(params) => <TextField {...params} />}
            views={["year", "month"]} // Show only year and month
            format="MMMM YYYY" // Format for display
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: "190px", height: "46px", marginTop: "24px" }}
          />
        </LocalizationProvider>
      </div>
      <div
        ref={chartContainer}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      />
    </div>
  );
}

export default BarChart;
