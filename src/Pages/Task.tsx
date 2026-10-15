import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import type { Task } from '../components/types';

function MyTasksPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Search by task title, description, or tags.
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter((task) => {
      const matchesTitle = task.title
        .toLowerCase()
        .includes(query);

      const matchesDescription = task.description
        .toLowerCase()
        .includes(query);

      const matchesTags = task.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      return matchesTitle || matchesDescription || matchesTags;
    });
  }, [tasks, searchQuery]);

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

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <main className="min-h-[1051px] bg-[#FAF9FC]">
      <section className="mx-auto w-full max-w-[1060px] px-4 pt-8 sm:px-6 lg:px-0">
        {/* Page heading */}
        <div className="flex items-center justify-between gap-4">
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

        {/* Search */}
        <div className="mt-6">
          <label
            htmlFor="task-search"
            className="mb-2 block text-[15px] text-[#4D4D4D]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
            }}
          >
            Search tasks
          </label>

          <div className="flex h-[48px] items-center gap-3 rounded-[8px] border border-[#B8B6B6] bg-white px-4 transition focus-within:border-[#9747D7] focus-within:ring-2 focus-within:ring-purple-100">
            <Search
              size={19}
              className="shrink-0 text-[#9C9C9C]"
              aria-hidden="true"
            />

            <input
              id="task-search"
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search by task title, description, or tag..."
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#292929] outline-none placeholder:text-[#9C9C9C]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
              }}
              aria-label="Search tasks by title, description, or tag"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#737171] transition hover:bg-purple-50 hover:text-[#9747D7]"
                aria-label="Clear search"
                title="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {searchQuery.trim() !== '' && (
            <p
              className="mt-2 text-[14px] text-[#737171]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
              }}
              aria-live="polite"
            >
              {filteredTasks.length}{' '}
              {filteredTasks.length === 1 ? 'task' : 'tasks'} found
            </p>
          )}
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
                className="mt-5 inline-block rounded-[8px] bg-[#9747D7] px-5 py-3 text-white transition hover:bg-[#8235C2]"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                  fontWeight: 500,
                }}
              >
                Create Your First Task
              </Link>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="py-16 text-center">
              <Search
                size={36}
                className="mx-auto mb-4 text-[#B8B6B6]"
                aria-hidden="true"
              />

              <p
                className="text-[22px] text-[#737171]"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                  fontWeight: 500,
                }}
              >
                No tasks found.
              </p>

              <p
                className="mt-2 text-[15px] text-[#9C9C9C]"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                }}
              >
                Try another search term or clear your search.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 rounded-[8px] bg-[#9747D7] px-5 py-3 text-white transition hover:bg-[#8235C2]"
                style={{
                  fontFamily: "'Signika Negative', sans-serif",
                  fontWeight: 500,
                }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
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