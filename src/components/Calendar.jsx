import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Import the CSS file

const countries = {
  FR: { name: "France", flag: "🇫🇷" },
  JP: { name: "Japan", flag: "🇯🇵" },
  US: { name: "USA", flag: "🇺🇸" },
  DE: { name: "Germany", flag: "🇩🇪" },
  GB: { name: "UK", flag: "🇬🇧" },
  CA: { name: "Canada", flag: "🇨🇦" },
  MA: { name: "Morocco", flag: "🇲🇦" },
};

function Calendar() {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
    const allHolidays = [];

    try {
      // Fetch holidays for each country
      await Promise.all(
        Object.entries(countries).map(async ([code, { name }]) => {
          const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${code}`
          );

          if (!response.ok) throw new Error("Failed to fetch holidays");

          const data = await response.json();

          const formattedHolidays = data.map((holiday) => ({
            title: `${holiday.localName} - ${name}`,
            description: holiday.name, // Description
            start: new Date(holiday.date).toISOString().split("T")[0],
            allDay: true,
            country: name, // Store country name
            picture: "https://via.placeholder.com/100" // Replace with actual picture URL
          }));

          allHolidays.push(...formattedHolidays);
        })
      );

      setHolidays(allHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setError("Could not load holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom render function for event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-block" title={eventInfo.event.title}>
        <strong>{eventInfo.event.title}</strong>
      </div>
    );
  };

  // Custom event tooltip
  const handleEventMouseEnter = (info) => {
    const tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    tooltip.innerHTML = `
      <strong>${info.event.title}</strong><br>
      ${info.event.extendedProps.description}<br>
      <img src="${info.event.extendedProps.picture}" alt="${info.event.title}" />
    `;
    document.body.appendChild(tooltip);
    tooltip.style.position = "absolute";
    tooltip.style.left = `${info.jsEvent.clientX + 5}px`;
    tooltip.style.top = `${info.jsEvent.clientY + 5}px`;

    info.el.addEventListener("mouseleave", () => {
      tooltip.remove();
    });
  };

  return (
    <div className="calendar-container">
      {error && (
        <div className="error-message">
          {error}{" "}
          <button onClick={fetchHolidays}>Retry</button>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading holidays...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"80vh"}
          events={holidays}
          eventContent={renderEventContent} // Use custom event renderer
          eventMouseEnter={handleEventMouseEnter} // Handle mouse enter to show tooltip
        />
      )}
    </div>
  );
}

export default Calendar;
