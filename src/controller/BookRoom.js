const Rooms = require("./CreateANewRoom");
const moment = require("moment");

const BookedList = [];

const bookRoom = (req, res) => {
  const { CustomerName, Date, StartTime, EndTime, RoomID } = req.body;

  // Regular Expression for date..
  const dateRegex = /\d{1,2}-\d{1,2}-\d{4}/;

  // Regular Expression for time hh:mm am/pm..
  const timeRegex =
    /([0-9]|[0-1][0-2])\:?([0-5][0-9])? ([A|P]M) to ([0-9]|[0-1][0-2])\:?([0-5][0-9])? ([A|P]M)/gm;

  const AlreadyBooked = BookedList.some((booking) => {
    return (
      booking.RoomID === RoomID &&
      booking.Date === Date &&
      // moment().format('MMMM Do YYYY, h:mm:ss a'); installed npm moment by  npm i moment
      moment(booking.StartTime).isBefore(moment(EndTime, " h:mm:ss a")) &&
      moment(booking.EndTime, " h:mm:ss a").isAfter(
        moment(StartTime, " h:mm:ss a")
      )
    );
  });

  if (
    CustomerName &&
    Date &&
    StartTime &&
    EndTime &&
    RoomID &&
    Object.keys(req.body).length === 5
  ) {
    if (!Date.match(dateRegex)) {
      res.send({ message: "Enter the date in format of yyyy-mm-dd" });
      return;
    }
    if (!(StartTime.match(timeRegex) && EndTime.match(timeRegex))) {
      res.send({ message: "Enter the StartTime and Endtime " });
      return;
    }
    if (moment(EndTime, " h:mm:ss a").isBefore(moment(StartTime))) {
      res.send({ message: "The Endtime should be greater than start time" });
      return;
    }

    // ID created ? y/n if y given credentials passed else with no room in this specified ID
    if (!AlreadyBooked) {
      const BookingData = {
        bookingId: NewId(),
        CustomerName: CustomerName,
        Date: Date,
        StartTime: StartTime,
        EndTime: EndTime,
        RoomID: RoomID,
      };
      const isRoomCreated = Rooms.Rooms.some((room) => room.id === RoomID);
      if (isRoomCreated) {
        BookedList.push(BookingData);
        res.status(201).send({ message: "Booked successfully" });
      } else {
        res
          .status(400)
          .send({ message: "There is no room in the specified ID" });
      }
    } else {
      res
        .status(400)
        .send({
          message: "Hall is already booked for the same date and time period.",
        });
    }
  } else {
    res
      .status(400)
      .send({
        message:
          "Invalid request body. input JSON object keys with the  CustomerName, Date, StartTime, EndTime, RoomID",
      });
  }
  function NewId() {
    return `B${BookedList.length + 1}`;
  }
};
// Respond Room booking Status with booked list Data.....

const RoomsData = (req, res) => {
  const roomsWithStatus = BookedList.map((booking) => {
    const room = Rooms.Rooms.find((room) => booking.RoomID === room.id);
    //  booked time with current time

    const currentTime = new Date();
    const bookingTime = new Date(
      booking.Date +
        " " +
        moment(booking.EndTime, "h:mm:ss a").format(" h:mm:ss a")
    );

    // return the status booked or expired

    let bookingStatus;

    if (bookingTime < currentTime) {
      bookingStatus = " Expierd";
    } else {
      bookingStatus = "✨ Booked";
    }
    return {
      RoomName: room.RoomName,
      BookedStatus: bookingStatus,
      CustomerName: booking.CustomerName,
      Date: booking.Date,
      StartTime: booking.StartTime,
      EndTime: booking.EndTime,
    };
  });

  res.status(200).send({
    message: "List of all rooms with booking Status",
    Count: roomsWithStatus.length,
    // sorting rooms with booked status
    AllRoomsWithBookedData: roomsWithStatus.sort((pre, post) => {
      const LastRoom = pre.RoomName;
      const CurrentRoom = post.RoomName;
      // comparing btw last room and current room status

      if (LastRoom < CurrentRoom) {
        return -1;
      } else if (LastRoom > CurrentRoom) {
        return 1;
      } else {
        return 0;
      }
    }),
  });
};

//  customers Data....
const CustBookingData = (req, res) => {
  const customerBookedData = BookedList.map((booking) => {
    const roombooked = Rooms.Rooms.find(
      (roombooked) => roombooked.id === booking.RoomID
    );
    return {
      CustomerName: booking.CustomerName,
      RoomName: roombooked.RoomName,
      Date: booking.Date,
      StartTime: booking.StartTime,
      EndTime: booking.EndTime,
    };
  });

  res.status(200).send({
    message: "List of all customers with their booking status",
    Count: customerBookedData.length,
    AllCustomersWithBookedData: customerBookedData,
  });
};
//  Count of the same customers booked ...
const CountOfSameCoustomer = (req, res) => {
  const customerReq = req.params.customerName;
  const specificCustomer = BookedList.filter(
    (eachCustomer) => eachCustomer.CustomerName === customerReq
  );
  const EachCustomerData = specificCustomer.map((e) => {
    const roombooked = Rooms.Rooms.find(
      (roombooked) => roombooked.id === e.RoomID
    );

    function Date() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    }

    const currentTime = new Date();
    const bookingTime = new Date(
      e.Date + " " + moment(e.EndTime, "h:mm:ss a").format(" h:mm:ss a")
    );

    let bookingStatus;

    if (bookingTime < currentTime) {
      bookingStatus = "Expired";
    } else {
      bookingStatus = "Booked";
    }

    return {
      CustomerName: e.CustomerName,
      RoomName: roombooked.RoomName,
      Date: e.Date,
      StartTime: e.StartTime,
      EndTime: e.EndTime,
      BookingID: e.bookingId,
      BookingDate: Date(),
      BookingStatus: bookingStatus,
    };
  });
  res.send({
    message: `${customerReq} booked rooms, ${specificCustomer.length} times and the data is listed below`,
    SpecificCustomerData: EachCustomerData,
  });
};

module.exports = {
  bookRoom,
  RoomsData,
  CustBookingData,
  CountOfSameCoustomer,
};
