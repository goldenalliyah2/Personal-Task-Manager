import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import type { Task } from '../components/types';

function MyTasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (!savedTasks) {
      setTasks([]);
      return;
    }

    try {
      const parsedTasks: unknown = JSON.parse(savedTasks);

      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks as Task[]);
      } else {
        setTasks([]);
      }
    } catch {
      setTasks([]);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id,
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      'tasks',
      JSON.stringify(updatedTasks),
    );
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-task/${id}`);
  };

  return (
    <main className="min-h-[1051px] bg-[#FAF9FC]">
      <section className="mx-auto w-[1060px] pt-8">
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <h1
            className="text-[32px] leading-[100%] text-[#292929]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 600,
            }}
          >
            My Tasks
          </h1>

          <Link
            to="/new-task"
            className="text-[17px] leading-[100%] text-[#9747D7] hover:underline"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
            }}
          >
            + Add New Task
          </Link>
        </div>

        {/* Tasks */}
        <div className="mt-8 space-y-6">
          {tasks.length === 0 ? (
            <div className="py-16 text-center">
              <p
                className="text-[22px] text-[#9C9C9C]"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                  fontWeight: 400,
                }}
              >
                No tasks yet.
              </p>

              <Link
                to="/new-task"
                className="mt-5 inline-block rounded-[8px] bg-[#9747D7] px-5 py-3 text-white"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                  fontWeight: 500,
                }}
              >
                Create Your First Task
              </Link>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          )}
        </div>

        {/* Back To Top */}
        <div className="py-10 text-center">
          <a
            href="#nav"
            className="text-[16px] text-[#9747D7] hover:underline"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
            }}
          >
            Back To Top
          </a>
        </div>
      </section>
    </main>
  );
}

export default MyTasksPage;