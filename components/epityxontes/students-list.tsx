import { Student } from './students-data';

interface StudentsListProps {
  students: Student[];
}

export function StudentsList({ students }: StudentsListProps) {
  return (
    <div className="space-y-2">
      {students.map((student, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-3 border-b border-gray-100 last:border-b-0"
        >
          <div className="flex-1 min-w-0">
            <span className="text-gray-900 text-base">
              {student.lastName} {student.firstName}
            </span>
          </div>
          <div className="flex-1 sm:flex-[2] min-w-0">
            <span className="text-gray-700 text-base">
              {student.schoolTitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

