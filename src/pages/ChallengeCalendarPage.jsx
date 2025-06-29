import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getChallenges, getHabits } from '../api';
import { parseISO, isWithinInterval, addDays } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function getRangeArray(range) {
  // range can be an array (month view) or object (week/day view)
  if (Array.isArray(range)) {
    return [range[0], range[range.length - 1]];
  }
  if (range.start && range.end) {
    return [range.start, range.end];
  }
  return [new Date(), new Date()];
}

export default function ChallengeCalendarPage({ currentUser }) {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleRange, setVisibleRange] = useState(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [start, end];
  });

  const fetchAndSetEvents = useCallback(async (range) => {
    const [allHabits, allChallenges] = await Promise.all([
      getHabits(),
      getChallenges(),
    ]);

    const userHabits = allHabits.filter(h => String(h.user_id) === String(currentUser.id));
    const userChallenges = allChallenges.filter(c => String(c.created_by) === String(currentUser.id));

    const [rangeStart, rangeEnd] = getRangeArray(range);

    // Expand habits for the visible range
    let habitEvents = [];
    userHabits.forEach(habit => {
      for (
        let d = new Date(rangeStart);
        d <= rangeEnd;
        d.setDate(d.getDate() + 1) // <-- increment date in place
      ) {
        if (
          habit.frequency === 'daily' ||
          (habit.frequency === 'weekly' && d.getDay() === 1) || // Monday
          (habit.frequency === 'monthly' && d.getDate() === 1)
        ) {
          habitEvents.push({
            id: `habit-${habit.id}-${d.toISOString().slice(0, 10)}`,
            title: habit.name + ' (Habit)',
            start: new Date(d),
            end: new Date(d),
            allDay: true,
          });
        }
      }
    });

    // Expand challenges for the visible range
    let challengeEvents = [];
    userChallenges.forEach(challenge => {
      const challengeStart = parseISO(challenge.start_date);
      const challengeEnd = parseISO(challenge.end_date);
      // Only add if challenge overlaps with visible range
      if (
        challengeEnd >= rangeStart &&
        challengeStart <= rangeEnd
      ) {
        challengeEvents.push({
          id: `challenge-${challenge.id}`,
          title: challenge.name + ' (Challenge)',
          start: challengeStart,
          end: challengeEnd,
          allDay: true,
        });
      }
    });

    setEvents([...habitEvents, ...challengeEvents]);
  }, [currentUser]);

  useEffect(() => {
    fetchAndSetEvents(visibleRange);
  }, [fetchAndSetEvents, visibleRange]);

  return (
    <div style={{ height: 600, background: "#fff", position: "relative", zIndex: 10 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        popup
        selectable
        views={["month", "week", "day", "agenda"]}
        date={currentDate}
        onNavigate={date => setCurrentDate(date)}
        onRangeChange={range => setVisibleRange(getRangeArray(range))}
      />
    </div>
  );
}