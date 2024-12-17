import React from "react";

function PizzaList({ pizzaSelection, setPizzaSelection, pizzasDatas }) {
  const handleAddPizza = (pizzaId) => {
    const pizzaIndex = pizzaSelection.findIndex((id) => id === pizzaId);

    if (pizzaIndex === -1) {
      setPizzaSelection([...pizzaSelection, pizzaId]);
    } else {
      const updatedPizzas = [...pizzaSelection];
      updatedPizzas[pizzaIndex] = pizzaId;
      setPizzaSelection(updatedPizzas);
    }

    const pizzaIndexInDatas = pizzasDatas.findIndex((p) => p.id === pizzaId);
    if (pizzaIndexInDatas !== -1) {
      pizzasDatas[pizzaIndexInDatas].pizzaCount++;
    }
  };

  return (
    <ul>
      {pizzasDatas.map((pizza) => (
        <li key={pizza.id}>
          {pizza.name} - {pizza.price} € ({pizza.pizzaCount} ajoutée(s))
          <button onClick={() => handleAddPizza(pizza.id)}>+</button>
        </li>
      ))}
    </ul>
  );
}

export default PizzaList;
