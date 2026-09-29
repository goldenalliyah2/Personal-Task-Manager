import { Link, useLocation } from 'react-router-dom';
import avatar from '../assets/avatar.png';

function Navbar() {
  const location = useLocation();

  const isCoverPage = location.pathname === '/';
  const isMyTaskPage = location.pathname === '/my-task';
  const isNewTaskPage = location.pathname === '/new-task';
  const isEditTaskPage = location.pathname.startsWith('/edit-task');

  return (
    <nav
      id="nav"
      className="h-[93px] w-full border-b-[0.5px] border-[#B8B6B6] bg-white"
    >
      <div className="relative mx-auto h-full w-[1060px]">
        {/* Logo Icon */}
        <Link
          to="/"
          aria-label="TaskDuty home"
          className="absolute left-0 top-[26px] h-[40px] w-[40px] rounded-tr-[22.8px] rounded-br-[22.8px]"
          style={{
            background:
              'linear-gradient(201.09deg, #974FD0 14.32%, rgba(106, 143, 198, 0.35) 69.58%, #2D0050 97.22%)',
          }}
        >
          <span
            className="absolute left-[6px] top-[4px] text-[47.49px] leading-[100%]"
            style={{
              fontFamily: "'Secular One', sans-serif",
              color: '#FAF9FB',
            }}
          >
            T
          </span>
        </Link>

        {/* TaskDuty */}
        <Link
          to="/"
          className="absolute left-[49px] top-[29px] text-[27.37px] leading-[100%]"
          style={{
            fontFamily: "'Signika Negative', sans-serif",
            fontWeight: 600,
            color: '#2D0050',
          }}
        >
          TaskDuty
        </Link>

        {/* New Task */}
        {(isCoverPage || isMyTaskPage) && (
          <Link
            to="/new-task"
            className={`absolute top-[33px] text-[22px] leading-[100%] ${
              isMyTaskPage ? 'left-[800px]' : 'left-[650px]'
            }`}
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
              color: '#292929',
            }}
          >
            New Task
          </Link>
        )}

        {/* All Task / All Tasks */}
        {(isCoverPage || isNewTaskPage || isEditTaskPage) && (
          <Link
            to="/my-task"
            className="absolute left-[800px] top-[33px] text-[22px] leading-[100%]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
              fontWeight: 500,
              color: '#292929',
            }}
          >
            {isCoverPage ? 'All Tasks' : 'All Task'}
          </Link>
        )}

        {/* Avatar */}
        <div className="absolute left-[1000px] top-[16px] h-[60px] w-[60px]">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-full border-[3px] border-[#292929]">
            <img
              src={avatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute right-[3px] top-[3px] h-[11px] w-[11px] rounded-full bg-[#974FD0]" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;