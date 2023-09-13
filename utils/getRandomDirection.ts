import { getRandomNeighborhood } from "..";
import generateStreetAndNumber from "../streets-numbers";

export const getRandomDirection = () => {
  const picked = Math.random() > 0.5;

  if (picked) {
    const { street, number } = generateStreetAndNumber();

    return {
      calle: street,
      numero: number,
    };

  } else {
    const { name, house } = getRandomNeighborhood();

    return {
      localidad: "Formosa",
      barrio: name.toUpperCase(),
      casa: house,
    };

  }
};
