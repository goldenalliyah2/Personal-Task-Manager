import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from './types';

function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const savedTasks = localStorage.getItem('tasks');

    if (!savedTasks) {
      return;
    }

    try {
      const parsedTasks: unknown = JSON.parse(savedTasks);

      if (!Array.isArray(parsedTasks)) {
        return;
      }

      const tasks = parsedTasks as Task[];

      const taskToEdit = tasks.find(
        (task) => task.id === id,
      );

      if (!taskToEdit) {
        return;
      }

      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setSelectedTags(taskToEdit.tags);
    } catch {
      return;
    }
  }, [id]);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter(
            (currentTag) => currentTag !== tag,
          )
        : [...currentTags, tag],
    );
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      alert('Please enter a task title.');
      return;
    }

    if (!trimmedDescription) {
      alert('Please enter a task description.');
      return;
    }

    if (!id) {
      alert('Task could not be found.');
      return;
    }

    let existingTasks: Task[] = [];

    try {
      const savedTasks = localStorage.getItem('tasks');

      if (savedTasks) {
        existingTasks = JSON.parse(savedTasks);
      }
    } catch {
      existingTasks = [];
    }

    const updatedTasks = existingTasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: trimmedTitle,
            description: trimmedDescription,
            tags: selectedTags,
          }
        : task,
    );

    localStorage.setItem(
      'tasks',
      JSON.stringify(updatedTasks),
    );

    navigate('/my-task');
  };

  const handleBack = () => {
    navigate('/my-task');
  };

  return (
    <main className="absolute left-1/2 top-0 z-10 h-[1144px] w-[1100px] -translate-x-1/2">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {/* Back Arrow */}
        <button
          type="button"
          aria-label="Go back to My Task"
          onClick={handleBack}
          className="absolute left-0 top-[159px] h-[60px] w-[60px]"
        >
          <Icon
            icon="eva:arrow-ios-back-fill"
            className="h-full w-full -translate-y-2 text-[#292929]"
          />
        </button>

        {/* Edit Task */}
        <h1
          className="absolute left-[60px] top-[158px] h-[62px] w-[200px] text-[48px] leading-[100%]"
          style={{
            fontFamily: "'Signika Negative', sans-serif",
            fontWeight: 600,
            color: '#292929',
          }}
        >
          Edit Task
        </h1>

        {/* Task Title */}
        <div className="absolute left-0 top-[286px] h-[102px] w-[1100px]">
          <div className="absolute left-0 top-[18px] h-[84px] w-[1100px] rounded-[5px] border border-[#B8B6B6]">
            <label
              htmlFor="edit-task-title"
              className="absolute left-[44px] top-[-16px] bg-[#FAF9FB] px-[2px] text-[30px] leading-[100%]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
                color: '#9C9C9C',
              }}
            >
              Task Title
            </label>

            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Edit your task title..."
              autoComplete="off"
              className="absolute left-[44px] top-[28.5px] h-[27px] w-[950px] bg-transparent text-[22px] leading-[100%] text-[#292929] outline-none placeholder:text-[#CCCCCC]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 400,
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="absolute left-0 top-[438px] h-[262px] w-[1100px]">
          <div className="absolute left-0 top-[18px] h-[244px] w-[1100px] rounded-[5px] border border-[#B8B6B6]">
            <label
              htmlFor="edit-task-description"
              className="absolute left-[44px] top-[-18px] bg-[#FAF9FB] px-[2px] text-[30px] leading-[100%]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
                color: '#9C9C9C',
              }}
            >
              Description
            </label>

            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Edit your task description..."
              className="absolute left-[45px] top-[31px] h-[180px] w-[1000px] resize-none bg-transparent text-[22px] leading-[100%] text-[#292929] outline-none placeholder:text-[#CCCCCC]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 400,
              }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="absolute left-0 top-[750px] h-[102px] w-[1100px]">
          <div className="absolute left-0 top-[18px] h-[84px] w-[1100px] rounded-[5px] border border-[#B8B6B6]">
            <span
              className="absolute left-[44px] top-[-18px] bg-[#FAF9FB] px-[2px] text-[30px] leading-[100%]"
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
                color: '#9C9C9C',
              }}
            >
              Tags
            </span>

            {/* Urgent */}
            <button
              type="button"
              onClick={() => toggleTag('Urgent')}
              aria-pressed={selectedTags.includes('Urgent')}
              className={`absolute left-[45px] top-[31px] h-[31px] w-[76px] rounded-[3px] text-[22px] leading-[100%] transition ${
                selectedTags.includes('Urgent')
                  ? 'bg-[#292929] text-[#FAF9FB]'
                  : 'bg-[#9C9C9C] text-[#CCCCCC]'
              }`}
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
              }}
            >
              Urgent
            </button>

            {/* Important */}
            <button
              type="button"
              onClick={() => toggleTag('Important')}
              aria-pressed={selectedTags.includes('Important')}
              className={`absolute left-[145px] top-[31px] h-[31px] w-[104px] rounded-[3px] text-[22px] leading-[100%] transition ${
                selectedTags.includes('Important')
                  ? 'bg-[#292929] text-[#FAF9FB]'
                  : 'bg-[#9C9C9C] text-[#CCCCCC]'
              }`}
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
              }}
            >
              Important
            </button>

            <Icon
              icon="eva:arrow-ios-downward-fill"
              className="absolute left-[1033px] top-[35px] h-[30px] w-[30px] text-[#9C9C9C]"
            />
          </div>
        </div>

        {/* Done */}
        <button
          type="submit"
          className="absolute left-0 top-[935px] flex h-[84px] w-[1100px] items-center justify-center gap-[10px] rounded-[8px] bg-[#974FD0] px-[25px] py-[10px] duration-300 ease-out hover:bg-[#853cc0] active:scale-[0.99]"
        >
          <span
            className="text-[35px] leading-[100%]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
              color: '#FAF9FB',
            }}
          >
            Done
          </span>
        </button>
      </form>

      {/* Back To Top */}
      <button
        type="button"
        onClick={() => {
          document
            .getElementById('nav')
            ?.scrollIntoView({
              behavior: 'smooth',
            });
        }}
        className="absolute left-[486px] top-[1062px] h-[32px] w-[128px] text-[26px] leading-[100%] text-[#9747D7] underline duration-300 ease-out"
        style={{
          fontFamily: "'Signika Negative', sans-serif",
          fontWeight: 500,
        }}
      >
        Back To Top
      </button>
    </main>
  );
}

export default EditTask;