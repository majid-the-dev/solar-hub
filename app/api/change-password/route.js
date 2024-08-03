import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/Users";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";

export const PUT = async (req) => {
    try {
        await mongooseConnect();
        const { newPassword } = await req.json();
    
        const session = await getServerSession(authOptions);
    
        if (!session) {
          return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
    
        const user = await User.findOne({ email: session.user.email });
    
        if (!user) {
          return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    
        return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
      }
};
