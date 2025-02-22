/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import "./Calendar.css"; // Import your CSS file

function Calendar() {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidays();
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // Simulate loading
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
    const allHolidays = [];

    const countries = ["DE"];
    try {
      await Promise.all(
        countries.map(async (code) => {
          const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${code}`
          );

          if (!response.ok) throw new Error("Failed to fetch holidays");

          const data = await response.json();

          const countryResponse = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
          );
          const countryData = await countryResponse.json();
          const flagUrl = countryData[0].flags.svg; // Get flag image URL

          const formattedHolidays = data.map((holiday) => ({
            title: holiday.localName,
            description: holiday.name,
            start: new Date(holiday.date).toISOString().split("T")[0],
            allDay: true,
            countryImage: flagUrl, // Use flag image from REST API
            picture: "https://via.placeholder.com/600x200.png?text=Event+Image", // Placeholder for event image
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

  const handleEventClick = (info) => {
    setModalData(info.event.extendedProps);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };
  
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="calendar-container">
      {error && (
        <div className="error-message">
          {error} <button onClick={fetchHolidays}>Retry</button>
        </div>
      )}
     <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,listWeek,listDay",
      }}
      height={"90vh"}
      events={holidays.map((holiday) => ({
        title: holiday.title,
        start: holiday.start,
        allDay: holiday.allDay,
        extendedProps: {
          description: holiday.description,
          countryImage: holiday.countryImage,
          picture: holiday.picture,
        },
      }))}
      eventClick={handleEventClick}
      eventContent={(eventInfo) => (
        <div className="event-card" title={eventInfo.event.title}>
          <img
            src={eventInfo.event.extendedProps.countryImage}
            alt="Country Flag"
            className="event-image"
          />
          <span className="event-title">
            {eventInfo.event.title.length > 20
              ? `${eventInfo.event.title.slice(0, 20)}...`
              : eventInfo.event.title}
          </span>
        </div>
      )}
    />
      {modalOpen && modalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src={modalData.countryImage}
              alt={modalData.title}
              className="country-banner"
            />
            <h2>{modalData.title}</h2>
            <p>
              <strong>Description:</strong> {modalData.description}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
