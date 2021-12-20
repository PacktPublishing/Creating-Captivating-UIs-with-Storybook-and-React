import React from "react";

export function ListFetcher({ children }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [lastFetch, setLastFetch] = React.useState(Date.now());

  function refetchItems() {
    setLastFetch(Date.now());
  }

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/items")
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [lastFetch]);

  return children({ loading, items, error, refetchItems });
}
