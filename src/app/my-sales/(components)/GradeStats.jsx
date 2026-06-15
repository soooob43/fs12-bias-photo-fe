const GRADE_CONFIG = {
  COMMON: {
    borderColor: 'border-(--main-main)',
    textColor: 'text-(--main-main)',
  },
  RARE: {
    borderColor: 'border-(--blue-blue)',
    textColor: 'text-(--blue-blue)',
  },
  SUPER_RARE: {
    borderColor: 'border-(--purple-purple)',
    textColor: 'text-(--purple-purple)',
  },
  LEGENDARY: {
    borderColor: 'border-(--pink-pink)',
    textColor: 'text-(--pink-pink)',
  },
};

const GradeStats = ({ gradeCounts }) => {
  const gradeStats = [
    {
      grade: 'COMMON',
      count: gradeCounts?.COMMON ?? 0,
    },
    {
      grade: 'RARE',
      count: gradeCounts?.RARE ?? 0,
    },
    {
      grade: 'SUPER RARE',
      count: gradeCounts?.SUPER_RARE ?? 0,
    },
    {
      grade: 'LEGENDARY',
      count: gradeCounts?.LEGENDARY ?? 0,
    },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex w-max gap-[20px]">
        {gradeStats.map((gradeStat) => {
          const config =
            GRADE_CONFIG[
              gradeStat.grade === 'SUPER RARE' ? 'SUPER_RARE' : gradeStat.grade
            ];

          return (
            <div
              key={gradeStat.grade}
              className={`
                flex
                min-w-[220px]
                items-center
                justify-center
                border
                px-[24px]
                py-[16px]
                ${config.borderColor}
              `}
            >
              <span
                className={`
                  text-[24px]
                  font-normal
                  ${config.textColor}
                `}
              >
                {gradeStat.grade}
              </span>

              <span
                className={`
                  ml-[10px]
                  text-[24px]
                  font-normal
                  ${config.textColor}
                `}
              >
                {gradeStat.count}장
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradeStats;
