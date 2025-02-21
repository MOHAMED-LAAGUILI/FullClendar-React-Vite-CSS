import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Import the CSS file

function Calendar() {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidays(selectedCountry, selectedYear);
  }, [selectedCountry, selectedYear]);

  const fetchHolidays = async (countryCode, year) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      );

      if (!response.ok) throw new Error("Failed to fetch holidays");

      const data = await response.json();

      const formattedHolidays = data.map((holiday) => ({
        title: holiday.localName || "Holiday",
        start: new Date(holiday.date).toISOString().split("T")[0],
        allDay: true,
      }));

      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setError("Could not load holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calendar-container">
      <div className="controls">
        <div className="select-group">
          <label>Select Country:</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="US">🇺🇸 USA</option>
            <option value="GB">🇬🇧 UK</option>
            <option value="FR">🇫🇷 France</option>
            <option value="DE">🇩🇪 Germany</option>
            <option value="CA">🇨🇦 Canada</option>
            <option value="MA">🇲🇦 Maroc</option>

          </select>
        </div>

        <div className="select-group">
          <label>Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {[currentYear, currentYear + 1, currentYear + 2].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}{" "}
          <button onClick={() => fetchHolidays(selectedCountry, selectedYear)}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading holidays...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth timeGridWeek timeGridDay",
          }}
          height={"80vh"}
          events={holidays}
        />
      )}
    </div>
  );
}

export default Calendar;
