import { MoveRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useNoticeStore from "../store/noticeStore";
import { useEffect } from "react";

const NoticeSection = () => {
  const navigate = useNavigate();
  const { isFetchingNotices , notices, fetchNotices } = useNoticeStore();
  const handleNoticeClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
  };

  const handleShowAllClick = () => {
    navigate('/notices');
  };

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);
  if (isFetchingNotices) {
    return (
      <section className="notices bg-base-300 lg:px-10 px-4 py-6">
        <div className="flex items-center justify-between mb-6 gap-1">
          <h2 className="bg-accent text-accent-content inline-flex items-center gap-5 justify-between lg:px-6 px-4 py-2 rounded-full lg:text-2xl text-lg font-[inter]">
            <span>Notice</span>
            <span className="h-[10px] w-[10px] bg-base-300 block rounded-full"></span>
          </h2>
          <div className="h-[1px] bg-base-content flex-1"></div>
          <div className="h-[10px] w-[10px] bg-base-content"></div>
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-semibold">Loading Notices...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="notices bg-base-300 lg:px-10 px-4 py-6">
      <div className="flex items-center justify-between mb-6 gap-1">
        <h2 className="bg-accent text-accent-content inline-flex items-center gap-5 justify-between lg:px-6 px-4 py-2 rounded-full lg:text-2xl text-lg font-[inter]">
          <span>Notice</span>
          <span className="h-[10px] w-[10px] bg-base-300 block rounded-full"></span>
        </h2>
        <div className="h-[1px] bg-base-content flex-1"></div>
        <div className="h-[10px] w-[10px] bg-base-content"></div>
      </div>
      <div className="notice-content flex flex-col lg:flex-row gap-4">
        {notices.length === 0 ? (
          <div className="bg-base-100 p-8 rounded-lg shadow-md flex-1 text-center">
            <p className="text-lg font-semibold text-base-content/70">No notices available</p>
          </div>
        ) : (
          <>
            {notices.slice(0, 3).map((notice, index) => (
              <div
                key={notice._id || index}
                onClick={() => handleNoticeClick(notice._id)}
                className="relative bg-base-100 p-4 rounded-lg shadow-md flex-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-base-200 cursor-pointer"
              >
                <div className="absolute -top-3 right-2 flex items-center justify-center">
                  <span
                    className="notice-text text-4xl font-extrabold font-[inter] text-transparent "
                    style={{ WebkitTextStroke: "1px var(--color-base-content)" }}
                  >
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{notice.title}</h3>
                <p className="text-sm text-base-content/80 line-clamp-3">
                  {notice.content.length > 100 
                    ? `${notice.content.substring(0, 100)}...` 
                    : notice.content
                  }
                </p>
                {notice.type && (
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      notice.type === 'urgent' ? 'bg-error text-error-content' :
                      notice.type === 'announcement' ? 'bg-info text-info-content' :
                      'bg-neutral text-neutral-content'
                    }`}>
                      {notice.type}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {notices.length > 3 && (
              <div>
                <div 
                  onClick={handleShowAllClick}
                  className="bg-base-100 p-4 rounded-lg shadow-md flex items-center justify-center h-full border-[1px] border-base-content cursor-pointer hover:bg-base-content hover:text-base-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gap-2 flex-0"
                >
                  <p className="text-sm text-center font-[inter] tracking-wider">
                    Show All Notices
                  </p>
                  <MoveRight
                    strokeWidth={1}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NoticeSection;
