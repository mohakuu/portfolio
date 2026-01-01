import { getHello } from "./api/get-hello";

export const ServerHello = async () => {
  const serverData = await getHello();

  return (
    <div>
      <h2>Server Side: {serverData.text}</h2>
    </div>
  );
};
