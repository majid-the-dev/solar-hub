"use client";

import { useState, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import { CgTrashEmpty } from "react-icons/cg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import NewAdminModal from "@/components/admin/NewAdminModal";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching admins!");
      }

      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      toast.error("Error fetching admins!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const handleAdminAdded = async () => {
    await getAdmins();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Admins</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Create and manage admins here.
          </p>
        </div>
        <div>
          <NewAdminModal onAdminAdded={handleAdminAdded} />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          {admins?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead className="whitespace-nowrap font-normal">
                      Admin Name
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap font-normal px-14">
                      Admin Email
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal px-14">
                      Date Created
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {admins?.length > 0 &&
                    admins.map((admin) => (
                      <TableRow key={admin._id}>
                        <TableCell className="flex items-start gap-1 font-medium max-w-[300px] truncate">
                          {admin.fullName}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap px-14">
                          {admin.email}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap px-14">
                          {formatDate(admin.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center">
              <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                <CgTrashEmpty />
              </p>
              <p className="text-xs text-gray-500 font-normal mt-4">
                No Admins available!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
