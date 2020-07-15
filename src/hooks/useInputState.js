import { useState } from "react";

export default function useInputState(initialValue = "") {
  const [state, setState] = useState(initialValue);
  const handleChange = (e) => {
    setState(e.target.value);
  };
  const handleReset = () => {
    setState(initialValue);
  };

  return [state, handleChange, handleReset];
}
