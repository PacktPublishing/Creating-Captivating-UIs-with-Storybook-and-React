import React from "react";

export function ItemUpdater({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  function updateItem(itemData) {
    // QUESTION - should this reject the error?
    return new Promise((resolve, reject) => {
      setLoading(true);
      fetch(`/api/items/${itemData.id}`, {
        method: "PUT",
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
          reject(null);
        });
    });
  }

  return children({ updateItem, loading, error });
}
