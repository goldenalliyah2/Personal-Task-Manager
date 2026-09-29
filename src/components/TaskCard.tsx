import { SquarePen, Trash2 } from 'lucide-react';
import type { Task } from './types';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

function TaskCard({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <article className="w-full rounded-[10px] border-[0.5px] border-[#B8B6B6] bg-white px-5 py-4">
      {/* Top row */}
      <div className="flex items-center justify-between gap-4 border-b-[0.5px] border-[#B8B6B6] pb-1.5">
        {/* Tags */}
        <div className="flex items-center gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={`mt-1 text-[15px] leading-none tracking-[0.02em] ${
                tag === 'Urgent'
                  ? 'text-[#F16B6B]'
                  : 'text-[#73C3A6]'
              }`}
              style={{
                fontFamily: "'Signika Negative', sans-serif",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {/* Edit */}
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-[40px] items-center gap-2 rounded-[8px] bg-[#9747D7] px-3 text-[15px] text-white transition hover:bg-[#8235C2]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
            }}
          >
            <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] bg-white/20">
              <SquarePen
                size={15}
                strokeWidth={1.8}
              />
            </span>

            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 rounded-[10px] border-[0.5px] border-[#B8B6B6] bg-white px-4 py-2 text-[15px] text-[#9747D7] shadow-sm transition hover:bg-purple-50"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
            }}
          >
            <Trash2
              size={17}
              strokeWidth={1.8}
            />

            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Task content */}
      <div className="pt-3 text-left">
        <h3
          className="text-[23px] leading-[1.2] text-[#4D4D4D]"
          style={{
            fontFamily: "'Signika Negative', sans-serif",
            fontWeight: 500,
          }}
        >
          {task.title}
        </h3>

        <p
          className="mt-3 w-full text-[15px] leading-[1.42] tracking-[0.005em] text-[#737171]"
          style={{
            fontFamily: "'Signika Negative', sans-serif",
            fontWeight: 400,
          }}
        >
          {task.description}
        </p>
      </div>
    </article>
  );
}

export default TaskCard;