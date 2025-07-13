"use client"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Notifications } from "@/components/notifications"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div></div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Notifications />
            <UserNav isOwner={false} />
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6 overflow-auto relative">
          <div
            id="action-notification"
            className="fixed top-16 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-0 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 max-w-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p id="notification-message" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Transaction processed successfully
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      onClick={() => {
                        const notification = document.getElementById("action-notification")
                        if (notification) {
                          notification.classList.remove("opacity-100", "translate-y-2")
                          notification.classList.add("opacity-0", "translate-y-0")
                        }
                      }}
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

