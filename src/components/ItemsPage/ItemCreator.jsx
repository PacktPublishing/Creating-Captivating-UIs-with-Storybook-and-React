import React from "react";

export function ItemCreator({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  function createItem(itemData) {
    // QUESTION - should this reject the error?
    return new Promise((resolve, reject) => {
      setLoading(true);
      fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      })
        .then((res) => res.json())
        .then((resp) => {
          setLoading(false);
          resolve(resp);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
          resolve(null);
        });
    });
  }

  return children({ createItem, loading, error });
}
