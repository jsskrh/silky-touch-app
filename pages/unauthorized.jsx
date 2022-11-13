import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";

const style = {
  unauthorizedHead: `text-xl`,
  unauthorizedMessage: `mb-4 text-red-500`,
};

const unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorised Page">
      <h1 className={style.unauthorizedHead}>Access Denied</h1>
      {message && <div className={style.unauthorizedMessage}>{message}</div>}
    </Layout>
  );
};

export default unauthorized;
