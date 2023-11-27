import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Dashboard = () => {
  let [data, setData] = useState([]);
  let [isHovered, setIsHovered] = useState(false);
  let [isHoveredRight, setIsHoveredRight] = useState(false);
  let [selectedSeats, setSelectedSeats] = useState([]);
  let [hoveredSeat, setHoveredSeat] = useState(null);
  let [showPrice, setShowPrice] = useState(false);
  let timeoutRef = useRef(null);
  let Lower = [
    ["L1", "L2", "L3"],
    ["L4", "L5", "L6"],
    ["L7", "L8", "L9"],
    ["L10", "L11", "L12"],
    ["L13", "L14", "L15"],
  ];
  let Upper = [
    ["U1", "U2", "U3"],
    ["U4", "U5", "U6"],
    ["U7", "U8", "U9"],
    ["U10", "U11", "U12"],
    ["U13", "U14", "U15"],
  ];
  let female = ["L3", "L4", "L8", "L9", "U3", "U4", "U8", "U9"];
  //Getting data
  useEffect(() => {
    const fetchAllData = async () => {
      const res = await fetch(`https://bus-ticket-backend.vercel.app/api/bus/get-all`, {
        method: "GET",
      });

      const val = await res.json();
      let temp = [];
      for (var i = 0; i < val.data.length; i++) {
        temp.push(val.data[i].bookedSeats);
      }
      console.log(temp);
      setData(temp);
    };
    
    fetchAllData();
  }, []);
  
  let handleSeatClick = (seat) => {
    let index = selectedSeats.indexOf(seat);

    if (index === -1 && !data.includes(seat)) {
      // If seat is not in the selectedSeats array, add it
      setSelectedSeats([...selectedSeats, seat]);
    } else if(!data.includes(seat)){
      // If seat is already in the selectedSeats array, remove it
      let newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(index, 1);
      setSelectedSeats(newSelectedSeats);
    }
  };

  let handleBooking = async () => {
    await fetch(`https://bus-ticket-backend.vercel.app/api/bus/book`, {
      method: "POST",
      body: JSON.stringify({ seat: selectedSeats }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSelectedSeats([]);
  };

  let handleSeatEnter = (seat) => {
    setHoveredSeat(seat);

    // Set a timeout to show the price after a delay (e.g., 1000 milliseconds)
    timeoutRef.current = setTimeout(() => {
      setShowPrice(true);
    }, 1000);
  };

  let handleSeatLeave = () => {
    setHoveredSeat(null);
    setShowPrice(false);

    // Clear the timeout when leaving the seat
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="row bus-container">
      <h1>Bus Travels</h1>
      <br/>
      <div className="bus-box">
        {isHovered && (
          <div className="seat-types">
            <h4 className="headings">
              Know about seat types <ErrorOutlineIcon />
            </h4>
            <div className="seat-type-data">
              <div className="seats" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Available seat
            </div>

            <div className="seat-type-data">
              <div className="seats" id="female">
                <div className="small-box" id="female"></div>
              </div>
              Available only for women
            </div>

            <div className="seat-type-data">
              <div className="seats selected" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Selected by you
            </div>

            <div className="seat-type-data">
              <div className="booked seats" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Booked by others
            </div>

            <div className="seat-type-data">
              <div className="booked seats" id="female">
                <div className="small-box" id="female"></div>
              </div>
              Booked by Female passengers
            </div>
          </div>
        )}
        <div className="lower-deck col-md-3">
          <h2 className="headings">Lower deck</h2>
          <div className="seats-container">
            {data &&
              Lower.map((seat, index) => (
                <div
                  key={index}
                  className="seat-rows"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="left">
                    <div
                      className={
                        data.includes(seat[0])
                          ? `booked seat ${
                              selectedSeats.includes(seat[0]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[0]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[0]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[0])}
                      onMouseEnter={() => handleSeatEnter(seat[0])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[0] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[0])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[0])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[0])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[0]) ? "female" : "normal"}
                      ></div>
                    </div>
                  </div>

                  <div className="right">
                    <div
                      className={
                        data.includes(seat[1])
                          ? `booked seat ${
                              selectedSeats.includes(seat[1]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[1]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[1]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[1])}
                      onMouseEnter={() => handleSeatEnter(seat[1])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[1] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[1])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[1])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[1])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[1]) ? "female" : "normal"}
                      ></div>
                    </div>
                    <div
                      className={
                        data.includes(seat[2])
                          ? `booked seat ${
                              selectedSeats.includes(seat[2]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[2]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[2]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[2])}
                      onMouseEnter={() => handleSeatEnter(seat[2])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[2] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[2])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[2])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[2])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[2]) ? "female" : "normal"}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {isHoveredRight && (
          <div className="seat-types-right">
            <h4 className="headings">
              Know about seat types <ErrorOutlineIcon />
            </h4>
            <div className="seat-type-data">
              <div className="seats" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Available seat
            </div>

            <div className="seat-type-data">
              <div className="seats" id="female">
                <div className="small-box" id="female"></div>
              </div>
              Available only for women
            </div>

            <div className="seat-type-data">
              <div className="seats selected" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Selected by you
            </div>

            <div className="seat-type-data">
              <div className="booked seats" id="normal">
                <div className="small-box" id="normal"></div>
              </div>
              Booked by others
            </div>

            <div className="seat-type-data">
              <div className="booked seats" id="female">
                <div className="small-box" id="female"></div>
              </div>
              Booked by Female passengers
            </div>
          </div>
        )}
        <div className="upper-deck col-md-3">
          <h2 className="headings">Upper deck</h2>
          <div className="seats-container">
            {data &&
              Upper.map((seat, index) => (
                <div
                  key={index}
                  className="seat-rows"
                  onMouseEnter={() => setIsHoveredRight(true)}
                  onMouseLeave={() => setIsHoveredRight(false)}
                >
                  <div className="left">
                    <div
                      className={
                        data.includes(seat[0])
                          ? `booked seat ${
                              selectedSeats.includes(seat[0]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[0]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[0]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[0])}
                      onMouseEnter={() => handleSeatEnter(seat[0])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[0] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[0])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[0])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[0])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[0]) ? "female" : "normal"}
                      ></div>
                    </div>
                  </div>

                  <div className="right">
                    <div
                      className={
                        data.includes(seat[1])
                          ? `booked seat ${
                              selectedSeats.includes(seat[1]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[1]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[1]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[1])}
                      onMouseEnter={() => handleSeatEnter(seat[1])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[1] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[1])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[1])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[1])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[1]) ? "female" : "normal"}
                      ></div>
                    </div>
                    
                    <div
                      className={
                        data.includes(seat[2])
                          ? `booked seat ${
                              selectedSeats.includes(seat[2]) ? "selected" : ""
                            }`
                          : `open seat ${
                              selectedSeats.includes(seat[2]) ? "selected" : ""
                            }`
                      }
                      id={female.includes(seat[2]) ? "female" : "normal"}
                      onClick={() => handleSeatClick(seat[2])}
                      onMouseEnter={() => handleSeatEnter(seat[2])}
                      onMouseLeave={handleSeatLeave}
                    >
                      {showPrice  &&
                      hoveredSeat === seat[2] && (
                        <div className="seat-price">
                          <CurrencyRupeeIcon />1499
                        </div>
                      )}
                      <div
                        className={
                          data.includes(seat[2])
                            ? `booked small-box ${
                                selectedSeats.includes(seat[2])
                                  ? "selected"
                                  : ""
                              }`
                            : `open small-box ${
                                selectedSeats.includes(seat[2])
                                  ? "selected"
                                  : ""
                              }`
                        }
                        id={female.includes(seat[2]) ? "female" : "normal"}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="booking-box">
        <div className="booked-seat-data">
          <div>
            {selectedSeats.length} seat | {selectedSeats.join(" ")}
          </div>
          <div>
            <CurrencyRupeeIcon />
            {selectedSeats.length * 1499}
          </div>
        </div>
        <Button variant="contained" onClick={() => handleBooking()}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
