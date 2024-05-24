function generateHoliday(
  selectedInboundFlight,
  selectedOutboundFlight,
  selectedHotel,
  selectedExcursions,
  departDate,
  returnDate
) {
    const generateHoliday = {
        inbound: selectedInboundFlight,
        outbound: selectedOutboundFlight,
        hotel: selectedHotel,
        excursions: selectedExcursions,
        departDate,
        returnDate
    }

}

export { generateHoliday };
