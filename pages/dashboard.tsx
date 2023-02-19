import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";

const Dashboard: NextPageWithLayout = ({ data }) => {
  return (
    <>
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Today's solar forecast
        </h3>
        <p>{data}</p>
      </div>
    </>
  );
};

let user = {
  email: "test@test.com",
  password: "password1",
  name: "Frank",
  phone: 871234567,
};

Dashboard.getLayout = (page) => {
  return (
    <AppLayout pageTitle="Dashboard" user={user}>
      {page}
    </AppLayout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  let userData = {
    user_id: 1,
    lat: 52.12121,
    lon: 8.121,
    peakpower: 6,
    loss: 0.1,
    angle: 35,
    aspect: 0,
    mounting: "FREE",
    month: 4,
  };

  const res = await fetch("http://localhost:8080/api/v1/pv/daily", {
    method: "POST",
    headers: {},
    body: JSON.stringify(userData),
  });
  const data = await res.json().toString();

  // Pass data to the page via props
  return { props: { data } };
}

export default Dashboard;
