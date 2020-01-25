import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { ALL_USER_QUERY } from "../../../graphql/Query";
import { Table } from "./Permissions.styles";

// ##### USER PERMISSION #####
const possiblePermissions = [
  "ADMIN",
  "USER",
  "EGGCREATE",
  "EGGUPDATE",
  "EGGDELETE",
  "PERMISSIONUPDATE"
];

// ##### COMPONENT PROPS TYPE #####
interface IPermissionProps {}

// ##### COMPONENT #####
const Permissions: React.FunctionComponent<IPermissionProps> = props => {
  // ##### HOOKS #####

  const { data, loading, error } = useQuery(ALL_USER_QUERY);
  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <div>
      <h3>Manage Permissions</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {possiblePermissions.map(permission => (
              <th>{permission}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <User user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// ##### COMPONENT PROPS TYPE #####
interface IUserProps {
  user: any;
}

// ##### COMPONENT #####
const User: React.FunctionComponent<IUserProps> = props => {
  const user = props.user;
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input type="checkbox" />
          </label>
        </td>
      ))}
    </tr>
  );
};
export default Permissions;
