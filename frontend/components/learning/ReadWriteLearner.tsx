import React from 'react';

const ReadWriteLearner: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">For Read/Write Learners</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Articles</h4>
          <p>Read our in-depth articles on various investment topics.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Quizzes</h4>
          <p>Test your knowledge with our interactive quizzes.</p>
        </div>
      </div>
    </div>
  );
};

export default ReadWriteLearner;
