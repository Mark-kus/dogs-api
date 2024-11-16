import { useNavigate } from "react-router-dom";
import getAllDogs from "../../Redux/actions/dogs/getAllDogs";
import { useAppDispatch } from "../../Redux/hooks";
import { useState } from "react";

export default function Error() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rebooting, setRebooting] = useState(false);

  const handleReboot = () => {
    setRebooting(true);
    dispatch(getAllDogs())
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setRebooting(false);
      });
  };

  return (
    <article>
      <h1>Error Ocurred</h1>
      <button disabled={rebooting} onClick={handleReboot}>
        {rebooting ? "Trying again" : "Try again"}
      </button>
    </article>
  );
}
