import React, { useEffect, useState } from "react";

export const useGetSC = () => {
  const [sc, setSc] = useState<string | null>(null);

  useEffect(() => {
    const fetchSC = async () => {
      setSc(sc);
    };
    fetchSC();
  }, []);
  return {
    sc,
  };
};
