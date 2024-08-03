import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/admin/Unauthorized";
import { getServerSession } from "next-auth";

const AdminMiddleware = async ({ children }) => {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return <Unauthorized />
    }

  return (
    <>
        {children}
    </>
  )
}

export default AdminMiddleware