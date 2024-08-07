import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext.jsx"
import useFetchData from "../../../hooks/useFetchData.js"
import { BASE_URL, token } from "../../../config.js"
import DoctorOverview from "./DoctorOverview.jsx"
import DoctorAppointments from "./DoctorAppointments.jsx"
import DoctorSettings from "./DoctorSettings.jsx"
import { IoCloseOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { HiViewGrid } from "react-icons/hi"
import { CgProfile } from "react-icons/cg"
import { MdOutlineDateRange } from "react-icons/md"
import { useLogout } from "../../../context/LogoutContext.jsx"

export default function DoctorAccount() {
  const { dispatch } = useContext(AuthContext)
  const { triggerLogout } = useLogout()

  const [tab, setTab] = useState("overview")
  const [alertClosed, setAlertClosed] = useState(false)

  const navigate = useNavigate()

  const { data: doctorData, loading, error } = useFetchData(`${BASE_URL}/doctors/profile/me`)

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your account? This action can not be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      customClass: {
        popup: 'swal2-custom-popup',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          const response = await res.json()
          if (!res.ok) throw new Error(response.message)
          handleLogout()
          Swal.fire({
            text: response.message,
            icon: "success",
            customClass: {
              popup: 'swal2-custom-success',
            }
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/", { replace: true })
    triggerLogout()
  }

  const handleExpiredToken = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login", { replace: true })
  }

  return (
    <section className="min-h-screen relative">
      <div className="max-w-[1440px] px-4 mx-auto">
        {/* {loading && !error && <Loading />} */}

        {error && !loading && handleExpiredToken()}

        {/* {error && !loading && <Error error={error} />} */}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-10 2xl:gap-20">
            {/* Desktop Panel Side */}
            <div className="hidden md:block md:w-1/3 lg:w-1/4 px-[30px]">
              <div>
                <button
                  onClick={() => setTab("overview")}
                  className="btn w-full my-1 rounded-md"
                >
                  Overview
                </button>
                <button
                  onClick={() => setTab("appointments")}
                  className="btn w-full my-1 rounded-md"
                >
                  Appointments
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className="btn w-full my-1 rounded-md"
                >
                  Profile info
                </button>
                {/* <button
                  onClick={handleDeleteAccount}
                  className="btn w-full my-1 rounded-md bg-red-600 hover:bg-red-800 dark:!bg-red-700 dark:hover:!bg-red-800"
                >
                  Delete account
                </button>
                <button
                  onClick={handleLogout}
                  className="btn w-full my-1 rounded-md bg-slate-800 hover:bg-slate-950 dark:!bg-slate-900 dark:hover:!bg-black"
                >
                  Logout
                </button> */}
              </div>
            </div>

            {/* Content Side */}
            <div className="md:w-2/3 lg:w-3/4 mb-14 md:mb-0">
              {doctorData.isApproved === "pending" && (
                <div className={alertClosed ? `hidden` : `flex items-center p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-4`}>
                  <svg viewBox="0 0 512 512" className="size-5 flex-shrink-0" fill="rgb(188, 153, 12)">
                    <path d="M255.992,0.008C114.626,0.008,0,114.626,0,256s114.626,255.992,255.992,255.992 C397.391,511.992,512,397.375,512,256S397.391,0.008,255.992,0.008z M300.942,373.528c-10.355,11.492-16.29,18.322-27.467,29.007 c-16.918,16.177-36.128,20.484-51.063,4.516c-21.467-22.959,1.048-92.804,1.597-95.449c4.032-18.564,12.08-55.667,12.08-55.667 s-17.387,10.644-27.709,14.419c-7.613,2.782-16.225-0.871-18.354-8.234c-1.984-6.822-0.404-11.161,3.774-15.822 c10.354-11.484,16.289-18.314,27.467-28.999c16.934-16.185,36.128-20.483,51.063-4.524c21.467,22.959,5.628,60.732,0.064,87.497 c-0.548,2.653-13.742,63.627-13.742,63.627s17.387-10.645,27.709-14.427c7.628-2.774,16.241,0.887,18.37,8.242 C306.716,364.537,305.12,368.875,300.942,373.528z M273.169,176.123c-23.886,2.096-44.934-15.564-47.031-39.467 c-2.08-23.878,15.58-44.934,39.467-47.014c23.87-2.097,44.934,15.58,47.015,39.458 C314.716,152.979,297.039,174.043,273.169,176.123z"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <p
                    onClick={() => {
                      setTab("settings")
                      setAlertClosed(true)
                    }}
                    className="ml-2 text-sm font-medium cursor-pointer hover:underline">
                    To get approval please complete your profile. We&apos;ll review manually and approve within 3 days.
                  </p>
                  <span className="ml-auto">
                    <IoCloseOutline
                      onClick={() => setAlertClosed(true)}
                      className="cursor-pointer size-5 opacity-70 hover:opacity-100" />
                  </span>
                </div>
              )}
              {tab === "overview" && <DoctorOverview doctor={doctorData} />}
              {tab === "appointments" && <DoctorAppointments appointments={doctorData.appointments} />}
              {tab === "settings" && <DoctorSettings doctor={doctorData} />}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Panel Side */}
      <div className="fixed bottom-0 flex items-center md:hidden w-full justify-around text-sm shadow-[0_-3px_30px_-18px_rgba(0,0,0,0.43)] bg-cyan-100 text-slate-400 dark:text-slate-500 dark:bg-slate-800">
        <button
          onClick={() => setTab("overview")}
          className={`${tab === "overview" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-2`}
        >
          <div className="flex flex-col items-center">
            <div><HiViewGrid size={20} /></div>
            <div>Overview</div>
          </div>
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${tab === "appointments" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-2`}
        >
          <div className="flex flex-col items-center">
            <div><MdOutlineDateRange size={20} /></div>
            <div>Appointments</div>
          </div>
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${tab === "settings" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-2`}
        >
          <div className="flex flex-col items-center">
            <div><CgProfile size={20} /></div>
            <div>Profile info</div>
          </div>
        </button>
      </div>
    </section>
  )
}
