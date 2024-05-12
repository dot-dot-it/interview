import { useEffect, useState } from "react";
import { Container, Center, Box } from "@chakra-ui/react";

import user from "../../../api/user";

const List = () => {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const res = await user.list_all_enabled();
    /**
     * res.data = [
     *  {_id: 1, name: "Pedro", last_name: "Perez" },
     *  {_id: 2, name: "Romina", last_name: "Mansilla" }
     * ]
     *
     */
    setUsers(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Center h="100vh">
      <Container>
        <Center m="5" fontSize="x-large" color={"black"}>
          Lista de Usuarios :,)
        </Center>
        <Box>
          {users.length > 0 &&
            users.map((user, index) => <Card key={index} user={user} />)}
        </Box>
      </Container>
    </Center>
  );
};

const Card = ({ user }) => {
  const [user, setUser] = useState(null);
  const getData = async (id) => {
    const res = await user.get_user_by_id(id);

    /**
     * res.data = {_id: 1, name: "Pedro", last_name: "Perez" },
     */

    setUser(res.data);
  };
  useEffect(() => {
    if (user) getData(user._id);
  }, []);
  return <Box>{user && <Box>{`${user.name} ${user.last_name}`}</Box>}</Box>;
};

export default List;

/*
  ¿Que deberia hacer para optimizar este componente?
*/
