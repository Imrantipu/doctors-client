import { useEffect, useState } from "react";

const useToken = (email) => {
  console.log("token email", email);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://doctor-server-psi.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
