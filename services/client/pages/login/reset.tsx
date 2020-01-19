import { Reset } from "../../components";

// ##### PAGE #####
const ResetPage = ({ query }) => {
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
