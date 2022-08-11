import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Icons
import {
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";

// Component
import BreadCrumbNavigation from "../../components/BreadCrumbNavigation";
import TaskList from "../../components/dashboard/List"

// Controller
import DashboardController from "../../controller/dashboard";

// Context
import SnackbarContext from "../../context/SnackbarContext";
import LoaderContext from "../../context/LoaderContext";

// Helper
import errorHandler from "../../helper/errorHandler";
import logRender from "../../helper/logRender";


function Dashboard() {
  // Context
  const { setMessage } = useContext(LoaderContext);
  const { setNotif } = useContext(SnackbarContext);
  // State
  const [statistic, setStatistic] = useState<{
    employee: number;
    task: number;
    task_completed: number;
    task_incomplete: number;
  }>({ employee: 0, task: 0, task_completed: 0, task_incomplete: 0 });

  useEffect(() => {
    logRender({ type: "page", name: "/Dashboard" });
  }, []);

  const getDashboardData = useCallback(async () => {
    try {
      setMessage("Fetch Dashboard Data")
      const dc = new DashboardController()
      const res = await dc.dashboard()
      setStatistic({
        employee: res.data.detail.total_employee,
        task: res.data.detail.total_task,
        task_completed: res.data.detail.total_task_completed,
        task_incomplete: res.data.detail.total_task_incomplete
      })
      setMessage("")
    } catch (error) {
      setMessage("")
      const errorMessage = errorHandler(error)
      setNotif({ type: "error", message: errorMessage })
    }
  }, [setNotif, setMessage]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <div className="w-full flex flex-col">
      <BreadCrumbNavigation />
      {/* Notice */}
      <div className="w-full px-10 py-2 border border-dashed bg-red-50 border-red-600 rounded text-red-500 font-semibold text-center italic">
        Because auto sleep mode in <a href="https://devcenter.heroku.com/articles/free-dyno-hours" className="text-blue-500 underline">free dyno hours in Heroku</a>,
        when application is no active request within 30 minutes,<br />
        All data in mysqli will be cleared when website in sleep mode <br />

      </div>
      {/* Statistic */}
      <div className="mt-1 flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-3">
        {/* Employee */}
        <div className="w-full md:w-1/4 p-1 border border-dashed border-blue-600 rounded">
          <div className="bg-blue-600 text-white h-20 rounded">
            <div className="flex flex-row p-2 justify-between">
              <div className="flex justify-end">
                <UserGroupIcon className="w-14" />
              </div>
              <div className="flex flex-col items-end pr-2">
                <div className="text-3xl">{statistic.employee}</div>
                <div>Employee</div>
              </div>
            </div>
          </div>
        </div>
        {/* Question */}
        <div className="w-full md:w-1/4 p-1 border border-dashed border-yellow-600 rounded">
          <div className="bg-yellow-600 text-white h-20 rounded">
            <div className="flex flex-row p-2 justify-between">
              <div className="flex justify-end">
                <ClipboardListIcon className="w-14" />
              </div>
              <div className="flex flex-col items-end pr-2">
                <div className="text-3xl">{statistic.task}</div>
                <div>Task</div>
              </div>
            </div>
          </div>
        </div>
        {/* Assessment */}
        <div className="w-full md:w-1/4 p-1 border border-dashed border-green-600 rounded">
          <div className="bg-green-600 text-white h-20 rounded">
            <div className="flex flex-row p-2 justify-between">
              <div className="flex justify-end">
                <CheckCircleIcon className="w-14" />
              </div>
              <div className="flex flex-col items-end pr-2">
                <div className="text-3xl">{statistic.task_completed}</div>
                <div>Task Completed</div>
              </div>
            </div>
          </div>
        </div>
        {/* Assessor */}
        <div className="w-full md:w-1/4 p-1 border border-dashed border-red-600 rounded">
          <div className="bg-red-600 text-white h-20 rounded">
            <div className="flex flex-row p-2 justify-between">
              <div className="flex justify-end">
                <ClockIcon className="w-14" />
              </div>
              <div className="flex flex-col items-end pr-2">
                <div className="text-3xl">{statistic.task_incomplete}</div>
                <div>Task Incomplete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Task */}
      <div className="mt-1 p-4 border border-dashed border-gray-400 rounded">
        <h4 className="font-bold mb-3">All Task</h4>
        <div className="hidden md:block w-full">
          {statistic.task === 0 ? (
            <div className="font-thin">&mdash; Empty, no task found:
              <Link to={`/task/create`} className="ml-2 text-blue-500 font-semibold">Create one ?</Link>
            </div>
          ) : (
            <TaskList />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
