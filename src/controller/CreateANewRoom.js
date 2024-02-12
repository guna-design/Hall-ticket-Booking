const Rooms = [];

const CreateANewRoom = (req, res) => {
  const { Seats, Amenities, PriceforAnHour } = req.body;

  const numberRegex = /^(0|[1-9]\d*)$/;

  const RoomData = {
    id: Rooms.length + 1,
    RoomName: `Room${Rooms.length + 1}`,
    Seats: Seats,
    Amenities: Amenities,
    PriceforAnHour: `Rs.${PriceforAnHour}`,
  };

  if (
    Seats &&
    Amenities &&
    PriceforAnHour &&
    Object.keys(req.body).length === 3
  ) {
    if (!numberRegex.test(Seats)) {
      res.send({ message: "Enter the value of seats in number" });
      return;
    } else if (!numberRegex.test(PriceforAnHour)) {
      res.send({ message: "Enter the value of Price in number" });
      return;
    } else {
      Rooms.push(RoomData);
      res
        .status(201)
        .send({
          message: "Room created successfully",
          TotalAvailableRooms: Rooms.length,
          AvailableRooms: Rooms,
        });
    }
  } else {
    res.status(400).send({ message: "Invalid request body" });
  }
};

module.exports = { CreateANewRoom, Rooms };
