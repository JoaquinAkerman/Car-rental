import carValidator from "../carValidator";

describe("carValidator", () => {
  it("should validate correct car data", () => {
    const carData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 100,
      year: 2020,
      mileage: 10000,
      color: "red",
      air_conditioning: "Yes",
      passengers: 4,
      transmission: "Automatic",
      panoramic_sunroof: "Yes",
    };
    expect(() => carValidator(carData)).not.toThrow();
  });

  it("should throw an error for incorrect car data", () => {
    const carData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: -100, // Invalid day_price
      year: 2020,
      mileage: 10000,
      color: "red",
      air_conditioning: "Yes",
      passengers: 4,
      transmission: "Automatic",
      panoramic_sunroof: "Yes",
    };
    expect(() => carValidator(carData)).toThrow();
  });
});