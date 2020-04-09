import { useState } from "react";

export default function useInputState(initialValue = "") {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
  };
  const handleReset = () => {
    setState("");
  };

  return [state, handleChange, handleReset];
}
