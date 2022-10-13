/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate("");

  const sendLoginData = (data) => {
    api
      .post("/sessions", data)
      .then((resp) => {
        localStorage.setItem("@TOKEN", resp.data.token);
        localStorage.setItem("@USERID", resp.data.user.id);
        toast.success(`Login concluído!`);
        api.defaults.headers.authorization = `Bearer ${resp.data.token}`;
        setUser(resp.data.user);
        redirectDashboard();
      })
      .catch((error) => toast.error("Dados inválidos, tente novamente..."));
  };

  const sendRegisterData = (data) => {
    api
      .post("/users", data)
      .then((resp) => {
        toast.success(`Cadastro concluído`);
        redirectHome();
      })
      .catch((error) => toast.error("Dados inválidos!!"));
  };

  const redirectDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  const redirectHome = () => {
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.clear();
    toast.success(`"Vida longa e prospera!"`, {
      icon: "🖖",
    });
    setUser("");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    async function getUser() {
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get(`/profile`);
          setUser(data);
        } catch (error) {
          localStorage.clear();
          redirectHome();
        }
      } else {
        redirectHome();
      }

      setLoading(false);
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        sendLoginData,
        sendRegisterData,
        redirectDashboard,
        redirectHome,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
