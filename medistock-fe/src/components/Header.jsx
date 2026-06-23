import { useState, useEffect, useRef } from "react";
import {
  FaBell
} from "react-icons/fa";

function Header({

  username,
  role,
  lowStockCount,
  expiryAlertCount

}) {

  const [showNotifications,
    setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const notifications = [];

  if (lowStockCount > 0) {

    notifications.push({
      type: "low",
      message: `${lowStockCount} medicines are low in stock`
    });

  }

  if (expiryAlertCount > 0) {

    notifications.push({
      type: "expiry",
      message: `${expiryAlertCount} medicines are near expiry`
    });

  }

  console.log("low stock :", lowStockCount);
  console.log("low exp :", expiryAlertCount);

  return (

    <header
      className="
      bg-gray-800
      h-25
      px-8
      shadow-sm
      border-b
      flex
      items-center
      justify-between
      sticky
      top-0
      z-30
      gap-6
      "
    >

      {/* LEFT SPACE */}

      <div className="w-40"></div>

      {/* CENTER */}

      <h1
        className="
        text-3xl
        font-bold
        text-white
        "
      >
        Welcome to MediStock
      </h1>

      {/* RIGHT */}

      <div className="flex items-center gap-6 mr-10">

        {/* NOTIFICATION */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
        relative
        text-2xl
        text-white
        hover:text-yellow-400
        transition
        "
          >

            <FaBell />

            {
              notifications.length > 0 && (

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    rounded-full
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    "
                >
                  {notifications.length}
                </span>

              )
            }

          </button>

          {
            showNotifications && (

              <div
                className="
                absolute
                right-0
                top-12
                w-80
                bg-white
                rounded-2xl
                shadow-xl
                border
                z-50
                overflow-hidden
                "
              >

                <div
                  className="
                    px-4
                    py-3
                    border-b
                    font-semibold
                    "
                >
                  Notifications
                </div>

                {
                  notifications.length === 0 ? (

                    <div
                      className="
                            p-4
                            text-center
                            text-gray-500
                            "
                    >
                      No notifications
                    </div>

                  ) : (

                    notifications.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="
                                    px-4
                                    py-3
                                    border-b
                                    hover:bg-gray-50
                                    "
                        >

                          <p
                            className={
                              item.type === "low"
                                ? "text-red-500 font-medium"
                                : "text-yellow-500 font-medium"
                            }
                          >
                            {
                              item.type === "low"
                                ? "Low Stock Alert"
                                : "Expiry Alert"
                            }
                          </p>

                          <p className="text-sm text-gray-600">
                            {item.message}
                          </p>

                        </div>

                      )
                    )

                  )
                }

              </div>

            )
          }

        </div>

        {/* PROFILE */}

        <div
          className="
          flex
          items-center
          gap-3
          bg-gray-100
          px-8
          py-2
          rounded-full
          "
        >
          {
            role === "ADMIN" && (
              <img
                src="../src/assets/tej pic.jpg"
                alt="Admin"
                className="
            w-12
            h-12
            p-0
            rounded-full
            "
              />
            )
          }

          <div>

            <p className="font-bold">
              {username}
            </p>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              {role}
            </p>

          </div>

        </div>

      </div>

    </header>

  );
}

export default Header;