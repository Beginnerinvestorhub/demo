import React from 'react';

const KinestheticLearner: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">For Kinesthetic Learners</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Simulations</h4>
          <p>
            Try our portfolio simulation tool to practice your investment
            strategies.
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Interactive Exercises</h4>
          <p>Complete our interactive exercises on budgeting and saving.</p>
        </div>
      </div>
    </div>
  );
};

export default KinestheticLearner;
