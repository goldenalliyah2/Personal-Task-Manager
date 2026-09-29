import taskDutyHero from '../assets/Component 1.png';
import { Link } from 'react-router-dom';

function CoverPage() {
  return (
    <main className="min-h-[calc(100vh-93px)] bg-[#FAF9FC]">
      <section className="mx-auto flex min-h-[calc(100vh-93px)] w-[1100px] items-center">

        {/* Hero Text */}
        <div className="w-1/2">
          <h1
            className="text-[48px] font-semibold leading-[1.05] text-[#2D2D2D]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
            }}
          >
            Manage your Tasks on
            <span className="block text-[#9747D7]">
              TaskDuty
            </span>
          </h1>

          <p
            className="mt-6 max-w-[510px] text-[18px] leading-[1.45] text-[#737373]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Non tellus, sapien, morbi ante nunc euismod ac
            felis ac. Massa et, at platea tempus duis non eget.
            Hendrerit tortor interdum nibh mi nisl semper
            porttitor. Nec accumsan.
          </p>

          <Link
            to="/my-task"
            className="mt-8 inline-flex items-center justify-center rounded-[6px] bg-[#9747D7] px-5 py-3 text-white transition duration-300 hover:bg-[#8235C2]"
            style={{
              fontFamily: "'Signika Negative', sans-serif",
            }}
          >
            Go to My Tasks
          </Link>
        </div>

        {/* Hero Illustration */}
        <div className="flex w-1/2 justify-end">
          <img
            src={taskDutyHero}
            alt="TaskDuty task management illustration"
            className="w-[460px] object-contain"
          />
        </div>

      </section>
    </main>
  );
}

export default CoverPage;