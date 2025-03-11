import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <h3>{err.status} {err.statusText}</h3>
      <p>{err.data}</p>
    </div>
  );
}

export default Error;
