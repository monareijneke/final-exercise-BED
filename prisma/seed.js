import { PrismaClient } from "@prisma/client";
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { users } = userData;
  const { amenities } = amenityData;

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        userId: booking.userId,
        propertyId: booking.propertyId,
      },
    });
  }

  for (const property of properties) {
    const existingAmenities = await prisma.amenity.findMany();
    const amenitiesToConnect = existingAmenities.filter(amenity =>
      property.amenitis.includes(amenity.name)
    );
    const amenityIds = amenitiesToConnect.map(amenity => ({ id: amenity.id }));
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
        host: {
          connect: { id: property.hostId },
        },
        amenitis: {
          connect: amenityIds,
        },
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: {
          connect: { id: review.userId },
        },
        property: {
          connect: { id: review.propertyId },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
