import React, { useState } from "react";
import Navigation from "./Navigation";
import PizzaList from "./PizzaList";

const initialPizzasDatas = [
  { id: 1, name: "Pizza spéciale", price: 2.1, pizzaCount: 0 },
  { id: 2, name: "Pizza reine", price: 1.1, pizzaCount: 0 },
  { id: 3, name: "Pizza chorizo", price: 1.8, pizzaCount: 0 },
  { id: 4, name: "Pizza 4 fromages", price: 2.5, pizzaCount: 0 },
  { id: 5, name: "Pizza poulet", price: 2.0, pizzaCount: 0 },
  { id: 6, name: "Pizza montagnarde", price: 2.2, pizzaCount: 0 }
];

function App() {
  const [state, setState] = useState({
    title: "Pizza World!",
    pizzaSelection: [],
    pizzasDatas: [...initialPizzasDatas]
  });

  const removePizza = (pizzaId) => {
    const newSelection = state.pizzaSelection.filter((id) => id !== pizzaId);
    setState((prevState) => ({
      ...prevState,
      pizzaSelection: newSelection
    }));
  };

  const decrementPizzaCount = (pizzaId) => {
    const newPizzasDatas = [...state.pizzasDatas];
    const pizzaIndexInDatas = newPizzasDatas.findIndex((p) => p.id === pizzaId);
    if (pizzaIndexInDatas !== -1 && newPizzasDatas[pizzaIndexInDatas].pizzaCount > 0) {
      newPizzasDatas[pizzaIndexInDatas].pizzaCount--;
    }
    if (newPizzasDatas[pizzaIndexInDatas].pizzaCount === 0) {
      removePizza(pizzaId);
    }
    setState((prevState) => ({
      ...prevState,
      pizzasDatas: newPizzasDatas
    }));
  };

  const totalPrice = state.pizzaSelection.reduce((total, pizzaId) => {
    const pizza = state.pizzasDatas.find((p) => p.id === pizzaId);
    return total + (pizza ? pizza.price * pizza.pizzaCount : 0);
  }, 0);

  return (
    <div>
      <Navigation />
      <h1>Hello {state.title}</h1>
      <p>Carte des pizzas :</p>
      <PizzaList
        pizzaSelection={state.pizzaSelection}
        setPizzaSelection={(newSelection) => setState({ ...state, pizzaSelection: newSelection })}
        pizzasDatas={state.pizzasDatas}
      />
      <p>Total de la commande : {totalPrice.toFixed(2)} €</p>
      <p>Votre sélection ({state.pizzaSelection.length}) :</p>
      <ul>
        {state.pizzaSelection.map((pizzaId) => {
          const pizza = state.pizzasDatas.find((p) => p.id === pizzaId);
          return (
            pizza && (
              <li key={pizza.id}>
                {pizza.name} ({pizza.pizzaCount} ajoutée(s))
                <button onClick={() => decrementPizzaCount(pizza.id)}>-</button>
              </li>
            )
          );
        })}
      </ul>
      <button onClick={() => console.log(state.pizzaSelection)}>Voir sélection</button>
    </div>
  );
}

export default App;
