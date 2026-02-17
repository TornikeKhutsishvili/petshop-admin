import { useEffect, useState, useMemo } from "react";

type Currency = "usd" | "gel" | "eur" | "gbp" | "jpy";

export function useCurrencyConverter(
  amount: number,
  from: Currency,
  to: Currency,
) {
  const [rate, setRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRate() {
      if (from === to) {
        if (isMounted) setRate(1);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`,
        );
        const data = await res.json();

        // The JSON structure is: data[from][to]
        const fetchedRate = data[from.toLowerCase()]?.[to.toLowerCase()] ?? 1;

        if (isMounted) setRate(fetchedRate);
      } catch (err) {
        console.error("Currency fetch error:", err);
        if (isMounted) setRate(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRate();

    return () => {
      isMounted = false;
    };
  }, [from, to]);

  const converted = useMemo(() => amount * rate, [amount, rate]);

  return { converted, loading };
}
