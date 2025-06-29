import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TestCalendar() {
  return (
    <div style={{ height: 600, background: "#fff" }}>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        popup
        selectable
        views={["month", "week", "day", "agenda"]}
      />
    </div>
  );
}