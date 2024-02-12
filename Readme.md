HALL TICKET BOOKING API


1) Creating a Room with 

*Number of Seats available
*amenities in room 
*Price for 1 Hour          Endpoint: POST /create

2) Booking a Room with

*Customer Name
*Date
*Start Time
*End Time
*Room ID                   Endpoint: POST /bookingARoom

3) List all Rooms with Booked Data With
*Room Name
*booked Status
*custumer name
*Date
*Start Time
*End Time                  Endpoint: GET /listAllRooms

4) List all Customers with booked Data with

*Customer Name
*Room Name
*Date
*Start Time
*End Time                  Endpoint: GET /listAllCustomers

5) List how many time a cutomer has booked the room with below details

*Customer Name
*Room Name
*Date
*Start Time
*End Time
*Booking Date 
*Booking Status            Endpoint: GET /eachCustomerData


