import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import router from "next/router";
import { getUser, updateUser } from "api/userApi";
import { User } from "next-auth";
import Link from "next/link";

const Profile: NextPageWithLayout = () => {
  const { status, data: sessionData } = useSession();
  const [updatedUser, setUpdatedUser] = useState<User | undefined>();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!sessionData) {
      Router.replace("/login");
      return;
    }
    const { user } = sessionData;

    async function fetchUser() {
      let userData = await getUser(user.email);
      setUpdatedUser(userData);
    }

    fetchUser();
  }, [status, sessionData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!updatedUser) {
      return;
    }
    const res = await updateUser(updatedUser);
    if (res) {
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 px-6 lg:px-8"
      action="#"
      method="POST"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updatedUser?.name || ""}
                  onChange={(e) =>
                    setUpdatedUser((prevUser) =>
                      prevUser
                        ? { ...prevUser, name: e.target.value }
                        : undefined
                    )
                  }
                  autoComplete="given-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email address
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={updatedUser?.email || ""}
                  onChange={(e) =>
                    setUpdatedUser((prevUser) =>
                      prevUser
                        ? { ...prevUser, email: e.target.value }
                        : undefined
                    )
                  }
                  autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm cursor-not-allowed focus:outline-none sm:text-sm"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link href="/dashboard">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

Profile.getLayout = (page) => {
  return <AppLayout pageTitle="Profile">{page}</AppLayout>;
};

export default Profile;
